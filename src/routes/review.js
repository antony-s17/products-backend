import express from "express";
import { createReview } from "../controllers/review.js";

const router = express.Router({mergeParams: true});

router.post('/', createReview);

export default router;