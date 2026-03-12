import { Router } from 'express';
import {
  getMenuItems,
  getMenuItemById,
  getMenuByCategory,
  getPopularItems,
  searchMenuItems,
  getCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getMenuItems);
router.get('/search', searchMenuItems);
router.get('/categories', getCategories);
router.get('/popular', getPopularItems);
router.get('/by-category', getMenuByCategory);
router.get('/:id', getMenuItemById);

// Protected routes (admin)
router.post('/', auth, createMenuItem);
router.put('/:id', auth, updateMenuItem);
router.delete('/:id', auth, deleteMenuItem);

export default router;
