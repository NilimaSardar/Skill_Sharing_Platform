const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: String,
  category: String,
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Skill", SkillSchema);
