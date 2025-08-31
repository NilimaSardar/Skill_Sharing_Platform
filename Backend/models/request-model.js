const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  skill_name: String,
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sender_name: String,
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver_name: String,
  message: String,
  status: String,
  created_date: { type: Date, default: Date.now },
  resolved_date: Date
});

module.exports = mongoose.model("Request", RequestSchema);
