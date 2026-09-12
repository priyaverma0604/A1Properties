import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agra-properties';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.log('Ensure you have MongoDB running locally, or configured MONGODB_URI in your .env file.');
    // We don't exit the process so the server can run in mock-friendly mode or log errors gracefully.
  }
};
