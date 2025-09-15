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
      <div className="py-[24px] flex justify-between items-center w-full max-w-md">
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
