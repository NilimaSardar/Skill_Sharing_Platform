import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Topbar - Mobile Only */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white shadow fixed top-0 left-0 z-40">
        <IoMenu size={28} className="cursor-pointer" onClick={() => setOpen(true)} />
        <div className='flex justify-between items-center'>
            <img src="../images/ProXchange.svg" alt="" className='w-[190px] h-[30px]'/>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 p-6 bg-white shadow-md 
          transform transition-transform duration-300 z-50 
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className='flex justify-between items-center'>
            <img src="../images/ProXchange.svg" alt="" className='w-[190px] h-[30px]'/>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-gray-700 mt-6 flex-1">
          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
          >
            <span>📊</span> Dashboard
          </Link>

          <button
            onClick={() => {
              navigate("/admin/category");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
          >
            <span>📁</span> Category
          </button>

          <button
            onClick={() => {
              navigate("/admin/reports");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
          >
            <span>📑</span> Reports
          </button>

          <button
            onClick={() => {
              navigate("/admin/feedback");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
          >
            <span>💬</span> Feedback
          </button>
        </nav>

        {/* Logout at Bottom */}
        <div className="pb-4">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="w-full py-2 text-sm bg-red-50 text-red-600 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay - Mobile */}
      {open && (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs md:hidden z-40"
            onClick={() => setOpen(false)}
        ></div>
    )}


      {/* Main Content */}
      <main className="flex-1 md:ml-64 md:pt-0 pt-16">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;