import SharePost from "../models/SharePost.model.js";

// Create a share
export const createShare = async (req, res) => {
  const { postId, senderId, receiverId, message } = req.body;

  try {
    const newShare = new SharePost({
      postId,
      senderId,
      receiverId,
      message,
    });

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
      .populate("senderId", "fullName profilePhoto")
      .populate("receiverId", "fullName profilePhoto")
      .sort({ createdAt: -1 });

    res.status(200).json(shares);
  } catch (error) {
    console.error("Error fetching shares:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update share status
export const updateShareStatus = async (req, res) => {
  const { shareId } = req.params;
  const { status } = req.body;

  try {
    const share = await SharePost.findById(shareId);
    if (!share) return res.status(404).json({ message: "Share not found" });

    share.status = status;
    await share.save();

    res.status(200).json({ message: "Share status updated", share });
  } catch (error) {
    console.error("Error updating share:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
