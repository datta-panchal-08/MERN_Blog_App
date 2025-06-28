import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/Auth.js';
import blogRoutes from './routes/Blog.js';
import dashboardRoutes from './routes/Dashboard.js';
import commentRoutes from './routes/Comment.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin:true,
    credentials:true
}
app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes 
app.use("/api/v1/auth",authRoutes);
app.use('/api/v1/blog',blogRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);
app.use("/api/v1/comment",commentRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from backend");
});

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on PORT:${PORT}`);
});

connectDB();

