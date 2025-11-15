const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: String, required: true },
  type:  { type: String, enum: ["share", "exchange"], required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },

  // Skills (optional fields for post context)
  skillsOffered:    [String],
  skillsInterested: [String],

  duration: { type: String, required: true },
  fees: { type: Number, default: 0 },
  status: { type: String, default: "active" } // active/completed
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

