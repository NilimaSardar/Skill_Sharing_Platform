import express from "express";
import {
  createSkillCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/skill-controller.js";

import authMiddleware from "../middlewares/auth-middleware.js";
import multer from "multer";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.post("/", authMiddleware, upload.single("image"), createSkillCategory);
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.put("/:id", authMiddleware, upload.single("image"), updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
