import mongoose from "mongoose";

    const userProfile=new mongoose.Schema({
        firstname:{
        type:String,
        required:true,
        },
        lastname:{
        type:String,
        required:true,
        },
        email:{
        type:String,
        required:true,
        default:'buyer'
        },
         age:{
        type:Number,
        required:true,
        },
        address:{
        type:String,
        default:"No Adress Please Add One"
        }
    })


const UserProfileModel=mongoose.model('userProfile',userProfile);



export default UserProfileModel;