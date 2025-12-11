import YAML from 'yamljs';
import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';
const swaggerDocument = YAML.load('./swagger.yaml');

import { authMiddleware, requiresAuth } from '../middleware/auth.js';

router.use(authMiddleware);

// Swagger docs
router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

// Import your existing routes
import userRoute from './userRoute.js';
router.use('/users', userRoute);

import songRoute from './songRoute.js';
router.use('/songs', songRoute);

import reviewRoute from './reviewRoute.js';
router.use('/reviews', reviewRoute);

import loginRoute from './loginRoute.js';
router.use('/login', loginRoute);

import dailyRoute from './dailyRoute.js';
router.use('/dailySong', dailyRoute);

// --- ADD GOOGLE OAUTH ROUTES ---
import authRoutes from './auth.js';
router.use('/auth', authRoutes); // <-- now /auth/google and /auth/google/callback work

export default router;
