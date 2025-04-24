import { string, types } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        types:string,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["user", "admin", ],
        default:"user"
    }
},
{
    timestamps:true
})

export const User = mongoose.model("user", userSchema)
