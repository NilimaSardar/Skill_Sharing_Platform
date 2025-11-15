import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  skill: { type: String, required: true },
  type:  { type: String, enum: ["share", "exchange"], required: true },

  description: { type: String, required: true },
  duration:    { type: String, required: true },
  fees:        { type: Number, default: 0 },

  media: [String],

  status: { type: String, default: "active" } // active/completed
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
