import { Transaction } from "../models/Transaction.model.js";
import { EsewaPaymentGateway, EsewaCheckStatus } from "esewajs";

export const EsewaInitiatePayment = async (req, res) => {
  const { amount, productId } = req.body;
  try {
    const reqPayment = await EsewaPaymentGateway(
      amount, 0, 0, 0, productId,
      process.env.MERCHANT_ID,
      process.env.SECRET,
      process.env.SUCCESS_URL,
      process.env.FAILURE_URL,
      process.env.ESEWAPAYMENT_URL
    );

    if (!reqPayment) return res.status(400).json({ message: "Error sending data" });

    if (reqPayment.status === 200 && reqPayment.request?.res?.responseUrl) {
      const transaction = new Transaction({ product_id: productId, amount });
      await transaction.save();
      return res.json({ url: reqPayment.request.res.responseUrl });
    }

    res.status(400).json({ message: "Failed to initiate payment" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const paymentStatus = async (req, res) => {
  const { product_id } = req.body;
  try {
    const transaction = await Transaction.findOne({ product_id });
    if (!transaction) return res.status(400).json({ message: "Transaction not found" });

    const paymentStatusCheck = await EsewaCheckStatus(
      transaction.amount,
      transaction.product_id,
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL
    );

    transaction.status = paymentStatusCheck.data?.status || "failed";
    await transaction.save();

    res.status(200).json({ message: "Transaction status updated successfully" });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};