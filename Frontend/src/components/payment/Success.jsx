import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  // decode token to get transaction info
  const decoded = token ? base64Decode(token) : null;

  const verifyPaymentAndUpdateStatus = async () => {
    if (!decoded) return;

    try {
      const response = await fetch("http://localhost:8000/payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: decoded.transaction_uuid }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Payment verification failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // redirect to chatroom after payment success
  useEffect(() => {
    if (token) verifyPaymentAndUpdateStatus();
  }, [token]);

  useEffect(() => {
    if (isSuccess && decoded) {
      const timeout = setTimeout(() => {
        navigate(`/dashboard/chat-room/${decoded.senderId}/${decoded.receiverId}`);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, decoded, navigate]);  

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="loader-circle mb-4"></div>
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          Confirming your payment…
        </p>
      </div>
    );

  if (!isSuccess)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 52 52">
            <circle
              className="text-red-500 stroke-current"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              strokeWidth="2"
            />
            <path
              className="text-red-600 stroke-current cross-line"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              d="M16 16 L36 36"
            />
            <path
              className="text-red-600 stroke-current cross-line"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              d="M36 16 L16 36"
            />
          </svg>

          <h1 className="text-2xl font-bold text-red-700 mt-4">
            Payment Failed!
          </h1>

          <p className="text-gray-600 mt-2">
            Something went wrong. Please try again.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <svg className="w-24 h-24 mx-auto" viewBox="0 0 52 52">
          <circle
            className="text-green-500 stroke-current"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            strokeWidth="2"
          />
          <path
            className="text-green-600 stroke-current check-tick"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27 l7 7 l17 -17"
          />
        </svg>

        <h1 className="text-2xl font-bold text-green-700 mt-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your payment.
        </p>
      </div>
    </div>
  );
};

export default Success;