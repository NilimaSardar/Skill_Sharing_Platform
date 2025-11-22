import express from "express";
import { adminLogin, getAdminDashboard } from "../controllers/admin-controller.js";
import authMiddleware  from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Admin protected routes
router.get("/dashboard", authMiddleware, adminMiddleware, getAdminDashboard);

export default router;