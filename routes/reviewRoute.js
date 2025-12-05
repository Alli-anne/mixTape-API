import express from 'express';
import { getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview } from '../controller/reviewController.js';
import { requiresAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requiresAuth(), getAllReviews);

router.get('/:id', requiresAuth(), getReviewById);

router.post('/', requiresAuth(), createReview);

router.put('/:id', requiresAuth(), updateReview);

router.delete('/:id', requiresAuth(), deleteReview);


export default router;