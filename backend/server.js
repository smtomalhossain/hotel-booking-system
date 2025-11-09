import express from 'express';
import "dotenv/config";
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary();

const app = express();
app.use(cors());
// Webhook route (raw body) - MUST be registered before body parsers
// API to listen to Clerk Webhooks - requires the raw body for svix verification
// Use route-specific raw parser so other routes can continue to use express.json()
app.post('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// General middleware
app.use(express.json());
app.use(clerkMiddleware());
// API routes
app.get('/', (req, res) => res.send('API Is Working'));
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
