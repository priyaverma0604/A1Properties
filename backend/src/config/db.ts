import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agra-properties';

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGODB_URI || MONGODB_URI.includes('localhost') && process.env.NODE_ENV === 'production') {
      console.log('No cloud MongoDB URI provided. Running backend in mock/stateless mode.');
      return;
    }
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.log('Backend will continue running in fallback mode.');
  }
};
