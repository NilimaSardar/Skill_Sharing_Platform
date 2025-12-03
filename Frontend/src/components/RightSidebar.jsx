import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const { API } = useAuth();
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/api/auth/user/highly-rated`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUsers(data.users || []);
      } catch (err) {
        console.error("Fetch highly rated users error:", err);
      }
    };

    fetchUsers();
  }, [API, token]);

  const handleViewMore = () => setVisibleCount((prev) => prev + 5);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleUserClick = (userId) => {
    navigate(`/dashboard/profile/${userId}`);
  };

  return (
    <aside className="w-80 bg-white shadow-sm h-screen flex flex-col items-center py-6 px-4">
      <div className="flex w-full justify-between border border-border items-center p-1 rounded-xs mb-3">
        <h2 className="font-[550] text-[15px]">Highly Rated Users</h2>
        {visibleCount < users.length && (
          <button
            onClick={handleViewMore}
            className="bg-primary flex items-center text-white text-xs py-1 px-2 h-6 rounded-xs hover:bg-blue-700"
          >
            View More
          </button>
        )}
      </div>

      <div className="w-full space-y-4 flex-1 overflow-y-auto">
        {users.slice(0, visibleCount).map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user._id)}
            className="flex gap-3 items-center w-full h-28 px-2 rounded-lg border border-border cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="h-24 w-20 rounded-lg overflow-hidden">
              <img
                src={user.profilePhoto.startsWith("http") ? user.profilePhoto : `${API}/uploads/${user.profilePhoto}`}
                alt={user.fullName || "User"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-between h-24 w-2/3">
              <div className="flex gap-2 items-end">
                <h3 className="text-[14px] text-text font-[570]">{user.fullName}</h3>
                <p className="text-[#737373] text-[12px]">{user.age}, {user.location}</p>
              </div>
              <p className="text-[#737373] text-[13px]">
                Expert: <span className="text-primary">{user.expertInfo}</span>
              </p>
              <p className="text-[#737373] text-[13px]">
                Interested: <span className="text-text">{user.interestedInfo}</span>
              </p>
              <div>{renderStars(user.rating)}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;