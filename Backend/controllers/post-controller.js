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

    // ================================
    // SHARE TYPE VALIDATION
    // ================================
    if (type === "share") {
      if (!skillsOffered || skillsOffered.length === 0) {
        return res
          .status(400)
          .json({ message: "skillsOffered is required for share type" });
      }

      // Each offered skill must contain category & subcategory
      for (const skill of skillsOffered) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message:
              "Each offered skill must include category and subcategory",
          });
        }

        // Validate category & subcategory exists in DB
        const cat = await SkillCategory.findById(skill.category);
        if (!cat) {
          return res.status(400).json({
            message: "Invalid category in skillsOffered",
          });
        }

        const validSubs = cat.subcategories.map((s) => s._id.toString());

        if (!validSubs.includes(skill.subcategory)) {
          return res.status(400).json({
            message:
              "Selected subcategory does not belong to its category (skillsOffered)",
          });
        }
      }

      // Duration & Fees required
      if (!duration || !fees) {
        return res.status(400).json({
          message: "Duration and fees are required for share type",
        });
      }

      if (!addLessons || addLessons.length === 0) {
        return res.status(400).json({
          message: "At least one lesson is required for share type",
        });
      }
    }

    // ================================
    // EXCHANGE TYPE VALIDATION
    // ================================
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

      // Validate offered skills
      for (const skill of skillsOffered) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message:
              "Each offered skill must include category and subcategory",
          });
        }
        const cat = await SkillCategory.findById(skill.category);
        if (!cat) {
          return res.status(400).json({
            message: "Invalid category in skillsOffered",
          });
        }
        const validSubs = cat.subcategories.map((s) => s._id.toString());
        if (!validSubs.includes(skill.subcategory)) {
          return res.status(400).json({
            message:
              "Selected subcategory does not belong to its category (skillsOffered)",
          });
        }
      }

      // Validate interested skills
      for (const skill of skillsInterested) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message:
              "Each interested skill must include category and subcategory",
          });
        }
        const cat = await SkillCategory.findById(skill.category);
        if (!cat) {
          return res.status(400).json({
            message: "Invalid category in skillsInterested",
          });
        }
        const validSubs = cat.subcategories.map((s) => s._id.toString());
        if (!validSubs.includes(skill.subcategory)) {
          return res.status(400).json({
            message:
              "Selected subcategory does not belong to its category (skillsInterested)",
          });
        }
      }
    }

    // CLEANUPS
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

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // User authorization
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      type,
      title,
      description,
      category,
      duration,
      fees,
      skillsOffered,
      skillsInterested,
      addLessons
    } = req.body;

    // VALIDATE MAIN CATEGORY
    let finalCategory = category || post.category;

    const categoryData = await SkillCategory.findById(finalCategory);
    if (!categoryData) {
      return res.status(404).json({ message: "Selected category not found" });
    }

    const validSubIds = categoryData.subcategories.map((s) => s._id.toString());

    // VALIDATE TYPE
    let finalType = type || post.type;

    // SHARE VALIDATION
    if (finalType === "share") {
      const offered = skillsOffered || post.skillsOffered;

      if (!offered || offered.length === 0) {
        return res.status(400).json({
          message: "skillsOffered is required for share type",
        });
      }

      for (const skill of offered) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message: "Each offered skill must contain category & subcategory",
          });
        }

        // Category must match main category
        if (skill.category !== finalCategory.toString()) {
          return res.status(400).json({
            message: "Offered skill category must match the selected main category",
          });
        }

        if (!validSubIds.includes(skill.subcategory)) {
          return res.status(400).json({
            message: "Invalid subcategory selected in skillsOffered",
          });
        }
      }

      // Duration & fees required
      if (!duration && !post.duration) {
        return res.status(400).json({
          message: "Duration is required for share",
        });
      }
      if (!fees && !post.fees) {
        return res.status(400).json({
          message: "Fees is required for share",
        });
      }
    }

    // EXCHANGE VALIDATION
    if (finalType === "exchange") {
      const offered = skillsOffered || post.skillsOffered;
      const interested = skillsInterested || post.skillsInterested;

      if (!offered || offered.length === 0) {
        return res.status(400).json({
          message: "skillsOffered is required for exchange type",
        });
      }

      if (!interested || interested.length === 0) {
        return res.status(400).json({
          message: "skillsInterested is required for exchange type",
        });
      }

      // Validate both arrays
      for (const skill of offered) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message: "Each offered skill must contain category & subcategory",
          });
        }
      }

      for (const skill of interested) {
        if (!skill.category || !skill.subcategory) {
          return res.status(400).json({
            message: "Each interested skill must contain category & subcategory",
          });
        }
      }
    }

    // APPLY UPDATES
    post.title = title || post.title;
    post.description = description || post.description;
    post.type = finalType;
    post.category = finalCategory;
    post.skillsOffered = skillsOffered || post.skillsOffered;
    post.skillsInterested = skillsInterested || post.skillsInterested;

    // Share → use provided duration/fees  
    // Exchange → automatically remove
    post.duration = finalType === "exchange" ? "" : (duration || post.duration);
    post.fees = finalType === "exchange" ? 0 : (fees || post.fees);

    post.addLessons = addLessons || post.addLessons;

    const updated = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updated,
    });

  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

