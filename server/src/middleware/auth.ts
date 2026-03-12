import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
    role: string;
  };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token, authorization denied',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };
    
    req.user = {
      _id: decoded.userId,
      email: '',
      role: 'user',
    };
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Token is not valid',
    });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      ) as { userId: string };
      
      req.user = {
        _id: decoded.userId,
        email: '',
        role: 'user',
      };
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
