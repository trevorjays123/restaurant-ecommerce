import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Menu routes
app.get('/api/menu', (req, res) => {
  // In production, this would fetch from MongoDB
  res.json({ items: [], categories: [] });
});

// Order routes
app.post('/api/orders', (req, res) => {
  const order = {
    id: 'NK' + Date.now().toString(36).toUpperCase(),
    ...req.body,
    createdAt: new Date(),
    status: 'pending',
  };
  res.json(order);
});

// Socket.io for real-time order tracking
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-order', (orderId: string) => {
    socket.join(`order-${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
