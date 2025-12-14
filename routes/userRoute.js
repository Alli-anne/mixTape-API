// routes/userRoutes.js
import express from 'express';
import { getAllUsers } from '../controller/userController.js';
import { requiresAuth } from '../middleware/auth.js'; // Optional authentication

const router = express.Router();

// GET all users (protected route)
router.get('/', requiresAuth(), getAllUsers);

// CREATE a new user (optional: you might allow public registration)
// router.post('/', createUser);

export default router;
