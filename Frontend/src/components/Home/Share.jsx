import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Share = ({ category, type, searchTerm }) => {

  const navigate = useNavigate();

  const { API} = useAuth();
  const token = localStorage.getItem("token"); // or user?.token
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      setError("");  
      try {
        const res = await fetch(`${API}/api/posts?type=${type}&category=${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch posts");
        }

        const data = await res.json();
        console.log(data);
        
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && type) fetchPosts();
  }, [category, type, API, token]);

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      post.description.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!filteredPosts.length) return <p>No {type} posts found for "{searchTerm}"</p>;

  return (
    <div className="flex flex-col gap-3">
      {filteredPosts.map((post) => {
        const user = post.userId || {};
        const skills = post.skillsOffered?.map(s => s.subcategory).join(", ");

        return(
        <div key={post._id} className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                <img
                  src={
                    user.profilePhoto
                      ? `${API}/uploads/${user.profilePhoto}`
                      : `${API}/uploads/Profile.jpeg`
                  }
                  alt={user.fullName || "User"}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className='font-serif text-[16px]'>{user.fullName || "Anonymous"}</h3>
                <p className='font-serif text-[13px] text-[#7B7676]'>
                  {user.age || "N/A"}, {user.location || "Unknown"}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <div className='flex items-center'>
                {/* <img src="../../rating/Star.svg" alt=""/>
                <p className='font-serif text-text font-[550] text-[14px]'>{item.rating}</p> */}
              </div>
              <div className='flex items-center gap-2'>
                <img src="../../images/Calender.svg" alt="" />
                <p className='font-serif text-[13px] text-[#7B7676]'>{timeAgo(post.createdAt)}</p>
              </div>
            </div>
          </div>

          <h2 className='text-text text-[14px] font-[550]'>{post.title}</h2>

          <p className='text-[#737373] text-[14px] font-[500] text-justify leading-4.5 tracking-normal'>
            {post.description}
          </p>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <img src="../../images/Time.svg" alt="" className='w-4 h-4'/>
              <p className='font-serif text-[14px] text-[#7B7676]'>
                Schedule: {post.duration || "N/A"}
              </p>
            </div>

            <div className='flex items-center gap-1'>
              <p className='font-serif text-[16px] text-text font-[580]'>
                Rs.{post.fees || 0}
              </p>
            </div>
          </div>

          {/* VIEW DETAILS BUTTON */}
          <button
            onClick={() => navigate("/dashboard/home/view-share-details", { state: post })}
            className='bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full'
          >
            View Details
          </button>

        </div>
        );
      })}

    </div>
  );
};

export default Share;