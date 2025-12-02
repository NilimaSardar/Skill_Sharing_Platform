import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Share = ({ category, type, searchTerm }) => {
  const navigate = useNavigate();
  const { API } = useAuth();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `${API}/api/posts?type=${type}${
          category ? `&category=${category}` : ""
        }`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, type, API, token]);

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past;

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    if (mins > 0) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
    return "just now";
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const desc = post.description?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";

    return title.includes(search) || desc.includes(search);
  });

  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 5);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!filteredPosts.length)
    return <p>No {type} posts found for "{searchTerm}"</p>;

  return (
    <div className="flex flex-col gap-3">
      {visiblePosts.map((post) => {
        const user = post.userId || {};
        const skills = post.skillsOffered
          ?.map((s) => s.subcategory)
          .join(", ");

        return (
          <div
            key={post._id}
            className="border border-border rounded-lg p-3 flex flex-col gap-1.5"
          >
            {/* USER HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-[50px] h-[50px]">
                  <img
                    src={
                      user.profilePhoto
                        ? `${API}/uploads/${user.profilePhoto}`
                        : `${API}/uploads/Profile.jpeg`
                    }
                    className="w-[40px] h-[40px] rounded-full object-cover" alt="User"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-[16px]">
                    {user.fullName || "Anonymous"}
                  </h3>
                  <p className="font-serif text-[13px] text-[#7B7676]">
                    {user.age || "N/A"}, {user.location || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src="../../images/Calender.svg" alt="" />
                <p className="font-serif text-[13px] text-[#7B7676]">
                  {timeAgo(post.createdAt)}
                </p>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-text text-[14px] font-[550]">{post.title}</h2>

            {/* DESCRIPTION */}
            <p className="text-[#737373] text-[14px] leading-4 font-[500]">
              {post.description}
            </p>

            {/* SCHEDULE & FEES */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <img src="../../images/Time.svg" className="w-4 h-4" alt="" />
                <p className="font-serif text-[14px] text-[#7B7676]">
                  Schedule: {post.duration || "N/A"}
                </p>
              </div>

              <p className="font-serif text-[16px] text-text font-[580]">
                Rs.{post.fees || 0}
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/dashboard/home/view-share-details", {
                  state: {
                    postId: post._id,
                    receiverId: post.userId?._id,
                    title: post.title,
                    description: post.description,
                    fees: post.fees,
                    duration: post.duration,
                    skillsOffered: post.skillsOffered,
                    addLessons: post.addLessons,
                    createdAt: post.createdAt,
                  },
                })
              }
              className="bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full"
            >
              View Details
            </button>
          </div>
        );
      })}

      {filteredPosts.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full font-medium"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      )}
    </div>
  );
};

export default Share;