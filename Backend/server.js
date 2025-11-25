import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import authRoute from "./router/auth-router.js";
import postRoutes from "./router/post-router.js";
import skillRoutes from "./router/skills-router.js";
import userSkillRoutes from "./router/user-skill-router.js";
import proposalRoutes from "./router/proposal-router.js";

import {EsewaInitiatePayment,paymentStatus} from ""

import adminRoutes from "./router/admin-router.js";

import connectDb from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// CORS options
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

// Mounting routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/user/skills", userSkillRoutes);
app.use("/api/proposals", proposalRoutes);

/* for payment */
  //middle ware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //routes
  app.post("/initiate-payment", EsewaInitiatePayment);
  app.post("/payment-status", paymentStatus);

// admin Routes
app.use("/api/admin", adminRoutes);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

// Database connection + start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ports: ${PORT}`);
  });
});