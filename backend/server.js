import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import serverless from 'serverless-http'; // You'll need to install this package

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Enable CORS
app.use(cors());

// Middleware to accept JSON data in the req.body
app.use(express.json());

// Connect to MongoDB - only do this once
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  // Don't exit the process in serverless environments
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// API Routes
app.use('/api/products', productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// For local development - run as a normal Express server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For serverless environments (Netlify, Vercel)
export const handler = serverless(app);

// For Vercel and local development
export default app;