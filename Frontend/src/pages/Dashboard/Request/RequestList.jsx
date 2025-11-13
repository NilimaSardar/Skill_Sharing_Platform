import React from 'react'
import { NavLink, Outlet,useNavigate } from "react-router-dom";

const RequestList = () => {
  const navigate = useNavigate();
  
  return (
    <div className='mx-[28px]'>
        <div className='flex items-center justify-between my-4'>
            <h3 className='font-serif w-full text-xl'>Exchange Request</h3>
          <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
              <img src="../../images/options.svg" alt="setting" className='w-[25px] h-[25px]'/>
          </div>
        </div>

        {/* Search catogoy */}
        <div className="flex w-full gap-4 text-center text-[14px] font-medium text-text">
        <NavLink
          to="sendRequest"
          className={({ isActive }) =>
            `py-[6px] px-[8px] w-1/2 rounded-lg ${
              isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
            }`
          }
        >
          Send Request
        </NavLink>

        <NavLink
          to="receivedRequest"
          className={({ isActive }) =>
            `py-[6px] px-[8px] w-1/2 rounded-lg ${
              isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
            }`
          }
        >
          Received Request
        </NavLink>
        </div>

      {/* Content area */}
      <div className="py-4 pb-20">
        <Outlet />
      </div>
    </div>
  )
}

export default RequestList