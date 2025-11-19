import Post from "../models/Post.js";
import SkillCategory from "../models/SkillCategory.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      category,
      duration,
      fees,
      skillsOffered,
      skillsInterested,
      addLessons,
    } = req.body;

    // Basic validation
    if (!type || !title || !description || !category) {
      return res.status(400).json({
        message: "Type, title, description and category are required",
      });
    }

    // Fetch selected category
    const categoryData = await SkillCategory.findById(category);

    if (!categoryData) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const validSubcategoryIds = categoryData.subcategories.map((s) => s._id.toString());

    // SHARE TYPE VALIDATION
    if (type === "share") {
      if (!skillsOffered || skillsOffered.length === 0) {
        return res.status(400).json({
          message: "skillsOffered is required for share type",
        });
      }

      if (!duration || !fees) {
        return res.status(400).json({
          message: "Duration & fees are required for share type",
        });
      }

      if (!addLessons || addLessons.length === 0) {
        return res.status(400).json({
          message: "At least one lesson must be added for share type",
        });
      }

      // Validate that skillsOffered belongs ONLY to the selected category
      const invalidSkills = skillsOffered.filter(
        (item) => !validSubcategoryIds.includes(item)
      );

      if (invalidSkills.length > 0) {
        return res.status(400).json({
          message: "skillsOffered contains subcategories that do NOT belong to this category",
        });
      }
    }

    // EXCHANGE TYPE VALIDATION
    let cleanDuration = duration;
    let cleanFees = fees;

    if (type === "exchange") {
      if (!skillsOffered || skillsOffered.length === 0) {
        return res.status(400).json({
          message: "skillsOffered is required for exchange type",
        });
      }

      if (!skillsInterested || skillsInterested.length === 0) {
        return res.status(400).json({
          message: "skillsInterested is required for exchange type",
        });
      }

      // Exchange → ignore duration & fees
      cleanDuration = "";
      cleanFees = 0;
    }

    // Create Post
    const newPost = await Post.create({
      userId: req.user._id,
      type,
      title,
      description,
      category,
      duration: cleanDuration,
      fees: cleanFees,
      skillsOffered,
      skillsInterested,
      addLessons: addLessons || [],
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "fullName email profilePhoto")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "fullName email profilePhoto")
      .populate("category", "name");

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    console.error("Get Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};