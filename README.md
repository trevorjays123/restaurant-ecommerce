# Restaurant E-Commerce Platform

A multi-cuisine restaurant e-commerce platform built with React, Node.js, and MongoDB, specifically designed for the Nigerian market. Supports three distinct cuisine types: Nigerian, Continental, and Fast Food.

![Project Status](https://img.shields.io/badge/status-Complete-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20MongoDB-blue)

## Features

### 🎯 Core Functionality
- **Multi-Cuisine Support**: Switch between Nigerian, Continental, and Fast Food menus
- **Interactive Menu**: Searchable menu with category filters, dietary icons, and real-time availability
- **Shopping Cart**: Persistent cart with promo code support
- **One-Page Checkout**: Streamlined checkout with multiple payment options
- **Real-Time Order Tracking**: Socket.io powered live tracking

### 💳 Payment Integration (Nigerian Market)
- Paystack (Cards, Bank Transfer, USSD)
- Flutterwave (Cards, Bank Transfer, QR Payments)
- Cash on Delivery

### 📱 Mobile-First Design
- Responsive design optimized for Nigerian smartphones
- Bottom navigation for easy thumb access
- Lazy loading for images
- Data-saver mode support

### 🔔 Notifications
- WhatsApp order updates
- SMS notifications (Termii/Africa's Talking)
- Email confirmations

### 🎁 Loyalty Program
- Points-based rewards (1 point per ₦1)
- Sign-up bonus (500 points)
- Birthday rewards
- Referral program

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Zustand (state management)
- Framer Motion (animations)
- React Router v6 (routing)
- Socket.io Client (real-time updates)

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Socket.io (WebSocket)
- JWT Authentication
- bcrypt (password hashing)

## Project Structure

```
restaurant-ecommerce/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── cart/         # Cart components
│   │   │   ├── checkout/     # Checkout components
│   │   │   ├── common/       # Common UI components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── menu/         # Menu components
│   │   │   └── ui/           # UI primitives
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── store/            # Zustand stores
│   │   ├── styles/           # Global styles
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── data/             # Seed data
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   └── server.ts          # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example              # Environment variables template
├── SPEC.md                   # Technical specifications
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd restaurant-ecommerce
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Install client dependencies**
```bash
cd client
npm install
```

4. **Install server dependencies**
```bash
cd ../server
npm install
```

### Running the Application

1. **Start the backend server**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

2. **Start the frontend (new terminal)**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### Seeding the Database

The database is automatically seeded with sample menu items on first run. To manually seed:

```bash
cd server
npm run seed
```

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items with filters
- `GET /api/menu/:id` - Get single menu item
- `GET /api/menu/search?q=` - Search menu
- `GET /api/menu/popular` - Get popular items
- `GET /api/menu/categories` - Get categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/track/:id` - Get order tracking
- `GET /api/orders/user/history` - Get user order history

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

## Cuisine Themes

### Nigerian Theme
- **Primary**: Deep Orange (#E85A24)
- **Secondary**: Warm Cream (#F5E6D3)
- **Accent**: Charcoal (#2D2D2D)
- **Animations**: Steam rising, pepper floating

### Continental Theme
- **Primary**: Deep Burgundy (#722F37)
- **Secondary**: Champagne (#F7E7CE)
- **Accent**: Gold (#C5A059)
- **Animations**: Wine pouring, elegant fades

### Fast Food Theme
- **Primary**: Vibrant Red (#FF6B35)
- **Secondary**: Bright Yellow (#FFD166)
- **Accent**: White (#FFFFFF)
- **Animations**: Bouncy, energetic, flame effects

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Railway/Render)
```bash
cd server
npm run build
# Deploy dist folder
```

### Recommended Nigerian Hosting
- **Frontend**: Vercel (global CDN)
- **Backend**: Railway, Render, or Cloudways
- **Database**: MongoDB Atlas

## Environment Variables

See [.env.example](./.env.example) for all configuration options.

## License

MIT License - feel free to use this project for your own restaurant.

---

Built with ❤️ for the Nigerian market 🇳🇬
