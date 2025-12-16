import express from 'express';
import { getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview } from '../controller/reviewController.js';
import { requiresAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { createReviewValidators, updateReviewValidators } from '../validators/reviewValidators.js';

const router = express.Router();

router.get('/', requiresAuth(), getAllReviews);

router.get('/:id', requiresAuth(), getReviewById);

router.post('/', requiresAuth(), createReviewValidators, validate, createReview);

router.put('/:id', requiresAuth(), updateReviewValidators, validate, updateReview);

router.delete('/:id', requiresAuth(), deleteReview);


export default router;