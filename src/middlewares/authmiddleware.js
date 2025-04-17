import { User } from "../models/user.model.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const[useremail, userpassword] = Buffer.from(token, "base64")
        .toString()
        .split(":")
    
    const user = await User.findOne({email: useremail})

    if(!user){
        return res.status(404).send("user detail wrong")
    }

    if(
        useremail &&
        userpassword &&
        user.email === useremail &&
        user.password === userpassword
    ){
        next();    console.log(user);

        return;
    }
    res.status(404).send("user detail wrong")
    return;


}