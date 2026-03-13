import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { menuItems } from './data/seed.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// CORS configuration - allow multiple origins
const corsOptions = {
  origin: ['http://localhost:5173', 'https://restaurant-ecommerce-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Get unique categories
const categories = [...new Set(menuItems.map(item => item.category))];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Menu routes
app.get('/api/menu', (req, res) => {
  const { category, cuisine, search } = req.query;
  let filteredItems = [...menuItems];
  
  if (category && category !== 'all') {
    filteredItems = filteredItems.filter(item => item.category === category);
  }
  
  if (cuisine && cuisine !== 'all') {
    filteredItems = filteredItems.filter(item => item.cuisine === cuisine);
  }
  
  if (search) {
    const searchLower = (search as string).toLowerCase();
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json({ items: filteredItems, categories });
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
