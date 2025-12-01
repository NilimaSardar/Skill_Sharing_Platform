import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscDiffAdded } from "react-icons/vsc";
import { BsChatText } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

export default function TopBar() {
  const links = [
    { to: "/dashboard/home", icon: <GoHome size={28} /> },
    { to: "/dashboard/request", icon: <HiOutlineUserGroup size={28} /> },
    { to: "/dashboard/create", icon: <VscDiffAdded size={30} /> },
    { to: "/dashboard/chat", icon: <BsChatText size={26} /> },
  ];

  return (
    <div className="hidden sm:flex w-full h-[70px] bg-white shadow-md fixed top-0 z-50 px-6 items-center justify-between">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-2">
        <img src="/images/ProXchange.svg" alt="logo" className="h-7 w-auto" />
      </div>

      {/* CENTER NAV */}
      <div className="flex items-center h-full mr-20">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative flex items-center justify-center h-full px-4
              ${isActive ? "text-primary" : "text-gray-500 hover:bg-primary-light"}`
            }
          >
            {({ isActive }) => (
              <div className="flex flex-col w-23 items-center justify-center h-full relative">
                {/* ICON */}
                {link.icon}

                {/* ACTIVE BORDER */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-md"></div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">
        <IoNotificationsOutline size={26} className="text-gray-600 cursor-pointer" />

        <NavLink to="/dashboard/chat">
          <BsChatText size={24} className="text-gray-600" />
        </NavLink>

        <NavLink to="/dashboard/profile">
          <img
            src="../../profile/Nilima.jpeg"
            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
            alt="Profile"
          />
        </NavLink>
      </div>
    </div>
  );
}
