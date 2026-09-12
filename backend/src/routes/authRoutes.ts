import { Router } from 'express';
import { login, verifyToken } from '../controllers/authController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/verify', requireAdmin, verifyToken);

export default router;
