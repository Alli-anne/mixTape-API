import express from 'express';
import { createUser, getAllUsers } from '../controller/userController.js';
import { requiresAuth } from '../middleware/auth.js';


const router = express.Router();

router.get('/', requiresAuth(), getAllUsers);
router.post('/', requiresAuth(), createUser);

export default router;
