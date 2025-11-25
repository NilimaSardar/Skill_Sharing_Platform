import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

import ExchangeChat from "../../components/chat/ExchangeChat";
import ShareChat from "../../components/chat/ShareChat";

const Chat = () => {
  const navigate = useNavigate();
  const { API } = useAuth();

  const [activeTab, setActiveTab] = useState("exchange");
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const res = await fetch(`${API}/api/auth/active-users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) return console.log("Fetch failed", res.status);
  
        const data = await res.json();
  
        // no need to filter by current user anymore
        setActiveUsers(data.users || []);
  
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchActiveUsers();
  }, []);   

  return (
    <div className=''>
  
      {/* Header */}
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white'>
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
          <img src="../../images/BackArrow.svg" alt="back" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className='font-serif w-full text-center text-xl'>Message</h3>
      </div>

      <div className='mx-[28px] py-1'>
        
        {/* Active Profiles */}
        <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">

          {activeUsers.length === 0 && (
            <p className="text-gray-400">No active users</p>
          )}

          {activeUsers.map((u) => (
            <div key={u._id} className="flex flex-col items-center">
              
              <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                <img
                  src={
                    u.profilePhoto
                      ? `${API}/uploads/${u.profilePhoto}`
                      : "../../profile/default.jpg"
                  }
                  alt={u.fullName}
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
                <span className="absolute bottom-1 right-1 w-[12px] h-[12px] bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <p className="text-[14px] text-center font-medium mt-1">
                {u.fullName.split(" ")[0]}
              </p>
            
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="my-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full pr-10 pl-4 py-2 text-[16px] text-gray-800 font-medium border border-border bg-search-bg rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
            />
            <img
              src="../../images/Search_Icon.svg"
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">

          <button
            className={`py-[7px] w-1/2 rounded-lg ${
              activeTab === "exchange"
                ? "bg-primary-light text-text border border-border"
                : "text-text hover:text-primary border border-border"
            }`}
            onClick={() => setActiveTab("exchange")}
          >
            Exchange
          </button>

          <button
            className={`py-[7px] w-1/2 rounded-lg ${
              activeTab === "share"
                ? "bg-primary-light text-text border border-border"
                : "text-text hover:text-primary border border-border"
            }`}
            onClick={() => setActiveTab("share")}
          >
            Share
          </button>

        </div>

        {/* Chat Box */}
        <div className="py-4 pb-20">
          {activeTab === "exchange" && <ExchangeChat />}
          {activeTab === "share" && <ShareChat />}
        </div>

      </div>
    </div>
  );
};

export default Chat;