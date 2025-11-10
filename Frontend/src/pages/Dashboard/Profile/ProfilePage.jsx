import React from 'react'
import { NavLink, Outlet,useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

  return (
    <div className='mx-[28px]'>
    <div className='flex items-center justify-start my-4'>
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
            <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className='font-serif w-full text-center text-xl'>Profile</h3>
        <NavLink className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
            <img src="../../images/Settings.svg" alt="setting" className='w-[25px] h-[25px]'/>
        </NavLink>
    </div>

    {/* profile */}
    <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center">
            <div className="relative w-[85px] h-[85px] flex items-center justify-center cursor-pointer">
                <img
                src="../../profile/Nilima.jpeg"
                alt=""
                className="w-[80px] h-[80px] rounded-full object-cover border-2 border-primary-light shadow"
                />
                {/* Edit button */}
                <img src="../../images/Edit.svg" alt="" className="absolute bottom-1 right-1 border-1 border-white rounded-full"/>
            </div>
            <p className="text-[18px] text-center font-medium mt-2">Nilima Sardar</p>
        </div>

        <div className='flex justify-between my-4'>
          <div className='flex flex-col items-center border-r border-border pr-6'>
            <h4 className='text-[20px] text-text font-black tracking-wide'>54</h4>
            <p className='text-[#737373] text-[14px]'>Connected</p>
          </div>
          <div className='flex flex-col items-center border-r border-border pr-6'>
            <h4 className='text-[20px] text-text font-black tracking-wide'>07</h4>
            <p className='text-[#737373] text-[14px]'>Conducted</p>
          </div>
          <div className='flex flex-col items-center'>
            <h4 className='text-[20px] text-text font-black tracking-wide'>03</h4>
            <p className='text-[#737373] text-[14px]'>Attendend</p>
          </div>
        </div>

        {/* About */}
        <div>
          <h4>About Me</h4>
          <p className="text-[#737373] text-[14px] text-justify">I'm a seasoned creative expert dedicated to sharing the proven blueprint for achieving 
            top-tier Web Development and UI/UX results. My focus is entirely on practical, real-world
            knowledge and actionable skills, not abstract theory. Join me, and let's work side-by-side
            to master the processes needed to create dynamic... <span className='text-primary font-medium'>Read More</span></p>
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
        My Skills
      </NavLink>

      <NavLink
        to="community"
        className={({ isActive }) =>
          `py-[10px] px-[18px] w-1/2 rounded-lg ${
            isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
          }`
        }
      >
        Trade History
      </NavLink>
    </div>

  {/* Content area */}
  <div className="py-4 pb-20">
    <Outlet />
  </div>
</div>
  )
}

export default ProfilePage