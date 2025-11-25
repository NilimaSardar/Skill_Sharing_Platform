import Proposal from "../models/Proposal.js";

// Create a new proposal
export const createProposal = async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();
    res.status(201).json({ success: true, proposal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserProposals = async (req, res) => {
  const userId = req.params.userId;
  const status = req.query.status;

  try {
    const proposals = await Proposal.find({
      status,
      $or: [{ receiverId: userId }, { senderId: userId }],
    })
      .populate("senderId", "fullName profilePhoto age location isActive")
      .populate("receiverId", "fullName profilePhoto age location isActive");

    res.status(200).json({ success: true, proposals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProposalStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "accepted", "rejected", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const proposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }
    res.status(200).json({ success: true, proposal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
