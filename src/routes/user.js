/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User profile operations
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get authenticated user profile
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getUserInfo } from "../controllers/user.js";

const router = express.Router();

router.get('/profile', authenticate, getUserInfo);

export default router;