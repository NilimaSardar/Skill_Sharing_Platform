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
      <div className="flex justify-between items-center bg-primary w-full h-[110px] rounded-[20px]">
        <div className="leading-9 pl-3">
          <h3 className="text-white text-[16px]">Find Your Perfect Skill Sharing Partner</h3>
          <Link
            to="/Request"
            className="bg-white rounded-[5px] text-primary text-[14px] font-medium px-2 py-2"
          >
            View Matches
          </Link>
        </div>
        <img src="" alt="" />
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
