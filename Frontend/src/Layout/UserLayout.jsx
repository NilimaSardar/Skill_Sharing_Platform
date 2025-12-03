import React from "react";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

const UserLayout = ({ children }) => {
  return (
    <div className="hidden sm:flex w-full h-[88vh] bg-gray-50 overflow-hidden">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 h-full overflow-y-auto hide-scrollbar">
        {children}
      </main>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />
    </div>
  );
};

export default UserLayout;
