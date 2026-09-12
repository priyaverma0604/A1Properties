import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || 'admin@a1properties.com';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Auto-seed admin user if no users exist in database
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found in database. Seeding default admin user...');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, salt);
      await User.create({
        email: DEFAULT_EMAIL,
        passwordHash,
        name: 'Admin Broker Agra',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' } // Session valid for 7 days
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
};

// Endpoint to verify token validity
export const verifyToken = async (req: Request, res: Response) => {
  // If requireAdmin middleware succeeds, req.user exists
  const authenticatedReq = req as any;
  if (authenticatedReq.user) {
    try {
      const user = await User.findById(authenticatedReq.user.userId).select('-passwordHash');
      if (!user) {
        return res.status(404).json({ message: 'User no longer exists.' });
      }
      return res.status(200).json({ valid: true, user });
    } catch (e) {
      return res.status(500).json({ message: 'Server error verifying token.' });
    }
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
