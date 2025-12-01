import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";

const ProposeExchange = () => {
  const navigate = useNavigate();
  const { API, user } = useAuth();
  const { state } = useLocation();

  if (!state) return <p>No data found</p>;

  const post = state;
  const postUser = post.userId || {};

  const offeredSkills = post.skillsOffered?.map((s) => s.subcategory).join(", ");
  const expertLevels = post.skillsOffered?.map((s) => s.expertLevel).join(", ");
  const wantedSkills = post.skillsInterested?.map((s) => s.subcategory).join(", ");

  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `just now`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return alert("Proposal message is required");

    const payload = {
      postId: post._id,
      senderId: user._id,
      receiverId: postUser._id,
      message,
      estimateDuration: duration,
      startDate,
      endDate,
    };

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard/request");
        alert("Proposal sent successfully!");
        setMessage("");
        setDuration("");
        setStartDate("");
        setEndDate("");
      } else {
        alert(data.message || "Failed to send proposal");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white pb-20 min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between px-[20px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200">
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
          <img src="../../images/BackArrow.svg" alt="back" className="w-[25px] h-[25px]" />
        </div>
        <h3 className="w-full text-center text-xl mr-5 sm:text-start">Propose Exchange</h3>
      </div>

      {/* User Summary Card */}
      <div className="mx-[28px] py-4">
        <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center gap-2">
            <img
              src={postUser.profilePhoto ? `${API}/uploads/${postUser.profilePhoto}` : `${API}/uploads/Profile.jpeg`}
              alt={postUser.fullName || "Anonymous"}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <h3 className="text-[16px] font-serif">{postUser.fullName || "Anonymous"}</h3>
              <p className="text-[13px] text-[#7B7676] font-serif">{postUser.age || "N/A"}, {postUser.location || "Unknown"}</p>
            </div>
          </div>
          <p className="text-[12px] text-[#7B7676] mt-1">{timeAgo(post.createdAt)}</p>
          <h2 className="text-text text-[15px] font-semibold mt-2">{post.title}</h2>
          <div className="flex items-center justify-between bg-primary-light px-3 py-2 my-2 rounded-lg">
            <div>
              <p className="text-[#737373] text-[14px]">Offers</p>
              <p className="text-primary text-[14px] font-medium">{offeredSkills || "N/A"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="bg-red-200 text-[10px] text-red-500 px-2 py-[2px] rounded-xs">{expertLevels || "N/A"}</p>
              <img src="../../images/exchange.svg" alt="exchange" />
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#737373] text-[14px]">Wants</p>
              <p className="text-primary text-[14px] font-medium">{wantedSkills || "N/A"}</p>
            </div>
          </div>
          <p className="text-[#737373] text-[14px] font-[500] text-justify leading-5 tracking-normal">{post.description}</p>
        </div>
      </div>

      {/* Proposal Form */}
      <form onSubmit={handleSubmit} className="mx-[28px] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Proposal Message</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message here..."
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none h-[120px]"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Estimate Duration</p>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Eg: 2 hours"
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred Start Date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred End Date</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white text-[15px] font-medium py-3 rounded-lg w-full shadow-md active:scale-[0.98] transition"
        >
          {loading ? "Sending..." : "Send Proposal"}
        </button>
      </form>
    </div>
  );
};

export default ProposeExchange;