import express from 'express';
import { getAllReviews } from '../controller/reviewController.js';

const router = express.Router();

router.get('/user', getAllReviews);

export default router;
