import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  requestId:  { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  payerId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },
  method: { type: String, enum: ["Esewa"], required: true },

  status: { type: String, enum: ["paid", "pending", "failed"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
