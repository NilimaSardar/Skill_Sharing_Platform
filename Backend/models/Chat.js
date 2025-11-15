import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  ],

  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },

  lastMessage: { type: String }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
