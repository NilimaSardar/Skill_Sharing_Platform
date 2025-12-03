import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import MySkills from "../../components/profile/MySkills";
import ManagePost from "../../components/Profile/ManagePost";
import { useAuth } from '../../store/auth';

const Profile = () => {
  const navigate = useNavigate();
  const { API, user: authUser } = useAuth(); 
  const { userId } = useParams(); // get ID from URL

  const [activeTab, setActiveTab] = useState("skills"); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // inside your Profile component
  const isOwnProfile = !userId || userId === authUser._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const res = await fetch(`${API}/api/auth/user/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          if (!res.ok) throw new Error("User not found");
          const data = await res.json();
          setUser(data); // or data.user depending on API
        } else {
          setUser(authUser); // fallback to logged-in user
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [API, userId, authUser]);

  if (loading) return <p className='text-center mt-5'>Loading profile...</p>;
  if (!user) return <p className='text-center mt-5'>User not found</p>;

  return (
    <div>
      <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
        <h3 className='font-serif w-full text-center sm:text-start text-xl sm:ml-7'>Profile</h3>

        <NavLink to="profileSettings" className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer sm:p-2 sm:bg-primary sm:hover:bg-primary sm:rounded-lg sm:hidden transition"> 
          <img src="../../images/Settings.svg" alt="setting" className='w-[25px] h-[25px]'/> 
        </NavLink>
      </div>

      <div className='mx-[28px] py-2'>
        {/* Profile */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <div className="w-[85px] h-[85px] flex items-center justify-center cursor-pointer">
              <img
                src={
                  user.profilePhoto
                  ? user.profilePhoto.startsWith("http")
                      ? user.profilePhoto
                      : `${API}/uploads/${user.profilePhoto}`
                  : `${API}/uploads/Profile.jpeg`
                }
                alt={user.fullName || "profile"}
                className="w-[85px] h-[85px] rounded-full object-cover"
              />
            </div>

            <p className="text-[18px] text-center font-medium mt-2">{user.fullName || "User Name"}</p>
          </div>

          {/* Stats */}
          <div className='flex justify-between my-4'>
            <div className='flex flex-col items-center border-r border-border pr-6'>
              <h4 className='text-[20px] text-text font-black tracking-wide'>54</h4>
              <p className='text-[#737373] text-[14px]'>Connected</p>
            </div>
            <div className='flex flex-col items-center border-r border-border pr-6'>
              <h4 className='text-[20px] text-text font-black tracking-wide'>07</h4>
              <p className='text-[#737373] text-[14px]'>Conducted</p>
            </div>
            <div className='flex flex-col items-center'>
              <h4 className='text-[20px] text-text font-black tracking-wide'>03</h4>
              <p className='text-[#737373] text-[14px]'>Attendend</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className='font-[550]'>About Me</h4>
            <p className="text-[#737373] text-[14px] text-justify">
              {user.about || "No description provided."}
            </p>
          </div>
        </div>

        {isOwnProfile && (
        <>
        {/* Tabs */}
        <div className="flex w-full mt-4 text-center text-[16px] font-medium text-text border border-border rounded-lg">
          <button
            className={`py-[5px] my-[5px] mx-[8px] w-1/2 rounded-lg ${
              activeTab === "skills" 
                ? "bg-primary-light text-primary" 
                : "text-[#737373]"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            My Skills
          </button>

          <button
            className={`py-[5px] my-[5px] mx-[8px] w-1/2 rounded-lg ${
              activeTab === "history" 
                ? "bg-primary-light text-primary" 
                : "text-[#737373]"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Manage Post
          </button>
        </div>


        {/* Content */}
        <div className="py-4 pb-20">
          {activeTab === "skills" && <MySkills userId={user._id} />}
          {activeTab === "history" && <ManagePost userId={user._id} />}
        </div>
        </>

)}

      </div>
    </div>
  );
};

export default Profile;
