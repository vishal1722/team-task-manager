import express from "express";
import { getUsers, makeAdmin } from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUsers); // ✅ allow all logged-in users
router.put("/make-admin/:id", protect, isAdmin, makeAdmin);

export default router;