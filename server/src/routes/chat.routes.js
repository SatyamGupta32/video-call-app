import  express from 'express';
import { protectRoute } from '../middlewares/auth.middlewares.js';
import { getStreamToken } from '../controllers/chat.controllers.js';

const router = express.Router();

router.use(protectRoute);

router.get('/token',getStreamToken); 


export default router;