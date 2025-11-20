import express from "express";
import {
  createSkillCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/skill-controller.js";

import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

// Routes
router.post("/", authMiddleware, createSkillCategory);
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
