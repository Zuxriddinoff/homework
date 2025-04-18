import jwt from "jsonwebtoken";

export const generateToken = (payload, jwtSecret, option) => {
    return jwt.sign(payload, jwtSecret, option)
}