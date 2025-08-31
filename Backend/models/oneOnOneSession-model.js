const mongoose = require("mongoose");

const OneOnOneSessionSchema = new mongoose.Schema({
  skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  skill_name: String,
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider_name: String,
  learner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  learner_name: String,
  scheduled_time: Date,
  duration_minutes: Number,
  price: Number,
  currency: String,
  meeting_url: String,
  status: String,
  notes: String,
  created_date: { type: Date, default: Date.now },
  updated_date: Date
});

module.exports = mongoose.model("OneOnOneSession", OneOnOneSessionSchema);
