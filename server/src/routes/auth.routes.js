import express from 'express';
import { signup, login, onboarding, logout, userProfile } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/onboarding',protectRoute, onboarding);
router.post('/logout', logout);

// forget-password

router.get('/userProfile', protectRoute, userProfile);

export default router;
