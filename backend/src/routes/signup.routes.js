import express from 'express';
import { signupController } from '../controllers/signup.controller.js';
import { validateSignup } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/', validateSignup, signupController);

export default router;