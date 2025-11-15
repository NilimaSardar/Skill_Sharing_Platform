import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  postId:    { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  senderId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  message:   { type: String },
  status:    { 
    type: String, 
    enum: ["pending", "accepted", "rejected", "completed"], 
    default: "pending" 
  }
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);