import { Request, Response } from 'express';
import { MenuItem } from '../models/MenuItem.js';

// Get all menu items with filtering
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { 
      cuisine, 
      category, 
      search, 
      dietary, 
      minPrice, 
      maxPrice,
      page = 1,
      limit = 50,
      sort = 'name',
      order = 'asc'
    } = req.query;

    const query: Record<string, unknown> = { isAvailable: true };
    
    if (cuisine) query.cuisine = cuisine;
    if (category) query.category = category;
    if (dietary) query.dietary = { $in: dietary };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) (query.price as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice) (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sort as string] = order === 'desc' ? -1 : 1;

    const items = await MenuItem.find(query)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await MenuItem.countDocuments(query);

    res.json({
      success: true,
      data: {
        items,
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
      error: 'Failed to fetch menu items',
    });
  }
};

// Get single menu item by ID
export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }
    
    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu item',
    });
  }
};

// Get menu items by category
export const getMenuByCategory = async (req: Request, res: Response) => {
  try {
    const { cuisine } = req.query;
    
    const query: Record<string, unknown> = { isAvailable: true };
    if (cuisine) query.cuisine = cuisine;

    const categories = await MenuItem.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          items: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu by category',
    });
  }
};

// Get popular items
export const getPopularItems = async (req: Request, res: Response) => {
  try {
    const { cuisine, limit = 10 } = req.query;
    
    const query: Record<string, unknown> = { 
      isAvailable: true,
      isPopular: true 
    };
    if (cuisine) query.cuisine = cuisine;

    const items = await MenuItem.find(query).limit(Number(limit));

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch popular items',
    });
  }
};

// Search menu items
export const searchMenuItems = async (req: Request, res: Response) => {
  try {
    const { q, cuisine } = req.query;
    
    const query: Record<string, unknown> = {
      isAvailable: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'ingredients.name': { $regex: q, $options: 'i' } },
      ],
    };
    
    if (cuisine) query.cuisine = cuisine;

    const items = await MenuItem.find(query).limit(20);

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search menu items',
    });
  }
};

// Create menu item (admin)
export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    const item = new MenuItem(itemData);
    await item.save();
    
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create menu item',
    });
  }
};

// Update menu item (admin)
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const item = await MenuItem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }
    
    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update menu item',
    });
  }
};

// Delete menu item (admin)
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const item = await MenuItem.findByIdAndDelete(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete menu item',
    });
  }
};

// Get menu categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { cuisine } = req.query;
    
    const query: Record<string, unknown> = {};
    if (cuisine) query.cuisine = cuisine;

    const categories = await MenuItem.distinct('category', query);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
};
