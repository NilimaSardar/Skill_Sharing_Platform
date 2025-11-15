const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Protected routes
router.post("/", authMiddleware, postController.createPost);
router.get("/", authMiddleware, postController.getAllPosts);
router.get("/:id", authMiddleware, postController.getPostById);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;