import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import MySkills from "../../components/profile/MySkills";
import ManagePost from "../../components/Profile/ManagePost";
import { useAuth } from '../../store/auth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, API } = useAuth(); 

  const [activeTab, setActiveTab] = useState("skills"); 

  return (
    <div>
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
        <h3 className='font-serif w-full text-center sm:text-start text-xl sm:ml-7'>Profile</h3>

        <NavLink to="profileSettings" className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer sm:p-2 sm:bg-primary sm:hover:bg-primary sm:rounded-lg sm:hidden transition"> 
          <img src="../../images/Settings.svg" alt="setting" className='w-[25px] h-[25px]'/> 
        </NavLink>
      </div>

      <div className='mx-[28px] py-2'>
        
        {/* Profile */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-[85px] h-[85px] flex items-center justify-center cursor-pointer">
              <img
                src={
                  user?.profilePhoto
                  ? user.profilePhoto.startsWith("http")
                      ? user.profilePhoto
                      : `${API}/uploads/${user.profilePhoto}`
                  : `${API}/uploads/Profile.jpeg`
                }
                alt={user?.fullName || "profile"}
                className="w-[85px] h-[85px] rounded-full object-cover"
              />
              <img src="../../images/Edit.svg" onClick={() => navigate("/dashboard/profile/editProfile")} alt="" className="absolute bottom-1 right-1 border-1 border-white rounded-full" />
            </div>

              <p className="text-[18px] text-center font-medium mt-2">{user?.fullName || "User Name"}</p>
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
            <p className="text-[#737373] text-[14px] text-justify">
              I'm a seasoned creative expert dedicated to sharing the proven blueprint for achieving 
              top-tier Web Development and UI/UX results...
              <span className='text-primary font-medium'>Read More</span>
            </p>
          </div>
        </div>

        <div className="flex w-full mt-4 text-center text-[16px] font-medium text-text border border-border rounded-lg">

          <button
            className={`py-[5px] my-[5px] mx-[8px] w-1/2 rounded-lg ${
              activeTab === "skills" 
                ? "bg-primary-light text-primary" 
                : "text-[#737373]"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            My Skills
          </button>

          <button
            className={`py-[5px] my-[5px] mx-[8px] w-1/2 rounded-lg ${
              activeTab === "history" 
                ? "bg-primary-light text-primary" 
                : "text-[#737373]"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Manage Post
          </button>

        </div>

        {/* Content Area */}
        <div className="py-4 pb-20">
          {activeTab === "skills" && <MySkills />}
          {activeTab === "history" && <ManagePost/>}
        </div>

      </div>
    </div>
  );
};

export default Profile;