// routes/dailyRoutes.js
import express from 'express';
import { getAllDaily, createDaily } from '../controller/dailyController.js';
import { requiresAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { createDailyValidators } from '../validators/dailyValidators.js';

const router = express.Router();

// GET all daily entries
router.get('/', requiresAuth(), getAllDaily);

// CREATE a new daily entry
router.post('/', requiresAuth(), createDailyValidators, validate, createDaily);

export default router;
