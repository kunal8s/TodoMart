import express from 'express';
import { signinController, logoutController } from '../controllers/signin.controller.js';
import { validateSignin } from '../middlewares/validation.middleware.js';

const router = express.Router();

// POST /api/signin - Authenticate user
router.post('/', validateSignin, signinController);

// POST /api/signin/logout - Logout user
router.post('/logout', logoutController);

export default router;