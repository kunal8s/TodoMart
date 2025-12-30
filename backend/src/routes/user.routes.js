import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateUpdateProfile } from '../middlewares/user.validation.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/user/profile - Get user profile
router.get('/profile', getProfile);

// PUT /api/user/profile - Update user profile
router.put('/profile', validateUpdateProfile, updateProfile);

export default router;
