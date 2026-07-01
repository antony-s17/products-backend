import express from 'express';
import validateCreateUser from '../middlewares/validateCreateUser.js';
import { createUser, login, logout } from '../controllers/auth.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', validateCreateUser, createUser);
router.post('/login', login);
router.post('/logout', authenticate, logout);
//router.get('/me/:id', getUserInfo);

export default router;