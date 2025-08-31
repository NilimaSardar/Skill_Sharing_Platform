const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  session_group_id: { type: mongoose.Schema.Types.ObjectId, ref: "SessionGroup" },
  one_on_one_session_id: { type: mongoose.Schema.Types.ObjectId, ref: "OneOnOneSession" },
  from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from_user_name: String,
  to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to_user_name: String,
  amount: Number,
  currency: String,
  payment_method: String,
  status: String,
  transaction_reference: String,
  created_date: { type: Date, default: Date.now },
  updated_date: Date
});

module.exports = mongoose.model("Transaction", TransactionSchema);
