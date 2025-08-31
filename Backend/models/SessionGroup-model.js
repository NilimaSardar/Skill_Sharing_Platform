const mongoose = require("mongoose");

const SessionGroupSchema = new mongoose.Schema({
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creator_details: {
    name: String,
    profile_image: String
  },
  skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  skill_name: String,
  title: String,
  description: String,
  scheduled_time: Date,
  duration_minutes: Number,
  max_attendees: Number,
  price: Number,
  currency: String,
  meeting_url: String,
  status: String,
  enrollments: [{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user_name: String,
    status: String,
    requested_date: Date,
    responded_date: Date,
    responded_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    response_message: String
  }],
  created_date: { type: Date, default: Date.now },
  updated_date: Date
});

module.exports = mongoose.model("SessionGroup", SessionGroupSchema);
