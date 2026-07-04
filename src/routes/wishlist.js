/**
 * @swagger
 * tags:
 *   - name: Wishlist
 *     description: Wishlist operations
 * /api/wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add a product to wishlist
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get the authenticated user wishlist
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Wishlist contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistItem'
 * /api/wishlist/{productId}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Remove a product from wishlist
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
 *         description: Product removed from wishlist
 */
import express from "express";
import { addToWishList, getWishList, deleteFromWishList } from "../controllers/wishlist.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post('/', authenticate,addToWishList);
router.get('/', authenticate,getWishList);
router.delete('/:productId', authenticate, deleteFromWishList);

export default router;