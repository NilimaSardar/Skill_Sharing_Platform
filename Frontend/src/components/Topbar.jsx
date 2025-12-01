import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi2";
import { VscDiffAdded } from "react-icons/vsc";
import { BsChatText } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

export default function TopBar() {
  const links = [
    { to: "/dashboard/home", label: "Home", icon: <GoHome size={22} /> },
    { to: "/dashboard/request", label: "Request", icon: <HiOutlineUserGroup size={22} /> },
    { to: "/dashboard/create", label: "Create", icon: <VscDiffAdded size={22} /> },
    { to: "/dashboard/chat", label: "Chat", icon: <BsChatText size={22} /> },
  ];

  return (
    <div className="hidden sm:flex w-full h-[70px] bg-white shadow-md fixed top-0 z-50 px-6 items-center justify-between">
      
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-2">
        <img src="/images/ProXchange.svg" alt="logo" className="h-7 w-auto" />
      </div>

      {/* CENTER: NAV LINKS */}
      <div className="flex gap-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 text-[16px] font-medium ${
                isActive ? "text-primary" : "text-gray-500"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* RIGHT: NOTIFICATION + PROFILE */}
      <div className="flex items-center gap-6">
            <img
              src="../images/notification.svg"
              alt="notification"
              className="w-6 h-6"
            />

        <NavLink to="/dashboard/profile">
          <img
            src="../profile/Nilima.jpeg"
            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
            alt="Profile"
          />
        </NavLink>
      </div>
    </div>
  );
}
