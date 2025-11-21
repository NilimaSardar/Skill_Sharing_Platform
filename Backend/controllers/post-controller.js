import Post from "../models/Post.js";
import SkillCategory from "../models/SkillCategory.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      duration,
      fees,
      skillsOffered,
      skillsInterested,
      addLessons,
    } = req.body;

    // BASIC REQUIRED FIELDS
    if (!type || !title || !description) {
      return res.status(400).json({
        message: "Type, title and description are required",
      });
    }

    // Validate skillsOffered
    if (!skillsOffered || skillsOffered.length === 0) {
      return res.status(400).json({
        message: `skillsOffered is required for ${type} type`,
      });
    }

    for (const skill of skillsOffered) {
      if (!skill.category || !skill.subcategory || !skill.expertLevel) {
        return res.status(400).json({
          message:
            "Each offered skill must include category, subcategory, and expertLevel",
        });
      }
    }

    // Validate skillsInterested for exchange type
    if (type === "exchange") {
      if (!skillsInterested || skillsInterested.length === 0) {
        return res.status(400).json({
          message: "skillsInterested is required for exchange type",
        });
      }

      for (const skill of skillsInterested) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message:
              "Each interested skill must include category and subcategory",
          });
        }
      }
    }

    // Duration & Fees required for share type
    const cleanDuration = type === "exchange" ? "" : duration;
    const cleanFees = type === "exchange" ? 0 : fees;

    // CREATE POST
    const newPost = await Post.create({
      userId: req.user._id,
      type,
      title,
      description,
      duration: cleanDuration,
      fees: cleanFees,
      skillsOffered,
      skillsInterested: skillsInterested || [],
      addLessons: addLessons || [],
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get posts by user ID
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

  const posts = await Post.find({ userId, status: "active" }).sort({ createdAt: -1 }); // optional: latest first

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Get posts by user error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "active" })
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

// Soft Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Only owner can delete
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Soft delete → change status
    post.status = "inactive";
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post marked as inactive",
      post
    });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      type,
      title,
      description,
      duration,
      fees,
      skillsOffered,
      skillsInterested,
      addLessons,
    } = req.body;

    // Find post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Authorization
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const finalType = type || post.type;

    // Validate skillsOffered
    if (finalType === "share" || finalType === "exchange") {
      const offered = skillsOffered || post.skillsOffered;

      if (!offered || offered.length === 0) {
        return res.status(400).json({ message: "skillsOffered is required" });
      }

      for (const skill of offered) {
        if (!skill.category || !skill.subcategory || !skill.expertLevel) {
          return res.status(400).json({
            message: "Each offered skill must include category, subcategory, and expertLevel",
          });
        }
      }
    }

    // Validate skillsInterested only for exchange type
    if (finalType === "exchange") {
      const interested = skillsInterested || post.skillsInterested;

      if (!interested || interested.length === 0) {
        return res.status(400).json({ message: "skillsInterested is required" });
      }

      for (const skill of interested) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message: "Each interested skill must include category and subcategory",
          });
        }
      }
    }

    // Prepare update object
    const updatedData = {
      title: title || post.title,
      description: description || post.description,
      type: finalType,
      skillsOffered: skillsOffered || post.skillsOffered,
      skillsInterested: skillsInterested || post.skillsInterested,
      addLessons: addLessons || post.addLessons,
      duration: finalType === "exchange" ? "" : duration || post.duration,
      fees: finalType === "exchange" ? 0 : fees || post.fees,
    };

    // Update post safely
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
