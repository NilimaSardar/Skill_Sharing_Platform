import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";

const ViewShareDetails = () => {
  const { API} = useAuth();
  const { state } = useLocation();
  // console.log("state",state)
  const navigate = useNavigate();

  if (!state) return <p>No state found</p>;
  const user = state.userId || {};
  const skills = state.skillsOffered?.map(s => `${s.subcategory} (${s.expertLevel})`).join(", ");
  const lessons = state.addLessons?.length ? state.addLessons : [];

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `just now`;
  };

  return (
    <div className="bg-white pb-20 min-h-screen">

      {/* Top Header */}
      <div className="flex items-center justify-between px-[20px] py-5 bg-primary text-white">
        <div
          onClick={() => navigate(-1)}
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
        >
          <img
            src="../../images/BackArrow.svg"
            alt="back"
            className="w-[25px] h-[25px]"
          />
        </div>
        <h3 className="w-full text-center text-xl mr-5 font-serif">
          Details
        </h3>
      </div>

      {/* User Summary Card */}
      <div className="mx-[28px] py-4">
        <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5 shadow-sm">

          {/* Profile Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center">
              <img
                  src={user.profilePhoto ? `${API}/uploads/${user.profilePhoto}` : `${API}/uploads/Profile.jpeg`}
                  alt={user.fullName || "Anonymous"}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-[16px] font-serif">{user.fullName || "Anonymous"}</h3>
                <p className="text-[13px] text-[#7B7676] font-serif">
                  {user.age || "N/A"}, {user.location || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              {/* <div className="flex items-center">
                <img src="../../rating/Star.svg" alt="" />
                <p className="text-text font-[550] text-[14px]">{state.rating}</p>
              </div> */}
              <div className="flex items-center gap-2">
                <img src="../../images/Calender.svg" alt="" />
                <p className="text-[13px] text-[#7B7676]">{timeAgo(state.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-text text-[15px] font-[580] mt-1">
            {state.title}
          </h2>

          {/* Description */}
          <p className="text-[#737373] text-[14px] font-[500] text-justify leading-5 tracking-normal">
            {state.description}
          </p>

          {/* Duration & Users*/}
          <div className="flex items-center justify-between bg-primary-light px-3 py-2 my-1 rounded-lg">
            <div className='flex items-center gap-1'>
              <img src="../../images/Time_blue.svg" alt="" className='w-4 h-4'/>
              <p className='font-serif text-[13px] text-[#7B7676]'>
                {state.duration || "N/A"}
              </p>
            </div>
            <div className='flex items-center gap-1'>
              {/* <img src="../../images/users.svg" alt="" className='w-4 h-4'/>
              <p className='font-serif text-[13px] text-[#7B7676]'>
                30+ Users
              </p> */}
            </div>
          </div>

           {/* Lessons */}
           {lessons.length > 0 && (
          <div className="mt-3">
            <h3 className="font-semibold">Lessons:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {lessons.map((lesson, idx) => (
                <li key={idx}>{lesson}</li>
              ))}
            </ul>
          </div>
        )}



        </div>

        {/* Fees */}
        <div className="flex items-center justify-between mt-3 px-2">
          <p className="text-primary text-[14px]">Session Fees:</p>
          <p className="text-text text-[14px]">Rs.{state.fees || 0}</p>
        </div>

        {/* Proceed To Payment Button */}
        <button
          onClick={() =>
            navigate("/dashboard/payment", {
              state: {
                amount: state.fees,
                senderId: user._id,        // current user
                receiverId: state.userId._id  // person offering the skill
              },
            })
          }
          className="bg-primary text-white text-[14px] font-medium px-2 py-2 mt-3 rounded-lg w-full"
        >
          Proceed To Payment
        </button>
      </div>

    </div>
  );
};

export default ViewShareDetails;
