import SkillCategory from "../models/SkillCategory.model.js";

// Create a new Skill Category
export const createSkillCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await SkillCategory.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const image = req.file ? req.file.path : null; // save image path

    const category = await SkillCategory.create({
      name: name.trim(),
      subcategories: subcategories || [],
      image,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Create SkillCategory Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await SkillCategory.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.error("Get Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, subcategories, isActive } = req.body;

    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name.trim();
    if (subcategories) category.subcategories = subcategories;
    if (typeof isActive === "boolean") category.isActive = isActive;
    if (req.file) category.image = req.file.path; // update image

    await category.save();

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await SkillCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
