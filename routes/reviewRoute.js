import express from 'express';
import { getAllReviews } from '../controller/reviewController.js';
import { requiresAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requiresAuth, getAllReviews);

export default router;
