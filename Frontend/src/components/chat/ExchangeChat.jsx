import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ExchangeChat = () => {
  const { API } = useAuth();
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const userId = JSON.parse(atob(token.split(".")[1])).userId;

        const res = await fetch(`${API}/api/proposals/user/${userId}?status=accepted`, {
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
        const users = data.proposals.map((p) =>
          p.senderId._id === userId ? p.receiverId : p.senderId
        );

        // Remove duplicates by _id
        const uniqueUsers = Array.from(new Map(users.map(u => [u._id, u])).values());

        // Sort users: active first
        const sortedUsers = uniqueUsers.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0));

        setChatUsers(sortedUsers);
        setLoading(false);

      } catch (err) {
        console.log("Failed to fetch accepted proposals", err);
        setLoading(false);
      }
    };

    fetchAcceptedUsers();
  }, [API]);

  const handleClick = (otherUserId) => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).userId;
  
    navigate(`/dashboard/chat-room/${userId}/${otherUserId}`);
  };  

  if (loading) return <p className="text-gray-400">Loading chat users...</p>;
  if (chatUsers.length === 0)
    return <p className="text-gray-400">No accepted chat users yet</p>;

  return (
    <>
      {chatUsers.map((u) => (
        <div
          key={u._id}
          onClick={() => handleClick(u._id)}
          className="flex justify-between items-start mb-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-[55px] h-[55px] flex items-center justify-center">
              <img
                src={
                  u.profilePhoto
                    ? `${API}/uploads/${u.profilePhoto}`
                    : "../../profile/default.jpg"
                }
                alt={u.fullName}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              {/* Active indicator */}
              <span
                className={`absolute bottom-1 right-1 w-[12px] h-[12px] border-2 border-white rounded-full ${
                  u.isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div>
              <h3 className="font-serif text-md">{u.fullName}</h3>
              <p className="font-serif text-sm text-[#7B7676]">
                message about me
              </p>
            </div>
          </div>
          <p className="font-serif text-sm text-[#7B7676]">Just Now</p>
        </div>
      ))}
    </>
  );
};

export default ExchangeChat;