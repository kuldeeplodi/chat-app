import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/utils.js";
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

export const login=(req,res)=>{
    res.send("login route");
};
export const logout=(req,res)=>{
    res.send("logout route");
};


