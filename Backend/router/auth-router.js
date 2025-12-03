import express from "express";
import multer from "multer";
import {
  home,
  register,
  login,
  logout,
  user,
  getUserById,
  updateUser,
  changePassword,
} from "../controllers/auth-controller.js";
import { signupSchema, loginSchema } from "../validators/auth-validator.js";
import validate from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

// Multer setup for profile photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });

// Public routes
router.get("/", home);
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
// router.get("/active-users", authMiddleware, getActiveUsers);

// Protected routes
router.get("/user", authMiddleware, user); 
router.get("/user/:id", authMiddleware, getUserById); 
router.get("/user/:id", authMiddleware, updateUser); 
router.put("/user/:id", authMiddleware, upload.single("profilePhoto"), updateUser); 
router.put("/user/:id/change-password", authMiddleware, changePassword);

export default router;