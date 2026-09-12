import { Router } from 'express';
import {
  getProperties,
  getPropertyBySlug,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadImages,
} from '../controllers/propertyController';
import { requireAdmin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// Public routes
router.get('/', getProperties);
router.get('/slug/:slug', getPropertyBySlug);
router.get('/:id', getPropertyById);

// Admin-only protected routes
router.post('/', requireAdmin, createProperty);
router.put('/:id', requireAdmin, updateProperty);
router.delete('/:id', requireAdmin, deleteProperty);
router.post('/upload', requireAdmin, upload.array('images', 10), uploadImages);

export default router;
