import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup=async(req,res)=>{
    const {fullname,email,password}=req.body;
    try {
        
        if(!email ||!fullname || !password){
          return res.status(400).json({message:"all fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters long"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);

        const newUser=new User({
            fullname,
            email,
            password:hashedPassword,
        })
        console.log(newUser);
        
        if(newUser){
             generateToken(newUser._id,res);
             await newUser.save();
                res.status(201).json({
                    _id:newUser._id,
                    fullname:newUser.fullname,
                    email:newUser.email,
                    profilepic:newUser.profilepic,
                    
                });
        }else{
            res.status(400).json({message:"Invalid user data"});

        }

    } catch (error) {
        console.log("Error in signup",error.message);
        res.status(500).json({message:"Internal server error"});
        
    }   
};

export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
           return res.status(400).json({message:"Invalid credentials"});
        }
        const ispasswordcorrect=await bcrypt.compare(password,user.password);
        if(!ispasswordcorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilepic:user.profilepic,
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log("Error in login",error.message);
    }
};
export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{
            MaxAge:0,
        })
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const updateProfilePic=async(req,res)=>{
    try {
       const {profilepic}=req.body ;
       const userId=req.user._id;
       if(!profilepic){
        res.status(400).json({message:"Profile picture is required"});
       }
       const uploadResult=await cloudinary.uploader.upload(profilepic);
       User.findByIdAndUpdate(userId,{profilepic:uploadResult.secure_url},{new:true});
       res.status(200).json({message:"Profile picture updated successfully"});
    } catch (error) {
        console.log("Error in updateProfilePic",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkUser=(req,res)=>{
    try{
       res.status(200).json(req.user) ;
    }
    catch(error){
        console.log("Error in checkUser",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

