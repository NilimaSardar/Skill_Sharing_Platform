import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/user-skill-controller.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, addSkill);              
router.get("/", authMiddleware, getSkills);              
router.put("/:skillId", authMiddleware, updateSkill);     
router.delete("/:skillId", authMiddleware, deleteSkill);  

export default router;
