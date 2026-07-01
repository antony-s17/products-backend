import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getUserInfo } from "../controllers/users.js";
import requireRole from "../middlewares/requireRole.js";

const router = express.Router();

router.get('/profile', authenticate, requireRole("USER") , getUserInfo);

export default router;