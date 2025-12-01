import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

import ExchangeChat from "../../components/chat/ExchangeChat";
import ShareChat from "../../components/chat/ShareChat";

const Chat = () => {
  const navigate = useNavigate();
  const { API, user } = useAuth();
  const [activeTab, setActiveTab] = useState("exchange");
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?._id) return setLoading(false);

      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}?status=accepted`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.log("Fetch failed", res.status);
          return setLoading(false);
        }

        const data = await res.json();

        // get the other user from each proposal
        const users = data.proposals.map(p =>
          p.senderId._id === user._id ? p.receiverId : p.senderId
        );

        // Remove duplicates by _id
        const uniqueUsers = Array.from(new Map(users.map(u => [u._id, u])).values());

        // Sort users: active first
        const sortedUsers = uniqueUsers.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0));

        setAcceptedUsers(sortedUsers);
        setLoading(false);

      } catch (err) {
        console.log("Failed to fetch accepted proposals", err);
        setLoading(false);
      }
    };

    fetchAcceptedUsers();
  }, [API, user]);

  const handleClick = (id) => {
    navigate(`/dashboard/chat/${id}`);
  };

  return (
    <div className=''>
      {/* Header */}
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
          <img src="../../images/BackArrow.svg" alt="back" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className='font-serif w-full text-center text-xl sm:text-start'>Message</h3>
      </div>

      <div className='mx-[28px] py-1'>
        
        {/* Active Profiles */}
        <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
          {loading && <p className="text-gray-400">Loading users...</p>}
          {!loading && acceptedUsers.length === 0 && <p className="text-gray-400">No chat users yet</p>}

          {acceptedUsers.map(u => (
            <div key={u._id} className="flex flex-col items-center cursor-pointer" onClick={() => handleClick(u._id)}>
              <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                <img
                  src={u.profilePhoto ? `${API}/uploads/${u.profilePhoto}` : "../../profile/default.jpg"}
                  alt={u.fullName}
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
                <span className={`absolute bottom-1 right-1 w-[12px] h-[12px] border-2 border-white rounded-full ${u.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              </div>
              <p className="text-[14px] text-center font-medium mt-1">{u.fullName.split(" ")[0]}</p>
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
            className={`py-[7px] w-1/2 rounded-lg ${activeTab === "exchange" ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"}`}
            onClick={() => setActiveTab("exchange")}
          >
            Exchange
          </button>
          <button
            className={`py-[7px] w-1/2 rounded-lg ${activeTab === "share" ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"}`}
            onClick={() => setActiveTab("share")}
          >
            Share
          </button>
        </div>

        {/* Chat Box */}
        <div className="py-4 pb-20">
          {activeTab === "exchange" && <ExchangeChat acceptedUsers={acceptedUsers} />}
          {activeTab === "share" && <ShareChat />}
        </div>
      </div>
    </div>
  );
};

export default Chat;