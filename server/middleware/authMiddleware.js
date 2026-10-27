import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware (BEE-II Core Concept)
 * Verifies JWT tokens and attaches authenticated user to req.user.
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Access denied. No authentication token provided.',
        statusCode: 401,
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bullsight_super_secure_jwt_secret_key_2026');
    req.user = await User.findById(decoded.id).select('-passwordHash');
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { message: 'User belonging to this token no longer exists.', statusCode: 401 },
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired token.', statusCode: 401 },
    });
  }
};

/**
 * Optional Authentication Middleware
 * If token is present, resolves user; otherwise leaves req.user as null for guest operations.
 */
export const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bullsight_super_secure_jwt_secret_key_2026');
      req.user = await User.findById(decoded.id).select('-passwordHash');
    } catch (e) {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

export default { protect, optionalAuth };
