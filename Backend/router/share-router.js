import express from "express";
import {
  createShare,
  getSharesByUser,
  updateShareStatus,
} from "../controllers/share-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

// Create a share post
router.post("/", authMiddleware, createShare);

// Get all shares of a user
router.get("/user/:userId", authMiddleware, getSharesByUser);

// Update share status (like proposal)
router.patch("/:shareId/status", authMiddleware, updateShareStatus);

export default router;
