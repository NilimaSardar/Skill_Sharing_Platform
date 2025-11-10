import React from 'react'
import { useNavigate } from "react-router-dom";

const IndividualChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = "12345"; // Example chat ID
    navigate(`/dashboard/chat/${id}`);
  };
  return (
    <>
    <div onClick={handleClick} className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>

    <div className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>

    <div className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>

    <div className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>

    <div className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>

    <div className="flex justify-between items-start mb-2">
      <div className='flex items-center gap-2'>
        <div className="relative w-[55px] h-[55px] flex items-center justify-center cursor-pointer">
          <img
            src="../../profile/Nilima.jpeg"
            alt="user"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className='font-serif text-md'>Shikshya Nepal</h3>
          <p className='font-serif text-sm text-[#7B7676]'>message about me</p>
        </div>
      </div>
      <p className='font-serif text-sm text-[#7B7676]'>Just Now</p>
    </div>
  </>
  )
}

export default IndividualChat