import User from "../models/user.model.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { catchError } from "../utils/error-response.js";
import { transporter } from "../utils/mailer.js";
import { getCache, setCache } from "../utils/cache.js";
import { otpGenerator } from "../utils/otp-generetor.js";
import { userValidator } from "../validations/user.validation.js";
import { successRes } from "../utils/user.success.js";
import { generateAccessToken, generateRefreshToken } from "../utils/ganarate-token.js";
import { log } from "console";


export class userController {
    async createUser(req, res){
        try {
            const {error, value} = userValidator(req.body);
            if(error){
                catchError(res, 400, 'User validation fail!');
            }

            const { password} = value;
        
            
            const hashPassword = await decode(password, 8);
            console.log(hashPassword);
            
            const newUser = new User({
                ...value,
                hashedPassword: hashPassword
            })
            
            await newUser.save();
            
            successRes(res, 201, newUser);

        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getAllUser(_, res) {
        try {
            const user = await User.find();
            if(!user){
                catchError(res, 404, "Users not found!");
            }
            successRes(res, 200, user);
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getByIdUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            successRes(res, 200, user)
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async updateUser(req, res){
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if(!user){
                catchError(res, 404, 'User not found!');
            }

            const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
            successRes(res, 200, updateUser);
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async deleteUser(req, res){
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if(!user) {
                catchError(res, 404, 'User not found!');
            }

            await User.findByIdAndDelete(id);
            successRes(res, 200, {});
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                catchError(res, 404, 'User not found');
            }
            
            
            const isMatchPassword = await encode(password, user.hashedPassword);
            if (!isMatchPassword) {
                catchError(res, 400, 'Invalid password');
            }
            const otp = otpGenerator();
            const mailMessage = {
                from: process.env.SMTP_USER,
                to: 'bahodirnabijanov782@gmail.com',
                subject: 'course',
                text: otp,
            };
            transporter.sendMail(mailMessage, function (err, info) {
                if (err) {
                    console.log(`Error on sending to mail: ${err}`)
                    catchError(res, 400, err);
                } else {
                    setCache(user.email, otp);
                    console.log(info);
                   
                }
            });
            successRes(res, 200, {})
        } catch (error) {
            catchError(res, 500, error);
        }
    }



    async confirmSigninUser(req, res) {
        try{
            const {email, otp} = req.body;
            const user = await User.findOne({email});
            if(!user) {
                catchError(res, 404, 'User not found');
            }

            const otpChache = getCache(email);
            
            if (!otp || otp != otpChache){
                catchError(res, 400, 'Otp expired');
            }

            const payload = {id: user._id, role: user.role};
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            successRes(res, 200, accessToken);
        } catch(error){
            catchError(res, 500, error.message);
        }
    }

    async accessToken(req, res){
        try{
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                catchError(res, 401, 'Refresh is not defined');
            }            

            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            if(!decodedToken){
                catchError(res, 401, 'Refresh token expired');
            }

            const payload = {id: decodedToken.id, role: decodedToken.role};
            const accessToken = generatAccessToken(payload);
            return successRes(res, 200, accessToken);
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }

    async signOut(req, res){
        try {
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                catchError(res, 401, 'Refresh is not defined');
            }

            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            if(!decodedToken){
                catchError(res, 401, 'Refresh token expired');
            }

            res.clearCookie('refreshToken');
            successRes(res, 200, {});

        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}