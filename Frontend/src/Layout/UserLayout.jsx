import React from "react";
import Sidebar from "../components/Sidebar";

const UserLayout = ({ children }) => {
  return (
    <div className="hidden sm:flex w-full h-[90vh] bg-gray-50 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar />

      {/* CONTENT */}
      <main className="p-6 w-full h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default UserLayout;
