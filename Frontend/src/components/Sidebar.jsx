import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { user, API, LogoutUser } = useAuth();

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      id: "settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      title: "Settings",
      links: [
        { label: "Edit Information", path: "/dashboard/profile/editProfile" },
        { label: "Change Password", path: "/dashboard/profile/change-password" },
      ],
    },
    {
      id: "security",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      title: "Security",
      links: [
        { label: "Safety Guidelines", path: "/dashboard/profile/safety-guidelines" },
      ],
    },
    {
      id: "support",
      icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
      title: "Support & Legal",
      links: [
        { label: "Privacy Policy", path: "/dashboard/profile/privacy-policy" },
        { label: "Help & Support", path: "/dashboard/profile/help-support" },
        { label: "Terms of Service", path: "/dashboard/profile/terms-of-service" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen shadow-sm flex flex-col items-center py-6 overflow-y-auto scrollbar-none">

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
        <p className="text-[#737373] text-[14px]">
          {user?.email || "user@example.com"}
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
        {menuItems.map((menu) => (
          <div key={menu.id}>
            {/* Parent Button */}
            <button
              onClick={() => toggleMenu(menu.id)}
              className="flex items-center justify-between w-full text-gray-700 hover:text-primary transition"
            >
              <span className="flex items-center gap-3">
                {menu.icon}
                {menu.title}
              </span>
              <span>
                <ChevronRightIcon
                  className={`w-4 h-4 font-[600] transition-transform duration-300 ${
                    openMenu === menu.id ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>

            {/* Dropdown */}
            <div
              className={`relative transition-all overflow-hidden duration-300 ${
                openMenu === menu.id ? "max-h-60 mt-3 pl-4" : "max-h-0"
              }`}
            >

              {/* Vertical timeline line */}
              <div className="absolute left-[8px] top-0 bottom-0 w-[2px] bg-gray-300"></div>

              <div className="space-y-4">
                {menu.links.map((link, i) => (
                  <NavLink
                    key={i}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 pl-6 text-sm ${
                        isActive ? "text-primary font-medium" : "text-gray-600"
                      }`
                    }
                  >
                    {/* Dot perfectly aligned on line */}
                    <span className="w-2 h-2 bg-gray-300 rounded-full absolute left-[5px]"></span>

                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto mb-15 w-full px-6 pb-6">
        <button
          onClick={LogoutUser}
          className="w-full flex items-center gap-3 border border-red-300 text-red-500 py-2 rounded-lg justify-center font-medium"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
