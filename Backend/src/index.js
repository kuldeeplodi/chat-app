import express from 'express';
import authRoutes from './Routes/Auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT=process.env.PORT || 3000;

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    console.log("Connecting to database...");
    connectDB();
})