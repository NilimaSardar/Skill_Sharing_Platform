import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ManagePost = () => {
  const { user, API } = useAuth();
  const navigate = useNavigate();
  // console.log("Current user ID:", user._id);

  const token = localStorage.getItem("token");
  const [userPosts, setUserPosts] = useState([]);

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

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
  
    try {
      const res = await fetch(`${API}/api/posts/delete/${postId}`, {
        method: "PATCH", // PATCH to update status
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "inactive" }),
      });
  
      const data = await res.json();
      if (data.success) {
        alert("Post deleted successfully");
        // Remove the post from state (so it disappears from UI)
        setUserPosts(userPosts.filter((post) => post._id !== postId));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    navigate("/dashboard/create", { state: { post, isEditing: true } });
  };  

  useEffect(() => {
    if (!user?._id) return; // wait for user data

    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${API}/api/posts/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // console.log("Fetched posts:", data);
        if (data.posts) setUserPosts(data.posts);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user, API, token]);

  if (!userPosts.length) {
    return <p className="text-center text-gray-500 mt-5">No posts yet</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {userPosts.map((item) => (
        <React.Fragment key={item._id}>
          {item.type === "share" ? (
            <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="../../images/Calender.svg" alt="" />
                    <p className="text-[13px] text-[#7B7676]">{timeAgo(item.createdAt)}</p>
                  </div>

                <div className="flex items-end gap-2">
                  <button className="flex items-center" onClick={() => handleDelete(item._id)}>
                    <img src="../../images/delete.svg" alt="" />
                  </button>
                  <button className="flex items-center" onClick={() => handleEdit(item)}>
                    <img src="../../images/tabler_edit.svg" alt="" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-text text-[14px] font-[550]">{item.title}</h2>
              <p className="text-[#737373] text-[14px] font-[500] text-justify leading-4.5 tracking-normal">
                {item.description}
              </p>

              {/* Share Post Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img src="../../images/Time.svg" alt="" className="w-4 h-4" />
                  <p className="text-[14px] text-[#7B7676]">Schedule: {item.duration}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[16px] text-text font-[580]">Rs.{item.fees}</p>
                </div>
              </div>
            </div>
          ) : item.type === "exchange" ? (
            <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="../../images/Calender.svg" alt="" />
                    <p className="text-[13px] text-[#7B7676]">{timeAgo(item.createdAt)}</p>
                  </div>

                <div className="flex items-end gap-2">
                  <button className="flex items-center" onClick={() => handleDelete(item._id)}>
                    <img src="../../images/delete.svg" alt="" />
                  </button>
                  <button className="flex items-center" onClick={() => handleEdit(item)}>
                    <img src="../../images/tabler_edit.svg" alt="" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-text text-[14px] font-[550]">{item.title}</h2>

              {/* Exchange Details */}
              <div className="flex items-center justify-between bg-primary-light px-3 py-2 my-1 rounded-lg">
                <div>
                <p className="text-[#737373] text-[14px]">Offers</p>
                {item.skillsOffered.map((skill, index) => (
                  <p key={index} className="text-primary text-[14px]">
                    {skill.category}
                  </p>
                ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                  {item.skillsOffered.map((skill, index) => {
                    let levelClass = "";

                    switch (skill.expertLevel) {
                      case "Beginner":
                        levelClass = "bg-green-200 text-green-600";
                        break;
                      case "Intermediate":
                        levelClass = "bg-yellow-200 text-yellow-600";
                        break;
                      case "Expert":
                        levelClass = "bg-red-200 text-red-600";
                        break;
                      default:
                        levelClass = "bg-gray-200 text-gray-600";
                    }

                    return (
                      <p
                        key={index}
                        className={`text-[10px] p-[4px] rounded-lg ${levelClass}`}
                      >
                        {skill.expertLevel}
                      </p>
                    );
                  })}
                  <img src="../../images/exchange.svg" alt="" />
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[#737373] text-[14px]">Wants</p>
                  {item.skillsInterested.map((skill, index) => (
                    <p key={index} className="text-primary text-[14px]">
                      {skill.subcategory}
                    </p>
                  ))}
                </div>
              </div>

              <p className="text-[#737373] mb-1 text-[14px] font-[500] text-justify leading-4.5 tracking-normal">
                {item.description}
              </p>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ManagePost;