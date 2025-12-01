import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
      const { user, API } = useAuth();
    
  return (
    <aside className="w-64 bg-white min-h-fixed shadow-sm flex flex-col items-center py-6 scrollbar-none">

      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={
            user?.profilePhoto
              ? user.profilePhoto.startsWith("http")
                ? user.profilePhoto
                : `${API}/uploads/${user.profilePhoto}`
              : `${API}/uploads/Profile.jpeg`
          }
          alt={user?.fullName || "profile"}
          className="w-20 h-20 rounded-full object-cover"
        />

        <p className="mt-3 font-semibold text-gray-800 text-[15px]">
          {user?.fullName || "User Name"}
        </p>

        <Link
          to="/dashboard/profile"
          className="mt-3 bg-primary hover:bg-blue-700 text-white text-[14px] tracking-wide py-2 px-12 rounded-lg"
        >
          View Profile
        </Link>
      </div>

      {/* Menu List */}
      <div className="mt-10 w-full px-6 space-y-5">

        {/* Settings */}
        <button className="flex items-center justify-between w-full text-gray-700">
          <span className="flex items-center gap-3">
            <Cog6ToothIcon className="w-5 h-5" />
            Settings
          </span>
          <span>›</span>
        </button>

        {/* Security */}
        <button className="flex items-center justify-between w-full text-gray-700">
          <span className="flex items-center gap-3">
            <ShieldCheckIcon className="w-5 h-5" />
            Security
          </span>
          <span>›</span>
        </button>

        {/* Support */}
        <NavLink
          to="/dashboard/support"
          className={({ isActive }) =>
            `flex items-center justify-between w-full ${
              isActive ? "text-blue-600" : "text-gray-700"
            }`
          }
        >
          <span className="flex items-center gap-3">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            Support
          </span>
          <span>›</span>
        </NavLink>

        {/* Timeline Items */}
        <div className="pl-3 border-l-2 border-gray-300 space-y-4 mt-4">
          <p className="text-gray-600 text-sm">Policy</p>
          <p className="text-gray-600 text-sm">Support</p>
          <p className="text-gray-600 text-sm">Services</p>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-auto w-full px-6 pb-6">
        <button className="w-full flex items-center gap-3 border border-red-300 text-red-600 py-2 rounded-lg justify-center font-medium">
          <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
