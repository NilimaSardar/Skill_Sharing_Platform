import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId:   { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  message:  { type: String },
  file:     { type: String }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
