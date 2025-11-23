import React from "react";
import Topbar from "../components/Admin/Topbar";
import Sidebar from "../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        {/* Child pages will render here */}
        <main className="p-4 md:pl-68">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;