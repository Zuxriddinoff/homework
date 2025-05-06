import {Patient} from '../models/patient.model.js'
import {patientValidation} from "../validation/patient.validation.js"
import {catchError} from '../utils/error-response.js'
import { encode, decode } from '../utils/bcrypt-encrypt.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token.js';
import { refTokenWriteCookie } from '../utils/write-cookie.js';
import { date } from 'joi';


export class PatientController {
    async signupPatient(req, res){
        try {
            const {error, value} = patientValidation(req.body);
            if(error){
                return catchError(res, 400, error)
            }
            const {fullName, phoneNumber, password, address, age, gender}=value;
            const existPhone = await Patient.findOne({phoneNumber})
            if(existPhone){
                return catchError(res, 409, 'phone number already exist');
            }

            const hashedPassword = await encode(password, 7);
            const patient = await Patient.create({
                fullName,
                phoneNumber,
                hashedPassword,
                address,
                age,
                gender
            });
            const payload = {id:patient._id, is_patient:true};
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            refTokenWriteCookie(res, 'refreshtokenPatient', refreshToken);
            return res.status(201).json({
                statusCode:201,
                message:'success',
                data:accessToken
            })
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
    async signinPatient(req, res){
        try {
            const {phoneNumber, password} = req.body;
            const patient = await Patient.findOne({phoneNumber});
            const isMatchPass = await decode(password, patient?.hashedPassword);
            if(!patient || !isMatchPass){
                return catchError(res, 400, 'phone number and password incorrect')
            }
            const payload = {id:patient._id, is_patient:true};
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            refTokenWriteCookie(res, 'refreshtokenPatient', refreshToken);
            return res.status(200).json({
                statusCode:200,
                message:'success',
                data:accessToken
            })
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
    async accessTokenPatient(req, res) {
        try {
          const refreshToken = req.cookies.refreshTokenPatient;
          if (!refreshToken) {
            return catchError(res, 401, 'Refresh token Patient not found');
          }
          const decodedToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_KEY
          );
          if (!decodedToken) {
            return catchError(res, 401, 'Refresh token Patient expired');
          }
          const payload = { id: decodedToken.id, is_Patient: true };
          const accessToken = generateAccessToken(payload);
          return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: accessToken,
          });
        } catch (error) {
          return catchError(res, 500, error.message);
        }
    }
    async signoutPatient(req, res) {
        try {
          const refreshToken = req.cookies.refreshTokenPatient;
          if (!refreshToken) {
            return catchError(res, 401, 'Refresh token Patient not found');
          }
          const decodedToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_KEY
          );
          if (!decodedToken) {
            return catchError(res, 401, 'Refresh token Patient expired');
          }
          res.clearCookie('refreshTokenPatient');
          return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: {},
          });
        } catch (error) {
          return catchError(res, 500, error);
        }
    }
    async getAllPatient(req, res){
        try {
            const patients = await Patient.find();
            return res.status(200).json({
                statusCode:200,
                message:'success',
                data:patients
            })
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
    async getPatientById(req, res){
        try {
            const patient = await PatientController.findPatientById(res, req.params.id);
            return res.status(200).json({
                statusCode:200,
                message:'success',
                data:patient
            })
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
    async updatePatentById(req, res) {
        try {
          const id = req.params.id;
          const patient = await PatientController.findById(res, id);
          if (req.body.phoneNumber) {
            const existPhone = await patient.findOne({
              phoneNumber: req.body.phoneNumber,
            });
            if (existPhone && id != existPhone._id) {
              return catchError(res, 409, 'phoneNumber already exist');
            }
          }
          let hashedPassword = patient.hashedPassword;
          if(req.body.password){
            hashedPassword = encode(req.body.password, 7)
            delete req.body.password
          }
          const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
            ...req.body,
            hashedPassword
          },{new:true});
          return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: updatedPatient,
          });
        } catch (error) {
          return catchError(res, 500, error.message);
        }
    }
    async deletePatientById(req, res){
        try {
            const id = req.params.id
            await PatientController.findPatientById(res, id);
            await Patient.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode:200,
                message:'success',
                data:{}
            })
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
    static async findPatientById(res, id){
        try {
            const patient = await Patient.findById(id);
            if(!patient){
                return catchError(res, 404, 'patient not found')
            }
        } catch (error) {
            return catchError(res, 500, error.message)
        }
    }
}