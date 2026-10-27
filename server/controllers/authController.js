import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'bullsight_super_secure_jwt_secret_key_2026', {
    expiresIn: '30d',
  });
};

/**
 * POST /api/auth/register
 * Registers a new user with hashed password and generates JWT (201 Created)
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Email and password are required', statusCode: 400 } });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: { message: 'Password must be at least 6 characters long', statusCode: 400 } });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ error: { message: 'An account with this email already exists', statusCode: 409 } });
    }

    const user = await User.create({
      email: email.toLowerCase().trim(),
      passwordHash: password,
      fullName: fullName || 'BullSight Trader',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Authenticates user credentials and returns JWT (200 OK)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: { message: 'Email and password are required', statusCode: 400 } });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid email or password credentials', statusCode: 401 } });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: { message: 'Invalid email or password credentials', statusCode: 401 } });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Retrieves current authenticated user profile
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: { message: 'Not authenticated', statusCode: 401 } });
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export default { register, login, getMe };
