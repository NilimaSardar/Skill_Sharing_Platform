import React from 'react'
import { Link,NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

import Exchange from "../../components/Home/Exchange";
import Share from "../../components/Home/Share";


const Home = () => {
  const { user } = useAuth(); // get logged-in user
  const [activeTab, setActiveTab] = React.useState("exchange"); // default tab
  console.log('user in home:', user);
  

  // Dynamically get full name, fallback to "User" if not available
  const fullName = user?.profile?.first_name
    ? `${user.profile.first_name} ${user.profile.last_name || ""}`.trim()
    : "User";
  return (
    <div className="bg-white  pb-20">
      <div className="pt-[24px] px-[28px] flex justify-between items-center w-full max-w-md  bg-primary text-white-2">
        <div className="flex items-center gap-3 mb-5">
          <img src="../profile/Nilima.jpeg" alt="profile image" className="h-[50px] w-[50px] rounded-full"/>
          <div className="leading-5">
            <p className="text-[18px] tracking-wide">{user.fullName}</p>
            <h3 className="font-normal text-[12px]">Discover your skills today</h3>
          </div>
        </div>
        <div className="w-[35px] h-[35px] bg-icon-bg-hover flex items-center justify-center rounded-lg mb-5 cursor-pointer">
          <img src="../images/notification.svg" alt="notification bell" className='w-[24px] h-[24px]'/>
        </div>
      </div>

      <div className='mx-[28px] py-4'>
        {/* Search and filter */}
        <div className="flex justify-between gap-2.5">
          <div className="p-2 h-10 w-70 text-[18px] font-medium border border-border bg-search-bg rounded-[5px] flex justify-between">
            <input type="text" placeholder="Search"/>
            <img src="../images/Search_Icon.svg" alt="Search_Icon" className="w-5 h-5"/>
          </div>
          
          <div className="bg-primary p-2 w-10 h-10 rounded-[5px]">
            <img src="../images/Filter_Icon.svg" alt="Filter_Icon" />
          </div>
        </div>

        {/* Matching Partner */}
        <div className="flex justify-between items-center bg-primary w-full h-[125px] my-5 rounded-lg">
          <div className="leading-6 pl-3">
            <h3 className="text-white text-[15px]">Find Your Perfect Skill Sharing Partner</h3>
            <Link
              to="/dashboard/Request"
              className="bg-white rounded-[5px] text-primary text-[12px] font-[600] px-3 py-1 mt-2 inline-block"
            >
              View Matches
            </Link>
          </div>
          <img src="../../images/Group-3.svg" alt="" className='pt-6 h-[145px] w[145px]'/>
        </div>

        {/* Skill Categories */}

          <div className="grid grid-cols-4 gap-4">
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/arts.svg" alt="Arts" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-center font-medium">Arts</p>
            </div>

            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/music.svg" alt="Music" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-center font-medium">Music</p>
            </div>

            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/fitness.svg" alt="fitness" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-center font-medium tracking-wide">Fitness</p>
            </div>
            
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/technology.svg" alt="Technology & IT" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-center font-medium">Tech</p>
            </div>
          
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/crafty.svg" alt="crafty" className="w-[20px] h-[20px]" />
              <p className="text-[14px] text-center font-medium">Crafty</p>
            </div>
            
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/link.svg" alt="link" className="w-[20px] h-[20px]" />
              <p className="text-[14px] text-center font-medium">Link</p>
            </div>

            
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/bakery.svg" alt="bakery" className="w-[20px] h-[20px]" />
              <p className="text-[14px] text-center font-medium">Bakery</p>
            </div>

            
            <div className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer">
              <img src="../SkillCategories/more.svg" alt="more" className="w-[24px] h-[24px]" />
              <p className="text-[14px] text-center font-medium">More</p>
            </div>

          </div>

      </div>
  </div>
  )
}

export default Home