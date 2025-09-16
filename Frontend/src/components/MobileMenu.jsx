import React from 'react'
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi2";
import { VscDiffAdded } from "react-icons/vsc";
import { BsChatText } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

export default function MobileMenu() {
  const links = [
    { to: "home", label: "Home", icon: <GoHome size={24} /> },
    { to: "request", label: "Request", icon: <HiOutlineUserGroup size={24} /> },
    { to: "create", label: "Create", icon: <VscDiffAdded size={24} /> },
    { to: "chat", label: "Chat", icon: <BsChatText size={24} /> },
    { to: "profile", label: "Profile", icon: <HiOutlineUser size={24} /> },
  ];

  return (
    <ul className="flex justify-between px-[28px] py-[16px] sticky bottom-0 bg-white w-full max-w-md  items-center border-t-1 border-border">
      {links.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-primary" : "text-[#737373]"
              }`
            }
          >
            {link.icon}
            <p className='text-[14px]'>{link.label}</p>

            {/* <span className='text-[14px]'>{link.label}</span> */}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
