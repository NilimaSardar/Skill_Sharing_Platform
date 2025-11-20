import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";

const ManagePost = () => {
  const { user, API } = useAuth();
  console.log("Current user ID:", user._id);

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

  useEffect(() => {
    if (!user?._id) return; // wait for user data

    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${API}/api/posts/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched posts:", data);
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
                  <button className="flex items-center">
                    <img src="../../images/delete.svg" alt="" />
                  </button>
                  <button className="flex items-center">
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
                  <p className="text-[14px] text-[#7B7676]">Schedule: {item.schedule}</p>
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
                  <button className="flex items-center">
                    <img src="../../images/delete.svg" alt="" />
                  </button>
                  <button className="flex items-center">
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
                  <p className="text-primary text-[14px]">{item.offer}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="bg-red-200 text-[10px] text-red-500 p-[3px] rounded-xs">{item.offerLevel}</p>
                  <img src="../../images/exchange.svg" alt="" />
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[#737373] text-[14px]">Wants</p>
                  <p className="text-primary text-[14px]">{item.want}</p>
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