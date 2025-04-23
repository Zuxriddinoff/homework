import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true,
        trim:true,
        min: 5        
    },
    email:{
        type:String,
        required:true,
        trim:true,
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
