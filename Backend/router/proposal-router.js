import express from "express";
import {
  createProposal,
  getUserProposals,
  updateProposalStatus,
} from "../controllers/proposal-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProposal);

router.get("/user/:userId", authMiddleware, getUserProposals);

router.patch("/:id/status", authMiddleware, updateProposalStatus);

export default router;
