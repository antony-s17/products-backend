/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: Product review operations
 * /api/product/{productId}/reviews:
 *   post:
 *     tags:
 *       - Review
 *     summary: Create a review for a product
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created
 *   get:
 *     tags:
 *       - Review
 *     summary: Get reviews for a product
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
import express from "express";
import { createReview, getReviewByProduct } from "../controllers/review.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router({mergeParams: true});

router.post('/', authenticate,createReview);
router.get('/', authenticate, getReviewByProduct);

export default router;