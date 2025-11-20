import { createPost, getAllPosts, getPostById, deletePost } from "../controllers/post-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import express from "express";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPostById);
router.delete("/:id", authMiddleware, deletePost);

export default router;