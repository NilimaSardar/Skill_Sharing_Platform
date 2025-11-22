import React from "react";

const Topbar = () => {
  return (
    <div className="flex justify-end items-center bg-white">

      <div className="flex items-center gap-6">
        <button className="text-gray-600 text-xl">❓</button>
        <button className="relative text-gray-600 text-xl">🔔</button>

        <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm">
          <img src="https://i.pravatar.cc/40" alt="avatar" className="w-9 h-9 rounded-full" />
          <div className="text-sm">
            <div className="font-semibold">Emma Amelia</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
