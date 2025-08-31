const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  session_group_id: { type: mongoose.Schema.Types.ObjectId, ref: "SessionGroup" },
  one_on_one_session_id: { type: mongoose.Schema.Types.ObjectId, ref: "OneOnOneSession" },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  author_name: String,
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject_name: String,
  rating: Number,
  comment: String,
  type: String,
  created_date: { type: Date, default: Date.now },
  is_anonymous: Boolean
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
