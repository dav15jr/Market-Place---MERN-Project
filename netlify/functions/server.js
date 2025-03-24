// This is a self-contained serverless function for Netlify
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http');

// Import your routes or create them here
// You may need to convert from ES modules to CommonJS
const productRoutes = require('../../backend/routes/product.route.js');

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

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
app.use('/api/products', productRoutes);

// For serverless environments
exports.handler = serverless(app);