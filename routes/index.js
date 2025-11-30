import YAML from 'yamljs';

import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';
const swaggerDocument = YAML.load('./swagger.yaml');

import {authMiddleware, requiresAuth} from '../middleware/auth.js';

router.use(authMiddleware);

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

import userRoute from './userRoute.js';
router.use('/users', userRoute);

import songRoute from './songRoute.js';
router.use('/songs', songRoute);

import reviewRoute from './reviewRoute.js';
router.use('/reviews', reviewRoute);

export default router;