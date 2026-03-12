import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import imageUploadRoutes from "./routes/uploads.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import goldLoanRoutes from './routes/GoldLoanRoutes.js';
import vehicleLoanRoutes from './routes/VehicleLoanRoutes.js';
import personalLoanRoutes from './routes/PersonalLoanRoutes.js';
import homeLoanRoutes from './routes/HomeLoanRoutes.js';
import businessLoanRoutes from './routes/BusinessLoanRoutes.js';
import groupLoanRoutes from './routes/GroupLoanRoutes.js';
import unifiedLoanRoutes from "./routes/UnifiedLoanRoutes.js";

// Load environment variables
dotenv.config();
console.log(process.env.JWT_SECRET);


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000' ||'http://localhost:3002',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Parv Finance Backend API' });
});

// image upload routes
app.use("/api", imageUploadRoutes);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Loan Routes
app.use('/api/loans/gold', goldLoanRoutes);
app.use('/api/loans/vehicle', vehicleLoanRoutes);
app.use('/api/loans/personal', personalLoanRoutes);
app.use('/api/loans/home', homeLoanRoutes);
app.use('/api/loans/business', businessLoanRoutes);
app.use('/api/loans/group', groupLoanRoutes);
app.use("/api/loans/unified", unifiedLoanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

