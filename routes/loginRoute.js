import express from 'express';
import { requiresAuth } from '../middleware/auth.js';
import {login, logout, afterLogin} from '../controller/loginController.js';
const router = express.Router();


router.get("/login", login);
router.get("/afterLogin", requiresAuth(), afterLogin);
router.get("/logout", logout);


export default router;