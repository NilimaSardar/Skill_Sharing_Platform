import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { skill, type, title, description, duration, fees, media, skillsOffered, skillsInterested } = req.body;

    if (!type || !title || !description || !duration) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newPost = await Post.create({
      userId: req.user._id, // from auth middleware
      type,
      title,
      description,
      duration,
      fees: fees || 0,
      media: media || [],
      skillsOffered: skillsOffered || [],
      skillsInterested: skillsInterested || [],
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
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
    const post = await Post.findById(req.params.id).populate("userId", "fullName email profilePhoto");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    console.error("Get Post Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete post (only creator can delete)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

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
