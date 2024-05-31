import { json } from "express";
import userModel from "../Models/Userschema.js";
import { getToken } from "../Security/JwtAuth.js";
import UserProfileModel from '../Models/UserProfile.js'
import jsonwebtoken from 'jsonwebtoken'
const secretkey='354zdsf354zd';

/** @type {import("express").RequestHandler} */
const Login = async (req, res) => {
  try{
     let {username,password}=req.body;
     let user=await userModel.findOne({"username":username});
    console.log(user);
     if(user?.password===password)
      {      
        let userDetails={"username":user.username,"role":user.role,'islogin':'true'};

        const JWToken=getToken(userDetails);
        res.setHeader('Access-Control-Expose-Headers','Token')
        res.setHeader("Token",JWToken)
        console.log(res.getHeader('Token'))
        res.status(200).send('login_successfull');
       
      }
      else
      {
        res.status(501).send('invalid login details');
      }
  }catch(error)
  {
    res.status(500).send('internal sever error');
  }
  
};


const SignUp = async (req, response) => {
  try{
  const {firstName,lastName,password,age,email}=req.body;
   const result=await userModel.create({username:email,password:password})
   if(result!==null && result!==undefined)
    {
      const profile= await UserProfileModel.create({firstname:firstName,lastname:lastName,age:Number(age),email:email})

        response.send(profile);
    } 
    
  }
  catch(error)
  {
    response.status(500).send(error);
  }
};

const Logout = async (req, res) => {
  res.send("logout");
};


const GetProfile=async(req,res)=>{
  try{
    const token=req.header('token')
     const {username}=jsonwebtoken.decode(token,secretkey);
    
     let userProfile=await UserProfileModel.findOne({"email":username});
     let userAuthDetail=await userModel.findOne({"username":username});
      
     let  fulldetail;
     if (userProfile==null)
      {
        fulldetail={...userAuthDetail?._doc,email:username}
      }
      else
      {
        fulldetail ={
        ...userProfile?._doc,...userAuthDetail?._doc
      }
      }
     

    res.send(fulldetail);
  }
  catch(error)
  {
    res.send(error);
  }
}

const UserDetail=async(req,res)=>{
  try{
    const token=req.header('token')
     const {username}=jsonwebtoken.decode(token,secretkey);
    
     let userProfile=await UserProfileModel.findOne({"email":username});

    res.send(userProfile);
  }
  catch(error)
  {
    res.send(error);
  }
}
const UpdateProfile = async (req, res) => {
  try{
   let {username,firstname,lastname,password,age,email,address}=req.body;
    
   let user=await userModel.findOneAndUpdate({"username":username},{"username":username,"password":password})
   if(user!=null)
    {
      user=await UserProfileModel.findOneAndUpdate({"email":username},{"email":email,"firstname":firstname,"lastname":lastname,"age":age,"address":address})

      if(user==null)
        {
          user=await UserProfileModel.create({"email":email,"firstname":firstname,"lastname":lastname,"age":age,"address":address})
        }
    }
    
   res.status(200).send(user);
    
  }
  catch(error)
  {
    res.status(500).send(error);
  }
};


export { Login, SignUp, Logout ,GetProfile,UpdateProfile,UserDetail};
