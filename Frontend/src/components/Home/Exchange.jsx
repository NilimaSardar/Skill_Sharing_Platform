import React from 'react'
import { useNavigate } from "react-router-dom";

const Exchange = () => {
  const navigate = useNavigate();

  const sampleItem = {
    profile: "../../profile/Nilima.jpeg",
    name: "Shikshya Nepal",
    age: 28,
    location: "Biratnagar",
    rating: 4.5,
    posted: "2 days ago",
    title: "Video Editing For Beginners.",
    offer: "Videography",
    offerLevel: "Expert",
    want: "Web Development",
    description:
      "I offer personalized training to master videography fundamentals. Learn how to effectively use your gear, frame shots, and execute basic video editing."
  };

  return (
    <div className='flex flex-col gap-3'>

      <div className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
              <img
                src="../../profile/Nilima.jpeg"
                alt="user"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className='text-[16px]'>{sampleItem.name}</h3>
              <p className='text-[13px] text-[#7B7676]'>
                {sampleItem.age}, {sampleItem.location}
              </p>
            </div>
          </div>

          <div className='flex flex-col items-end'>
            <div className='flex items-center'>
              <img src="../../rating/Star.svg" alt=""/>
              <p className='text-text font-[550] text-[14px]'>{sampleItem.rating}</p>
            </div>
            <div className='flex items-center gap-2'>
              <img src="../../images/Calender.svg" alt="" />
              <p className='text-[13px] text-[#7B7676]'>{sampleItem.posted}</p>
            </div>
          </div>
        </div>

        <h2 className='text-text text-[14px] font-[550]'>{sampleItem.title}</h2>

        <div className='flex items-center justify-between bg-primary-light px-3 py-2 my-1 rounded-lg'>
          <div>
            <p className='text-[#737373] text-[14px]'>Offers</p>
            <p className='text-primary text-[14px]'>{sampleItem.offer}</p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <p className='bg-red-200 text-[10px] text-red-500 p-[3px] rounded-xs'>
              {sampleItem.offerLevel}
            </p>
            <img src="../../images/exchange.svg" alt="" />
          </div>
          <div className='flex flex-col items-end'>
            <p className='text-[#737373] text-[14px]'>Wants</p>
            <p className='text-primary text-[14px]'>{sampleItem.want}</p>
          </div>
        </div>

        <p className='text-[#737373] mb-1 text-[14px] font-[500] text-justify leading-4.5 tracking-normal'>
          {sampleItem.description}
        </p>

        <div className='flex flex-col gap-2'>
          <button
            onClick={() => navigate("/dashboard/home/propose-exchange", { state: sampleItem })}
            className="bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full"
          >
            Propose Exchange
          </button>
        </div>
      </div>
    </div>
  )
}

export default Exchange