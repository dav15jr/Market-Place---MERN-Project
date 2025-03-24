// This is a self-contained serverless function for Netlify
import express, { Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

// Import your routes
import productRoutes from '../../backend/routes/product.route.js';

dotenv.config();

const api = express();
const router = Router();

// Enable CORS
api.use(cors());

// Middleware
api.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

// API Routes
router.use('/products', productRoutes);

// Mount all routes under /api
api.use('/api', router);

export const handler = serverless(api);
