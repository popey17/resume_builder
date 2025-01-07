import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';
import resumeRoutes from './routes/resume_routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // allow cookies from frontend
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});