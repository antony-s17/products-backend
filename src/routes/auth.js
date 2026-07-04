/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid data
 * /api/auth/registerAdmin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new admin
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Admin created
 *       403:
 *         description: Forbidden
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid credentials
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out
 */
import express from 'express';
import validateCreateUser from '../middlewares/validateCreateUser.js';
import { createUser, login, logout } from '../controllers/auth.js';
import authenticate from '../middlewares/authenticate.js';
import requireRole from '../middlewares/requireRole.js';

const router = express.Router();

router.post('/register', validateCreateUser, createUser);
router.post('/registerAdmin', authenticate, requireRole('ADMIN') ,validateCreateUser, createUser);
router.post('/login', login);
router.post('/logout', authenticate, logout);

export default router;