import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary configured successfully.');
} else {
  console.warn('Cloudinary environment variables are missing. File uploads will fall back to local mock urls.');
}

export const uploadImageToCloudinary = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  if (!isCloudinaryConfigured) {
    // Generate a beautiful placeholder image from Unsplash to ensure the demo is functional
    const topics = ['house', 'apartment', 'villa', 'building', 'home'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomId = Math.floor(Math.random() * 1000);
    return `https://images.unsplash.com/photo-${randomId % 2 === 0 ? '1580587771525-78b9dba3b914' : '1564013799919-ab600027ffc6'}?auto=format&fit=crop&w=800&q=80`;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Cloudinary upload returned undefined secure_url'));
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
