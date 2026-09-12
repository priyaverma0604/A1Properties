import { Router } from 'express';
import { createLead, getLeads, deleteLead } from '../controllers/leadController';
import { requireAdmin } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// Public route to submit inquiries or seller property details
router.post('/', upload.array('images', 5), createLead);

// Admin-only routes to view/manage leads
router.get('/', requireAdmin, getLeads);
router.delete('/:id', requireAdmin, deleteLead);

export default router;
