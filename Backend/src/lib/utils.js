import jwt from 'jsonwebtoken';

export const generateToken=(userId,res)=>{
    //generate JWT token
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:
        "7d"}
    )

    res.cookie("jwt",token,{
        httpOnly:true,// prevent xss attacks cross site scripting attacks
        secure:process.env.NODE_ENV!=="development",
        sameSite:"strict", // prevent csrf attacks cross site request forgery attacks
        maxAge:7*24*60*60*1000, //7 days
    })

    return token;
}