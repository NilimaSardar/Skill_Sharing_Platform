import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscDiffAdded } from "react-icons/vsc";
import { BsChatText } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuth } from "../store/auth";

export default function TopBar() {
  const { API, user } = useAuth();
  const token = localStorage.getItem("token");
  const [hasNotifications, setHasNotifications] = useState(false);

  const links = [
    { to: "/dashboard/home", icon: <GoHome size={28} /> },
    { to: "/dashboard/request", icon: <HiOutlineUserGroup size={28} /> },
    { to: "/dashboard/create", icon: <VscDiffAdded size={30} /> },
    { to: "/dashboard/chat", icon: <BsChatText size={26} /> },
  ];

  // Check for unread notifications
  useEffect(() => {
    const checkNotifications = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}?status=pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const received = (data.proposals || []).filter(
          (p) => p.receiverId?._id === user._id
        );
        setHasNotifications(received.length > 0);
      } catch (err) {
        console.error(err);
        setHasNotifications(false);
      }
    };

    checkNotifications();
  }, [API, user, token]);

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
                {link.icon}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-md"></div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6 relative">
        <NavLink to="/dashboard/notifications" className="relative">
          <IoNotificationsOutline size={26} className="text-gray-600 cursor-pointer" />
          {hasNotifications && (
            <span className="absolute top-0 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </NavLink>

        <NavLink to="/dashboard/profile">
          <img
            src={
              user?.profilePhoto
                ? user.profilePhoto.startsWith("http")
                  ? user.profilePhoto
                  : `${API}/uploads/${user.profilePhoto}`
                : `${API}/uploads/Profile.jpeg`
            }
            alt={user?.fullName || "profile"}
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
          />
        </NavLink>
      </div>
    </div>
  );
}
