import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { config } from "../config/config.js";
import { generateToken } from "../config/generateToken.js";

export const authController = {
    register: async(req, res, next) =>{
        try {
            const body = req.body
            const {password}  = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findOne({email: body.email}, "email _id").exec()
            if(!user){
                const newUser = new User({
                    ...body,
                    password: hashedPassword
                })
                await newUser.save()
                res.status(201).json({
                    status: "success",
                    massage:" users find successfully",
                    error: null,
                    data: {
                        newUser
                    },
                })
                return
            }
            return next(new Error("user already exists!", 400))
        } catch (error) {
            next(error)
        }
    },
    login: async(req, res, next) => {
        try {
            const { email, password} = req.body
            const user = await User.findOne({email: email})
            if(!user){
                return next(new Error("user detailing wrong", 400))
            }

            const payload = {
                sub:user._id,
                name:user.name,
                email:user.email
            }
            const secretKey = config.jwt_secret
            const token = generateToken(payload, secretKey, {
                algorithm:"HS512",
                expiresIn: "1d"
            })

            req.user = user
            res.json({
                status:"seccess",
                message:"loggen in seccessfully",
                error: null,
                data: {
                    user,
                    token: token
                },

            })
        } catch (error) {
            next(error)
        }
    }
}

