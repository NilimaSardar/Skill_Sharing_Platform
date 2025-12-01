import React, { useState } from "react";

const RightSidebar = () => {
  // Dummy demo data
  const demoUsers = [
    { id: 1, fullName: "Nilima Sardar", age: 25, location: "New York", expertInfo: "JavaScript", interestedInfo: "React", rating: 5, profilePhoto: "https://i.pravatar.cc/100?img=1" },
    { id: 2, fullName: "Bob", age: 30, location: "London", expertInfo: "Python", interestedInfo: "Django", rating: 2.5, profilePhoto: "https://i.pravatar.cc/100?img=2" },
    { id: 3, fullName: "Charlie", age: 28, location: "Berlin", expertInfo: "React", interestedInfo: "Node.js", rating: 4.7, profilePhoto: "https://i.pravatar.cc/100?img=3" },
    { id: 4, fullName: "David", age: 32, location: "Tokyo", expertInfo: "Java", interestedInfo: "Spring", rating: 4.2, profilePhoto: "https://i.pravatar.cc/100?img=4" },
    { id: 5, fullName: "Eva", age: 27, location: "Paris", expertInfo: "CSS", interestedInfo: "Tailwind", rating: 4.8, profilePhoto: "https://i.pravatar.cc/100?img=5" },
    { id: 6, fullName: "Frank", age: 29, location: "Toronto", expertInfo: "Node.js", interestedInfo: "React", rating: 4.4, profilePhoto: "https://i.pravatar.cc/100?img=6" },
    { id: 7, fullName: "Grace", age: 26, location: "Sydney", expertInfo: "Vue.js", interestedInfo: "Nuxt", rating: 4.3, profilePhoto: "https://i.pravatar.cc/100?img=7" },
  ];

  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <aside className="w-80 bg-white shadow-sm h-screen flex flex-col items-center py-6 px-4">
      <div className="flex w-full justify-between border border-border items-center p-1 rounded-xs mb-3">
        <h2 className="font-[550] text-[15px]">Highly Rated Users</h2>
        {visibleCount < demoUsers.length && (
          <button
            onClick={handleViewMore}
            className="bg-primary flex items-center text-white text-xs py-1 px-2 h-6 rounded-xs hover:bg-blue-700"
          >
            View More
          </button>
        )}
      </div>

      <div className="w-full space-y-4 flex-1 overflow-y-auto">
        {demoUsers.slice(0, visibleCount).map((user) => (
          <div
            key={user.id}
            className="flex gap-3 items-center w-full h-28 px-2 rounded-lg border border-border"
          >
            {/* User Image */}
            <div className="h-24 w-20 rounded-lg overflow-hidden">
              <img
                src={user.profilePhoto}
                alt={user.fullName || "User"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* User Info */}
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