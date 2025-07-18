import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);