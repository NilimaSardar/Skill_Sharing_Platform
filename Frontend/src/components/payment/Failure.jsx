import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M4.93 4.93l14.14 14.14M21 12A9 9 0 116.34 6.34 9 9 0 0121 12z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-red-700 mb-2">
          Payment Failed!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          There was an issue processing your payment.  
          Please try again.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
        >
          Go to Homepage
        </button>

      </div>
    </div>
  );
};

export default Failure;