const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, skillController.createSkillCategory);
router.get("/", authMiddleware, skillController.getAllCategories);
router.get("/:id", authMiddleware, skillController.getCategoryById);
router.put("/:id", authMiddleware, skillController.updateCategory);
router.delete("/:id", authMiddleware, skillController.deleteCategory);

module.exports = router;
