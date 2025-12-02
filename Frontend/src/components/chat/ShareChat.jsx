import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ShareChat = () => {
  const { API } = useAuth();
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedShares = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const userId = JSON.parse(atob(token.split(".")[1])).userId;

        // Fetch shares where current user is sender or receiver
        const res = await fetch(`${API}/api/shares/user/${userId}`, {
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

        // Filter shares with status 'accepted'
        const acceptedShares = data.filter((s) => s.status === "accepted");

        // Get other user in each share
        const users = acceptedShares.map((s) =>
          s.senderId._id === userId ? s.receiverId : s.senderId
        );

        // Remove duplicates
        const uniqueUsers = Array.from(new Map(users.map(u => [u._id, u])).values());

        // Sort: active users first
        const sortedUsers = uniqueUsers.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0));

        setChatUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch shares", err);
        setLoading(false);
      }
    };

    fetchAcceptedShares();
  }, [API]);

  const handleClick = (otherUserId) => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).userId;
    navigate(`/dashboard/chat-room/${userId}/${otherUserId}`);
  };

  if (loading) return <p className="text-gray-400">Loading share users...</p>;
  if (chatUsers.length === 0)
    return <p className="text-gray-400">No accepted shares yet</p>;

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

export default ShareChat;