import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/Auth.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes 
app.use("/api/v1/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from backend");
});

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on PORT:${PORT}`);
});

connectDB();

