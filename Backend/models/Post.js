const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type:  { type: String, enum: ["share", "exchange"], required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },

  // Skills (optional fields for post context)
  skillsOffered:    [String],
  skillsInterested: [String],

// Duration is required ONLY for 'share'
duration: {
  type: String,
  required: function () {
    return this.type === "share";
  },
},

// Fees required ONLY for 'share'
fees: {
  type: Number,
  required: function () {
    return this.type === "share";
  },
  default: 0,
},

  status: { type: String, default: "active" } // active/completed
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

