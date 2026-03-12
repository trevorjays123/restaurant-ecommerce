import { Request, Response } from 'express';
import { Order } from '../models/Order.js';

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    
    // Emit socket event for real-time tracking
    const io = req.app.get('io');
    if (io) {
      io.emit('order-created', { orderId: order._id });
    }
    
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
    });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }
    
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
    });
  }
};

// Get order tracking info
export const getOrderTracking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).select(
      'status deliveryAddress estimatedDelivery rider location createdAt'
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }
    
    res.json({
      success: true,
      data: {
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
        rider: order.rider,
        location: order.location,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tracking info',
    });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }
    
    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(`order-${id}`).emit('order-status-change', {
        orderId: id,
        status: order.status,
        message: `Order status updated to ${status}`,
      });
    }
    
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update order status',
    });
  }
};

// Get user's order history
export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order history',
    });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }
    
    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
    });
  }
};
