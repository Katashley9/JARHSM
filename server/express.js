import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import shopRoutes from './routes/shop.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Serve static files from the 'dist/app' directory
app.use(express.static(path.join(CURRENT_WORKING_DIR, '..', 'dist/app')));

// Use body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use other middleware
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });
    console.log(err);
  }
});

export default app;
