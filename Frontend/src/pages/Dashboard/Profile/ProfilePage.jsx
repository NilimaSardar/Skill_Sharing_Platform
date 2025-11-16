import React from 'react'
import { NavLink, Outlet,useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

  return (
    <div>
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white'>
          <h3 className='font-serif w-full text-center text-xl ml-7'>Profile</h3>
          <NavLink to="profileSettings" className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer">
              <img src="../../images/Settings.svg" alt="setting" className='w-[25px] h-[25px]'/>
          </NavLink>
      </div>

      <div className='mx-[28px] py-2'>
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
              <h4 className='font-[550]'>About Me</h4>
              <p className="text-[#737373] text-[14px] text-justify">I'm a seasoned creative expert dedicated to sharing the proven blueprint for achieving 
                top-tier Web Development and UI/UX results. My focus is entirely on practical, real-world
                knowledge and actionable skills, not abstract theory. Join me, and let's work side-by-side
                to master the processes needed to create dynamic... <span className='text-primary font-medium'>Read More</span></p>
            </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col gap-2 mt-4'>
          <button type="submit" className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'>
            Add Skills +
          </button>
        </div>

        {/* Search catogoy */}
        <div className="flex w-full mt-4 text-center text-[16px] font-medium text-text border border-border rounded-lg">
          <NavLink
            to="mySkills"
            className={({ isActive }) =>
              `py-[5px] my-[5px] mx-[8px] w-1/2 flex items-center justify-center ${
                isActive ? "bg-primary-light text-primary" : "text-[#737373]"
              }`
            }
          >
            My Skills
          </NavLink>

          <NavLink
            to="trade-history"
            className={({ isActive }) =>
              `my-[5px] mx-[8px] w-1/2 flex items-center justify-center ${
                isActive ? "bg-primary-light text-primary" : "text-[#737373]"
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
    </div>
  )
}

export default ProfilePage