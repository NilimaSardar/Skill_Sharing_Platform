import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useLocation } from "react-router-dom";

import ExchangeChat from "../../components/chat/ExchangeChat";
import ShareChat from "../../components/chat/ShareChat";

const Chat = () => {
  const navigate = useNavigate();
  const { API, user } = useAuth();
  const [activeUsers, setActiveUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "exchange";
  const [tab, setTab] = useState(initialTab);

  const [searchQuery, setSearchQuery] = useState("");   // 🔍 SEARCH STATE

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?._id) return setLoading(false);

      try {
        const proposalRes = await fetch(
          `${API}/api/proposals/user/${user._id}?status=accepted`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const proposalData = proposalRes.ok ? await proposalRes.json() : { proposals: [] };

        const proposalUsers = proposalData.proposals?.map(p =>
          p.senderId._id === user._id ? p.receiverId : p.senderId
        ) || [];

        const shareRes = await fetch(`${API}/api/shares/user/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const shareData = shareRes.ok ? await shareRes.json() : [];

        const shareUsers = shareData
          .filter(s => s.status === "accepted")
          .map(s =>
            s.senderId._id === user._id ? s.receiverId : s.senderId
          );

        const combined = [...proposalUsers, ...shareUsers];
        const uniqueUsers = Array.from(new Map(combined.map(u => [u._id, u])).values());

        const sortedUsers = uniqueUsers.sort(
          (a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0)
        );

        setActiveUsers(sortedUsers.slice(0, 10));
        setLoading(false);

      } catch (err) {
        console.log("Failed to fetch users", err);
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, [API, user]);

  const handleClick = (id) => {
    navigate(`/dashboard/chat/${id}`);
  };

  return (
    <div>
      {/* HEADER */}
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
        <div
          onClick={() => navigate(-1)}
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden"
        >
          <img src="../../images/BackArrow.svg" alt="back" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className='font-serif w-full text-center text-xl sm:text-start'>Message</h3>
      </div>

      <div className='mx-[28px] py-1'>

        {/* ACTIVE PROFILES */}
        <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
          {loading && <p className="text-gray-400">Loading users...</p>}
          {!loading && activeUsers.length === 0 &&
            <p className="text-gray-400">No active users yet</p>
          }

          {activeUsers.map(u => (
            <div
              key={u._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleClick(u._id)}
            >
              <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                <img
                  src={u.profilePhoto ? `${API}/uploads/${u.profilePhoto}` : "../../profile/default.jpg"}
                  alt={u.fullName}
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 w-[12px] h-[12px] border-2 border-white rounded-full ${
                    u.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></span>
              </div>
              <p className="text-[14px] text-center font-medium mt-1">{u.fullName.split(" ")[0]}</p>
            </div>
          ))}
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="my-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}   // 👈 SET SEARCH VALUE
              className="w-full pr-10 pl-4 py-2 text-[16px] text-gray-800 font-medium border border-border bg-search-bg rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400"
            />
            <img
              src="../../images/Search_Icon.svg"
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>

        {/* TABS */}
        <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">
          <button
            className={`py-[7px] w-1/2 rounded-lg ${
              tab === "exchange" ? "bg-primary-light border border-border" : "border border-border"
            }`}
            onClick={() => setTab("exchange")}
          >
            Exchange
          </button>

          <button
            className={`py-[7px] w-1/2 rounded-lg ${
              tab === "share" ? "bg-primary-light border border-border" : "border border-border"
            }`}
            onClick={() => setTab("share")}
          >
            Share
          </button>
        </div>

        {/* CHAT LIST */}
        <div className="py-4 pb-20">
          {tab === "exchange" && <ExchangeChat searchQuery={searchQuery} />}
          {tab === "share" && <ShareChat searchQuery={searchQuery} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;