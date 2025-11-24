import { createPost, getPostsByUser, getAllPosts, getPostById, deletePost, updatePost, getPosts } from "../controllers/post-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import express from "express";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPost);
// router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPostById);
router.patch("/delete/:id", authMiddleware, deletePost);
router.patch("/update/:id", authMiddleware, updatePost);
router.get("/user/:userId", authMiddleware, getPostsByUser);
// GET /api/posts?type=share&category=Cooking
router.get("/", authMiddleware, getPosts);

export default router;