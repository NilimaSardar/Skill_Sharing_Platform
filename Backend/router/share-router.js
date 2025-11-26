import express from "express";
import {
  createShare,
  getSharesByUser,
  updateShareStatus,
} from "../controllers/share-controller.js";

const router = express.Router();

// Create a share post
router.post("/", createShare);

// Get all shares of a user
router.get("/user/:userId", getSharesByUser);

// Update share status
router.put("/:shareId/status", updateShareStatus);

export default router;
