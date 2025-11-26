import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateUniqueId } from "esewajs";

const PaymentForm = () => {
  const { state } = useLocation();
  const [amount, setAmount] = useState("");
  const senderId = state?.senderId;
  const receiverId = state?.receiverId;

  useEffect(() => {
    if (state?.amount) {
      setAmount(state.amount);
    }
  }, [state]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          productId: generateUniqueId(),
          senderId,
          receiverId
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Payment URL missing:", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          eSewa Payment
        </h1>

        {/* Amount Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-gray-600 text-sm">Amount to Pay</p>
          <p className="text-3xl font-bold text-green-700">Rs. {amount}</p>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          
          {/* Amount (read-only) */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              readOnly
              className="mt-1 p-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
