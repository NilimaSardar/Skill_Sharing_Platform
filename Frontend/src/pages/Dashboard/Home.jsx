import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

import Exchange from "../../components/Home/Exchange";
import Share from "../../components/Home/Share";

const Home = () => {
  const { user, API } = useAuth();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("share");
  const [showAllSm, setShowAllSm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hasNotifications, setHasNotifications] = useState(false);

  const navigate = useNavigate();

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/skills", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Check if user has any pending notifications
  useEffect(() => {
    const checkNotifications = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}?status=pending`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        const received = (data.proposals || []).filter(
          p => p.receiverId?._id === user._id
        );
        setHasNotifications(received.length > 0);
      } catch (err) {
        console.error(err);
        setHasNotifications(false);
      }
    };

    checkNotifications();
  }, [API, user]);

  // Determine visible categories
  const getVisibleCategories = () => {
    if (windowWidth < 640) {
      return categories.slice(0, 8); // mobile
    } else {
      return showAllSm ? categories : categories.slice(0, 12); // sm+
    }
  };

  return (
    <div className="bg-white pb-20 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="pt-6 px-7 flex justify-between items-center w-full bg-primary text-white-2 sm:hidden">
        <div className="flex items-center gap-3 mb-5">
          <img
            src={
              user?.profilePhoto
                ? user.profilePhoto.startsWith("http")
                  ? user.profilePhoto
                  : `${API}/uploads/${user.profilePhoto}`
                : `${API}/uploads/Profile.jpeg`
            }
            alt={user?.fullName || "profile"}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="leading-5">
            <p className="text-lg tracking-wide">{user?.fullName || "User Name"}</p>
            <h3 className="font-normal text-xs">Discover your skills today</h3>
          </div>
        </div>
        <div
        onClick={() =>
          navigate("/dashboard/notifications")
        }
        className="relative w-9 h-9 bg-icon-bg-hover flex items-center justify-center rounded-lg mb-5 cursor-pointer">
          <img src="../images/notification.svg" alt="notification bell" className='w-6 h-6'/>
          {hasNotifications && (
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </div>
      </div>

      <div className="px-7 py-4 w-full">
        {/* Search & Filter */}
        <div className="flex justify-between gap-2.5">
          <div className="p-2 h-10 w-full text-lg font-medium border border-border bg-search-bg rounded flex justify-between">
            <input type="text" placeholder="Search" className="bg-transparent outline-none flex-1"/>
            <img src="../images/Search_Icon.svg" alt="Search_Icon" className="w-5 h-5"/>
          </div>
          <div className="bg-primary p-2 w-10 h-10 rounded">
            <img src="../images/Filter_Icon.svg" alt="Filter_Icon" />
          </div>
        </div>

        {/* Matching Partner */}
        <div className="flex justify-between items-center bg-primary w-full h-32 my-5 rounded-lg">
          <div className="leading-6 pl-3">
            <h3 className="text-white text-sm sm:text-lg">
              Find Your Perfect Skill Sharing Partner on ProXchange.
            </h3>
            <p className='hidden text-white text-sm sm:text-lg sm:block'>
              Share your expertise and gain new abilities.
            </p>
            <Link
              to="/dashboard/Request"
              className="bg-white rounded text-primary text-xs sm:text-[14px] font-semibold sm:px-4 sm:py-2 px-3 py-1 mt-2 inline-block"
            >
              View Matches
            </Link>
          </div>
          <img src="../../images/Group-3.svg" alt="" className='pt-6 h-36'/>
        </div>

        {/* Skill Categories */}
        <div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {windowWidth < 640
              ? categories.slice(0, 7).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/dashboard/home/categories", { state: item })}
                    className="w-full h-16 p-2 bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer"
                  >
                    <img src={`http://localhost:8000/${item.image}`} alt={item.name} className="w-6 h-6" />
                    <p className="text-xs text-center font-medium truncate w-full">{item.name}</p>
                  </div>
                ))
              : getVisibleCategories().slice(0, showAllSm ? categories.length : 11).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate("/dashboard/home/categories", { state: item })}
                    className="w-full h-16 p-2 bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer"
                  >
                    <img src={`http://localhost:8000/${item.image}`} alt={item.name} className="w-6 h-6" />
                    <p className="text-xs text-center font-medium truncate w-full">{item.name}</p>
                  </div>
                ))}

            {/* MORE button */}
            {windowWidth < 640 ? (
              <div
                className="w-full h-16 p-2 bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer"
                onClick={() => navigate("/dashboard/home/allcategories")}
              >
                <img src="../SkillCategories/more.svg" alt="More" className="w-6 h-6" />
                <p className="text-xs text-center font-medium">More</p>
              </div>
            ) : (
              !showAllSm && (
                <div
                  className="w-full h-16 p-2 bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer"
                  onClick={() => setShowAllSm(true)}
                >
                  <img src="../SkillCategories/more.svg" alt="More" className="w-6 h-6" />
                  <p className="text-xs text-center font-medium">More</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Popular Users */}
        <div className='sm:hidden'>
          <div className='flex justify-between items-center mt-6 mb-3'>
            <h3 className='font-medium text-text'>Popular Users</h3>
            <Link className='text-primary bg-primary-light py-1 px-2 rounded-lg text-xs'>View More</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap py-2 hide-scrollbar">
            {["Nilima Sardar", "Shikshya Nepal", "Charlie", "Diana", "Eve", "Frank"].map((user, idx) => (
              <div
                key={idx}
                className='flex-shrink-0 flex flex-col gap-1 w-28 h-36 items-center justify-center border border-border rounded-lg'
              >
                <img src="../profile/Nilima.jpeg" alt="" className='w-20 h-20 rounded-lg object-cover'/>
                <p className='text-sm font-medium text-text truncate w-full text-center px-1'>{user}</p>
                <div className='flex items-center justify-center'>
                  <img src="../rating/rating.svg" alt="" className='w-2/3'/> 
                  <span className='text-gray-600 text-xs'>(52)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Post */}
        <div className='sm:hidden'>
          <div className='flex justify-between items-center mt-6'>
            <h3 className='font-medium text-text'>Recent Post</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mx-[28px] pb-4'>
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

        <div className="mt-4">
          {activeTab === "share" && <Share type="share" />}
          {activeTab === "exchange" && <Exchange type="exchange" />}
        </div>
      </div>
    </div>
  );
};

export default Home;
