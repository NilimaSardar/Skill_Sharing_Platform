import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

// Icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaFolderTree} from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { FiChevronDown, FiLogOut } from "react-icons/fi";


import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md"; 

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
  
    return (
      <>
        {/* Mobile Topbar */}
        <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white shadow fixed top-0 left-0 z-40">
          <IoMenu size={28} className="cursor-pointer" onClick={() => setOpen(true)} />
          <img src="../images/ProXchange.svg" className="w-[190px] h-[30px]" alt="" />
        </div>
  
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 p-6 bg-white shadow-md transform transition-transform duration-300 z-50 flex flex-col
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          {/* Logo */}
          <img src="../images/ProXchange.svg" className="w-[190px] h-[30px]" alt="" />
  
          {/* Navigation */}
          <nav className="flex flex-col gap-2 text-gray-700 mt-6 flex-1">
  
            <Link
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
            >
              <MdSpaceDashboard size={18} /> Dashboard
            </Link>
  
            {/* Categories Dropdown */}
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <span className="flex items-center gap-3">
                <FaFolderTree size={18} /> Category
              </span>
              <FiChevronDown
                size={16}
                className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>
  
            {categoryOpen && (
              <div className="ml-10 mt-1 flex flex-col gap-1">
                <button
                  onClick={() => navigate("/admin/addCategory")}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-lg text-sm"
                >
                  <FaPlusCircle size={15} /> Add Category
                </button>
  
                <button
                  onClick={() => navigate("/admin/addSubcategory")}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-lg text-sm"
                >
                  <MdOutlineSubdirectoryArrowRight size={18} /> Add Subcategory
                </button>
              </div>
            )}
  
            <button
              onClick={() => navigate("/admin/reports")}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <TbReportAnalytics size={18} /> Reports
            </button>
  
            <button
              onClick={() => navigate("/admin/usermanagement")}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <FaUserCog size={18} /> User Management
            </button>
  
            <button
              onClick={() => navigate("/admin/settings")}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <IoSettingsSharp size={18} /> Settings
            </button>
          </nav>
  
          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm bg-red-50 text-red-600 rounded-lg"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </aside>
  
        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </>
    );
};  

export default Sidebar;