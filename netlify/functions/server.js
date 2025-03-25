import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../../backend/config/db.js';
import productRoutes from '../../backend/routes/product.route.js';
import path from 'path';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //Middleware: to allow us to accept JSON data in the req.body
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
});
}

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log('Server is running on http://localhost:' + PORT);
});


// For serverless environments (Netlify)
export const handler = serverless(app);

