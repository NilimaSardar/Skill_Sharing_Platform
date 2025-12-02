import SharePost from "../models/SharePost.model.js";

// Create a share
export const createShare = async (req, res) => {
  const { postId, senderId, receiverId, message } = req.body;
  console.log("Creating share with:", req.body);
  try {
    const newShare = new SharePost({ postId, senderId, receiverId, message, status: "accepted" });
    await newShare.save();
    res.status(201).json({ message: "Share created successfully", share: newShare });
  } catch (error) {
    console.error("Error creating share:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all shares of a user (sent or received)
export const getSharesByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const shares = await SharePost.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("postId")
      .populate("senderId", "fullName profilePhoto age location isActive")
      .populate("receiverId", "fullName profilePhoto age location isActive")
      .sort({ createdAt: -1 });

    res.status(200).json(shares);
  } catch (error) {
    console.error("Error fetching shares:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update share status (like proposal)
export const updateShareStatus = async (req, res) => {
  const { shareId } = req.params;
  const { status } = req.body;

  // Validate status
  if (!["pending","accepted", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const share = await SharePost.findByIdAndUpdate(
      shareId,
      { status },
      { new: true }
    );

    if (!share) {
      return res.status(404).json({ success: false, message: "Share not found" });
    }

    res.status(200).json({ success: true, share });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
