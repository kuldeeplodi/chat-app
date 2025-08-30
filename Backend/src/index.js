import express from 'express';
import authRoutes from './Routes/Auth.route.js';
import messageRoutes from './Routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import {app,server} from "./lib/socket.js"
import path from "path";

dotenv.config();

const PORT=process.env.PORT || 3000;
const __dirname=path.resolve();


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../Frontend/dist')))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}
    

server.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    console.log("Connecting to database...");
    connectDB();
})