import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrderTracking,
  updateOrderStatus,
  getOrderHistory,
  getAllOrders,
} from '../controllers/orderController.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/', createOrder);
router.get('/track/:id', getOrderTracking);
router.get('/:id', getOrderById);

// Protected routes (user)
router.get('/user/history', auth, getOrderHistory);

// Protected routes (admin)
router.get('/admin/all', auth, getAllOrders);
router.patch('/admin/:id/status', auth, updateOrderStatus);

export default router;
