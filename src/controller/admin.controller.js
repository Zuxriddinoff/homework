import Admin from "../model/admin.model.js"
import { adminValidator } from "../utils/admin.validator.js"
import { catchError } from "../utils/error.response.js"
import { decode, encode } from "../utils/bcrypt-enycrpt.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generate.token.js"

export class AdminController {
    async createSuperAdmin(req, res){
        try {
            const {error, value} = adminValidator(req.body)
            if(error){
                catchError(res, 400, error)
            }
            const {username, password} = value

            const checkSuperAdmin = await Admin.findOne({role:'superadmin'});
            if(checkSuperAdmin){
                catchError(res, 409, 'superadmin already exist')
            }
            const hashedPassword = await decode(password, 7)
            const newSuperAdmin = await Admin.create({
                username, hashedPassword, role: "superadmin"
            });
            return res.status(201).json({
                statuscode:201,
                message:'succes',
                data:newSuperAdmin
            })
        } catch (error) {
            catchError(res, 500, error.message)
        }
    }   
    async createAdmin(req, res){
        try {
            const {error, value} = adminValidator(req.body)
            if(error){
                catchError(res, 400, error)
            }
            const {username, password} = value

            

            const hashedPassword = await decode(password, 7)
            const newAdmin = await Admin.create({
                username, hashedPassword, role: 'admin'
            });
            successRes(res, 201, newAdmin)
        } catch (error) {
            return res.status(201).json({
                statuscode:201,
                message:'succes',
                data:newAdmin
            })        }
    }    
    async getAllAdmins(req, res){
        try {
            const admins = await Admin.find();
            return res.status(200).json({
                statuscode:200,
                message:'succes',
                data:admins
            })        } catch (error) {
            catchError(res, 500, error.message)
        }
    }
    async getAdminById(req, res){
        try {
            const admin = await this.findById(req.params.id)
            return res.status(200).json({
                statuscode:200,
                message:'succes',
                data:admin
            })
        } catch (error) {
            catchError(res, 500, error.message)
        }
    }
    async updateAdminById(req, res){
        try {
            await this.findById(req.params.id)
            const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true })
            return res.status(200).json({
                statuscode:200,
                message:'succes',
                data:updateAdmin
            })
        } catch (error) {
            catchError(res, 500, error.message)
        }
    }
    async deleteAdminById(req, res){
        try {
            const admin = await this.findById(req.params.id)
            if(admin.role === 'superadmin'){
                catchError(res, 400, 'DANGGG\nSuper admin cannot be delete')
            }
            await Admin.findByIdAndDelete(id);
            return res.status(200).json({
                statuscode:200,
                message:'succes',
                data:{}
            })        } catch (error) {
            catchError(res, 500, error.message)
        }
    }
    async singinAdmin(req, res){
        try {
            const { username, password} = req.body
            const admin = await Admin.findOne({username})
            if(!admin){
                catchError(res, 404, "admin not found")
            }
            const ismatchPassword = await encode (password, admin.hashedPassword)
            if(!ismatchPassword){
                catchError(res, 400, 'invalid password')
            }
            const payload = { id: admin._id, role:admin.role };
            const accessToken = generateAccessToken(payload)
            const refreshToken = generateRefreshToken(payload)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                statuscode:200,
                message:'succes',
                data:accessToken
            })        } catch (error) {
            catchError(res, 500, error.message)
        }
    }
    async findById(id) {
        try {
            const admin = await Admin.findById(id);
            if(!admin){
                catchError(res, 404, `admin not found by id ${id}`)
            }
            return admin;
        } catch (error) {
            catchError(res, error)
        }
    }
}