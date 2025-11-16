import React from 'react'
import { Link,NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Home = () => {
  const { user } = useAuth(); // get logged-in user
  console.log('user in home:', user);
  

  // Dynamically get full name, fallback to "User" if not available
  const fullName = user?.profile?.first_name
    ? `${user.profile.first_name} ${user.profile.last_name || ""}`.trim()
    : "User";
  return (
    <div className="bg-white  pb-20">
      <div className="pt-[24px] px-[28px] flex justify-between items-center w-full max-w-md  bg-primary text-white-2">
        <div className="flex items-center gap-3 mb-5">
          <img src="../profile/Nilima.jpeg" alt="profile image" className="h-[50px] w-[50px] rounded-full"/>
          <div className="leading-5">
            <p className="text-[18px] tracking-wide">{user.fullName}</p>
            <h3 className="font-normal text-[12px]">Discover your skills today</h3>
          </div>
        </div>
        <div className="w-[35px] h-[35px] bg-icon-bg-hover flex items-center justify-center rounded-lg mb-5 cursor-pointer">
          <img src="../images/notification.svg" alt="notification bell" className='w-[24px] h-[24px]'/>
        </div>
      </div>

      <div className='mx-[28px] py-4'>
        {/* Search and filter */}
        <div className="flex justify-between gap-2.5">
          <div className="p-2 h-10 w-70 text-[18px] font-medium border border-border bg-search-bg rounded-[5px] flex justify-between">
            <input type="text" placeholder="Search"/>
            <img src="../images/Search_Icon.svg" alt="Search_Icon" className="w-5 h-5"/>
          </div>
          
          <div className="bg-primary p-2 w-10 h-10 rounded-[5px]">
            <img src="../images/Filter_Icon.svg" alt="Filter_Icon" />
          </div>
        </div>

        {/* Matching Partner */}
        <div className="flex justify-between items-center bg-primary w-full h-[125px] my-5 rounded-lg">
          <div className="leading-6 pl-3">
            <h3 className="text-white text-[15px]">Find Your Perfect Skill Sharing Partner</h3>
            <Link
              to="/Request"
              className="bg-white rounded-[5px] text-primary text-[12px] font-[600] px-3 py-1 mt-2 inline-block"
            >
              View Matches
            </Link>
          </div>
          <img src="../../images/Group-3.svg" alt="" className='pt-6 h-[145px] w[145px]'/>
        </div>

        {/* Skill Categories */}
        {/* <div>
          <h2 className="font-bold text-text">Skills Categories</h2>

          <div className="grid grid-cols-4 gap-4 py-5">
            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/fitness.svg" alt="fitness" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Fitness</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/technology.svg" alt="Technology & IT" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Technol...</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/arts.svg" alt="Arts" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Arts</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/marketing.svg" alt="Marketing" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Marketing</p>
            </li>
            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/music.svg" alt="Music" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Music</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/communication.svg" alt="Communication" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Communi...</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/cooking.svg" alt="Cooking" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">Cooking</p>
            </li>

            <li className="flex flex-col items-center">
              <div className="w-[55px] h-[55px] bg-icon-bg-hover flex items-center justify-center rounded-full cursor-pointer">
                <img src="../SkillCategories/more.svg" alt="more" className="w-[32px] h-[32px]" />
              </div>
              <p className="text-[14px] text-center font-medium">More...</p>
            </li>

          </div>


        </div> */}

        {/* Upcoming Schedule */}
        {/* <div>
          <h2 className="font-bold text-text">Upcoming Schedule</h2>
          <div className="my-5 p-2.5 border-2 border-primary flex flex-col justify-between items-cente w-full h-[120px] rounded-[5px]">
            <h3 className="font-[500]">Your Upcoming Schedule is at 5 PM</h3>
            <p className="text-[#737373] font-normal text-[14px]">Today, 5:00 PM - 6:00 PM</p>
              <div className='flex gap-5 w-full sm:w-[400px] pt-2'>
                  <Link to='/login' className='w-full bg-primary text-[16px] text-white flex justify-center items-center rounded-[5px] font-medium text-lg'>
                      Remind Me
                  </Link>
                  <Link to='/register' className='w-full bg-transparent text-[16px] py-1.5 flex justify-center items-center  border border-primary text-primary rounded-[5px] font-[500] text-lg'>
                      Cancel
                  </Link>

              </div>
          </div>
        </div> */}

        {/* Search catogoy */}
        <div className="flex w-full gap-4 text-center text-[16px] font-medium text-text">
          <NavLink
            to=""
            className={({ isActive }) =>
              `py-[7px] w-1/2 rounded-lg ${
                isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
              }`
            }
          >
            Exchange
          </NavLink>

          <NavLink
            to=""
            className={({ isActive }) =>
              `py-[7px] w-1/2 rounded-lg ${
                isActive ? "bg-primary-light text-text border border-border" : "text-text hover:text-primary border border-border"
              }`
            }
          >
            Share
          </NavLink>
          </div>
      </div>
  </div>
  )
}

export default Home