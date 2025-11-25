import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";

const ViewProposal = () => {
  const navigate = useNavigate();
  const { API } = useAuth();
  const { state } = useLocation();

  if (!state) return <p>No proposal data found</p>;

  const { proposal, post } = state;
  const [fullPost, setFullPost] = useState(post);

  const sender = proposal.senderId || {};
  const postId = typeof post === "string" ? post : post._id;

  // Fetch full post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const res = await fetch(`${API}/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch full post");

        const data = await res.json();
        setFullPost(data.post);
      } catch (err) {
        console.error("Failed to fetch full post", err);
      }
    };

    fetchPost();
  }, [postId, API]);

  const postOwner = fullPost?.userId || {}; // Post owner info

  const offeredSkills = fullPost?.skillsOffered?.map(s => s.subcategory).join(", ") || "N/A";
  const wantedSkills = fullPost?.skillsInterested?.map(s => s.subcategory).join(", ") || "N/A";
  const expertLevels = fullPost?.skillsOffered?.map(s => s.expertLevel).join(", ") || "N/A";

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past;

    const min = Math.floor(diff / 60000);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (day > 0) return `${day} day${day > 1 ? "s" : ""} ago`;
    if (hour > 0) return `${hour} hour${hour > 1 ? "s" : ""} ago`;
    if (min > 0) return `${min} minute${min > 1 ? "s" : ""} ago`;
    return "just now";
  };

  const handleStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        return;
      }

      const res = await fetch(`${API}/api/proposals/${proposal._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update proposal");
        return;
      }

      alert(`Proposal ${status}!`);

      if (status === "rejected") {
        navigate("/dashboard/request");
      } else if (status === "accepted") {
        navigate(`/dashboard/chat-room/${proposal.senderId._id}/${proposal.receiverId._id}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white pb-20 min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between px-[20px] py-5 bg-primary text-white">
        <div
          onClick={() => navigate(-1)}
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
        >
          <img src="../../images/BackArrow.svg" alt="back" className="w-[25px] h-[25px]" />
        </div>
        <h3 className="w-full text-center text-xl mr-5 font-serif">View Proposal</h3>
      </div>

            {/* Sender Info */}
            <div className="mx-[28px] py-2">
        <div className="flex items-center gap-2">
          <img
            src={
              sender.profilePhoto
                ? `${API}/uploads/${sender.profilePhoto}`
                : `${API}/uploads/Profile.jpeg`
            }
            alt={sender.fullName}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div>
            <h3 className="text-[15px] font-serif">{sender.fullName}</h3>
            <p className="text-[12px] text-[#7B7676] font-serif">
              {sender.age ? `${sender.age}` : "Age N/A"}
              {sender.location ? `, ${sender.location}` : ", Unknown"}
            </p>
          </div>
          <p className="text-[12px] text-[#7B7676] ml-auto">{timeAgo(proposal.createdAt)}</p>
        </div>
      </div>

      {/* Post Owner Card */}
      <div className="mx-[28px] py-4">
        <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center gap-2">
            <img
              src={
                postOwner.profilePhoto
                  ? `${API}/uploads/${postOwner.profilePhoto}`
                  : `${API}/uploads/Profile.jpeg`
              }
              alt={postOwner.fullName}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <h3 className="text-[16px] font-serif">{postOwner.fullName}</h3>
              <p className="text-[13px] text-[#7B7676] font-serif">
                {postOwner.age ? `${postOwner.age}` : "Age N/A"}
                {postOwner.location ? `, ${postOwner.location}` : ", Unknown"}
              </p>
            </div>
          </div>

          <h2 className="text-text text-[15px] font-semibold mt-2">{fullPost?.title}</h2>

          <div className="flex items-center justify-between bg-primary-light px-3 py-2 my-2 rounded-lg">
            <div>
              <p className="text-[#737373] text-[14px]">Offers</p>
              <p className="text-primary text-[14px] font-medium">{offeredSkills}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="bg-red-200 text-[10px] text-red-500 px-2 py-[2px] rounded-xs">
                {expertLevels}
              </p>
              <img src="../../images/exchange.svg" alt="" />
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[#737373] text-[14px]">Wants</p>
              <p className="text-primary text-[14px] font-medium">{wantedSkills}</p>
            </div>
          </div>

          <p className="text-[#737373] text-[14px] font-[500] text-justify leading-5 tracking-normal">
            {fullPost?.description || "No description available"}
          </p>
        </div>
      </div>

      {/* READONLY Form */}
      <div className="mx-[28px] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Proposal Message</p>
          <textarea
            value={proposal.message}
            readOnly
            className="border border-border rounded-lg p-3 text-[14px] bg-gray-100 h-[120px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Estimate Duration</p>
          <input
            type="text"
            readOnly
            value={proposal.estimateDuration}
            className="border border-border rounded-lg p-3 text-[14px] bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred Start Date</p>
          <input
            type="date"
            readOnly
            value={proposal.startDate?.slice(0, 10)}
            className="border border-border rounded-lg p-3 text-[14px] bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred End Date</p>
          <input
            type="date"
            readOnly
            value={proposal.endDate?.slice(0, 10)}
            className="border border-border rounded-lg p-3 text-[14px] bg-gray-100"
          />
        </div>
      </div>

      {/* Accept / Decline Buttons */}
      <div className="mx-[28px] flex gap-4 mt-8">
        <button
          onClick={() => handleStatus("rejected")}
          className="bg-red-500 text-white w-full py-3 rounded-lg font-medium"
        >
          Decline
        </button>

        <button
          onClick={() => handleStatus("accepted")}
          className="bg-green-600 text-white w-full py-3 rounded-lg font-medium"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ViewProposal;
