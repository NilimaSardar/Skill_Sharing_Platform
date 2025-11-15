import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },

  ratedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  rating:   { type: Number, min: 1, max: 5, required: true },
  feedback: { type: String }
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
