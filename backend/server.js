import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Enable CORS
app.use(cors());

app.use(express.json()); //Middleware: to allow us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB
    console.log('Server is running on http://localhost:' + PORT);
  });
}

// For Netlify serverless functions
export const handler = app;
