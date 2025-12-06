import express from 'express';
import { getAllDaily, createDaily } from '../controller/dailyController.js';

const router = express.Router();

router.get('/all', getAllDaily);
router.post('/create', createDaily);

export default router;