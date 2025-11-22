import express from 'express';
import { getAllSongs } from '../controller/songController.js';

const router = express.Router();

router.get('/user', getAllSongs);

export default router;
