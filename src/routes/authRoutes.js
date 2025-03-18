import express from 'express';
import { register, login, getMe, makeAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/make-admin/:id', protect, isAdmin, makeAdmin);

export default router;