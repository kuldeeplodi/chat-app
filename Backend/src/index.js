import express from 'express';
import authRoutes from './Routes/Auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
dotenv.config();

const PORT=process.env.PORT || 3000;

const app=express();
// const cors=require('cors');
// app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    console.log("Connecting to database...");
    connectDB();
})