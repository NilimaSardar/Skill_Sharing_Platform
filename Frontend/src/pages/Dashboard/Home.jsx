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
              to="/Request"
              className="bg-white rounded-[5px] text-primary text-[12px] font-[600] px-3 py-1 mt-2 inline-block"
            >
              View Matches
            </Link>
          </div>
          <img src="../../images/Group-3.svg" alt="" className='pt-6 h-[145px] w[145px]'/>
        </div>

        {/* Search category */}
      <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">
        
        <button
          onClick={() => setActiveTab("exchange")}
          className={`py-[7px] w-1/2 rounded-lg ${
            activeTab === "exchange"
              ? "bg-primary-light text-text border border-border"
              : "text-text hover:text-primary border border-border"
          }`}
        >
          Exchange
        </button>

        <button
          onClick={() => setActiveTab("share")}
          className={`py-[7px] w-1/2 rounded-lg ${
            activeTab === "share"
              ? "bg-primary-light text-text border border-border"
              : "text-text hover:text-primary border border-border"
          }`}
        >
          Share
        </button>
      </div>

      {/* Show Components */}
      <div className="mt-4">
        {activeTab === "exchange" && <Exchange />}
        {activeTab === "share" && <Share />}
      </div>

      </div>
  </div>
  )
}

export default Home