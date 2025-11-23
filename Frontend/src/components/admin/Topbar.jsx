import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end items-center bg-white shadow-md py-2 px-4 relative">

      {/* DESKTOP BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="hidden md:flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg 
                   transition text-sm font-medium text-gray-700"
      >
        Quick Action
        <FiChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* MOBILE ONLY — Down Arrow */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200
                   transition flex items-center justify-center"
      >
        <FiChevronDown
          size={22}
          className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-12 right-2 w-48 bg-white border border-gray-200 shadow-lg 
                     rounded-lg py-2 z-[9999]"
        >
          <button
            className="w-full flex items-center text-gray-600 gap-2 px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => alert("Profile")}
          >
            <FiUser size={18} /> Profile
          </button>

          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 transition"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;