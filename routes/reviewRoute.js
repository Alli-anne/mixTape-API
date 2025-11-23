import express from 'express';
import { getAllReviews } from '../controller/reviewController.js';

const router = express.Router();

router.get('/', getAllReviews);

export default router;
