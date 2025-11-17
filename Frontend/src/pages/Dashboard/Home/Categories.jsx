import React from 'react'
import { useAuth } from "../../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";

import Exchange from "../../../components/Home/Exchange";
import Share from "../../../components/Home/Share";

const Categories = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState("exchange");

  const location = useLocation();
  const navigate = useNavigate();

  // Skill received from Home
  const skill = location.state;
  const skillName = skill?.name || "Category";
  
  return (
    <div className="bg-white  pb-20">
        <div className='flex items-center justify-between px-[20px] py-5 bg-primary text-white'>
            <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
              <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
            </div>
            <h3 className='font-serif w-full text-center text-xl mr-5'>
                {skillName}
            </h3>
        </div>

      <div className='mx-[28px] py-4'>
        {/* Search and filter */}
          <div className="mb-4 p-2 h-10 w-full text-[18px] font-medium border border-border bg-search-bg rounded-[5px] flex justify-between">
            <input type="text" placeholder="Search"/>
            <img src="../../images/Search_Icon.svg" alt="Search_Icon" className="w-5 h-5"/>
          </div>

        {/* Search category */}
      <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">
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
      </div>

      {/* Show Components */}
      <div className="mt-4">
        {activeTab === "share" && <Share />}
        {activeTab === "exchange" && <Exchange />}
      </div>

      </div>
  </div>
  )
}

export default Categories