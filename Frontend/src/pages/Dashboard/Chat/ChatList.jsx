import React from 'react'
import { NavLink, Outlet } from "react-router-dom";

const ChatList = () => {
  return (
    <div className='mx-[28px]'>
        <div className='flex items-center justify-start my-4'>
            <div className="w-[35px] h-[35px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
            </div>
            <h3 className='font-serif w-full text-center text-xl'>Message</h3>
        </div>

        {/* active profiles */}
        <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
        {["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"].map((user, idx) => (
            <div key={idx} className="flex flex-col items-center">
            <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                <img
                src="../../profile/Nilima.jpeg"
                alt={user}
                className="w-[45px] h-[45px] rounded-full object-cover border-2 border-white shadow"
                />
                {/* Active green dot */}
                <span className="absolute bottom-1 right-1 w-[12px] h-[12px] bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <p className="text-[14px] text-center font-medium mt-1">{user}</p>
            </div>
        ))}
        </div>

        {/* Search bar */}
        <div className="my-3">
            <div className="relative w-full">
                <input
                type="text"
                placeholder="Search"
                className="w-full pr-10 pl-4 py-2 text-[16px] text-gray-800  font-medium border border-border bg-search-bg rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
                />
                <img
                src="../../images/Search_Icon.svg"
                alt="Search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                />
            </div>
        </div>

        {/* Search catogoy */}
        <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">
        <NavLink
          to="individual"
          className={({ isActive }) =>
            `py-[10px] px-[18px] w-1/2 rounded-lg ${
              isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
            }`
          }
        >
          Individual
        </NavLink>

        <NavLink
          to="community"
          className={({ isActive }) =>
            `py-[10px] px-[18px] w-1/2 rounded-lg ${
              isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
            }`
          }
        >
          Community
        </NavLink>
        </div>

      {/* Content area */}
      <div className="py-4 pb-20">
        <Outlet />
      </div>
    </div>
  )
}

export default ChatList