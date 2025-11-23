import React from "react";
import Topbar from "../components/Admin/Topbar";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main className="p-4">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
