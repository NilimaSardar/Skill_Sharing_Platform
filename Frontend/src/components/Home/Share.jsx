import React from 'react'
import { useNavigate } from "react-router-dom";

const Share = () => {
  const navigate = useNavigate();

  const items = [
    {
      profile: "../../profile/Nilima.jpeg",
      name: "Shikshya Nepal",
      age: 28,
      location: "Biratnagar",
      rating: 4.5,
      posted: "2 days ago",
      title: "Video Editing For Beginners.",
      description:
        "I offer personalized training to master videography fundamentals. Learn how to effectively use your gear, frame shots, and execute basic video editing.",
      schedule: "2 months",
      fees: 785
    },
    {
      profile: "../../profile/Nilima.jpeg",
      name: "Shikshya Nepal",
      age: 28,
      location: "Biratnagar",
      rating: 4.5,
      posted: "2 days ago",
      title: "Video Editing For Beginners.",
      description:
        "I offer personalized training to master videography fundamentals. Learn how to effectively use your gear, frame shots, and execute basic video editing.",
      schedule: "2 months",
      fees: 785
    }
  ];

  return (
    <div className="flex flex-col gap-3">

      {items.map((item, index) => (
        <div key={index} className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                <img
                  src={item.profile}
                  alt="user"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className='font-serif text-[16px]'>{item.name}</h3>
                <p className='font-serif text-[13px] text-[#7B7676]'>
                  {item.age}, {item.location}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <div className='flex items-center'>
                <img src="../../rating/Star.svg" alt=""/>
                <p className='font-serif text-text font-[550] text-[14px]'>{item.rating}</p>
              </div>
              <div className='flex items-center gap-2'>
                <img src="../../images/Calender.svg" alt="" />
                <p className='font-serif text-[13px] text-[#7B7676]'>{item.posted}</p>
              </div>
            </div>
          </div>

          <h2 className='text-text text-[14px] font-[550]'>{item.title}</h2>

          <p className='text-[#737373] text-[14px] font-[500] text-justify leading-4.5 tracking-normal'>
            {item.description}
          </p>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <img src="../../images/Time.svg" alt="" className='w-4 h-4'/>
              <p className='font-serif text-[14px] text-[#7B7676]'>
                Schedule: {item.schedule}
              </p>
            </div>

            <div className='flex items-center gap-1'>
              <p className='font-serif text-[16px] text-text font-[580]'>
                Rs.{item.fees}
              </p>
            </div>
          </div>

          {/* VIEW DETAILS BUTTON */}
          <button
            onClick={() => navigate("/dashboard/home/view-share-details", { state: item })}
            className='bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full'
          >
            View Details
          </button>

        </div>
      ))}

    </div>
  );
};

export default Share;