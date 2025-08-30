import express from 'express';
import authRoutes from './Routes/Auth.route.js';
import messageRoutes from './Routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import {app,server} from "./lib/socket.js"

dotenv.config();

const PORT=process.env.PORT || 3000;



app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

server.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    console.log("Connecting to database...");
    connectDB();
})