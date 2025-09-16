import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  console.log("user from dashboard:", user.email ?? "no user yet");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading user...
      </div>
    );
  }

  return (
    <div className="bg-white mx-[28px]">
      <div className="pt-[24px] flex justify-between items-center w-full max-w-md">
        <div className="flex items-center gap-3 mb-5">
          <img src="profile/Nilima.jpeg" alt="profile image" className="h-[60px] w-[60px] rounded-full"/>
          <div className="leading-7">
            <p className="text-[18px] tracking-wide">Hello,</p>
            <h3 className="text-primary font-semibold text-[20px]">Nilima Sardar</h3>
          </div>
        </div>
        <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full mb-5 cursor-pointer">
          <img src="images/notification.svg" alt="notification bell" />
        </div>
      </div>
      {/* Search and filter */}
      <div className="flex justify-between gap-2.5">
        <div className="p-2 h-10 w-70 text-[18px] font-medium border border-border bg-search-bg rounded-[5px] flex justify-between">
          <input type="text" placeholder="Search"/>
          <img src="images/Search_Icon.svg" alt="Search_Icon" className="w-5 h-5"/>
        </div>
        
        <div className="bg-primary p-2 w-10 h-10 rounded-[5px]">
          <img src="images/Filter_Icon.svg" alt="Filter_Icon" />
        </div>
      </div>

      {/* Matching Partner */}
      <div className="flex justify-between items-center bg-primary w-full h-[115px] my-5 rounded-[20px]">
        <div className="leading-9 pl-3">
          <h3 className="text-white text-[16px]">Find Your Perfect Skill Sharing Partner</h3>
          <Link
            to="/Request"
            className="bg-white rounded-[5px] text-primary text-[14px] font-medium px-2 py-2"
          >
            View Matches
          </Link>
        </div>
        {/* <img src="" alt="" /> */}
      </div>

      {/* Skill Categories */}
      <div>
        <h2 className="font-bold text-text">Skills Categories</h2>

        <div className="grid grid-cols-4 gap-4 py-5">
          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/fitness.svg" alt="fitness" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Fitness</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/technology.svg" alt="Technology & IT" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Technol...</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/arts.svg" alt="Arts" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Arts</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/marketing.svg" alt="Marketing" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Marketing</p>
          </li>
          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/music.svg" alt="Music" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Music</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/communication.svg" alt="Communication" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Communi...</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/cooking.svg" alt="Cooking" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">Cooking</p>
          </li>

          <li className="flex flex-col items-center">
            <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
              <img src="SkillCategories/more.svg" alt="more" className="w-[32px] h-[32px]" />
            </div>
            <p className="text-[14px] text-center font-medium">More...</p>
          </li>

        </div>


      </div>

      {/* Upcoming Schedule */}
      <div>
        <h2 className="font-bold text-text">Upcoming Schedule</h2>
        <div className="my-5 p-2.5 border-2 border-primary flex flex-col justify-between items-cente w-full h-[120px] rounded-[5px]">
          <h3 className="font-[500]">Your Upcoming Schedule is at 5 PM</h3>
          <p className="text-[#737373] font-normal text-[14px]">Today, 5:00 PM - 6:00 PM</p>
            <div className='flex gap-5 w-full sm:w-[400px] pt-2'>
                <Link to='/login' className='w-full bg-primary text-[16px] text-white flex justify-center items-center rounded-[5px] font-medium text-lg'>
                    Remind Me
                </Link>
                <Link to='/register' className='w-full bg-transparent text-[16px] py-1.5 flex justify-center items-center  border border-primary text-primary rounded-[5px] font-[500] text-lg'>
                    Cancel
                </Link>

            </div>
        </div>
      </div>
      <Link
        to="/logout"
        className="bg-blue-600 rounded-4xl text-white text-2xl px-5 py-2"
      >
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
