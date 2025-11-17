import React from 'react'

const Share = () => {
  return (
    <div className='flex flex-col gap-3'>

      <div className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>
        <div className='flex items-center justify-between'>
          {/* Profile */}
          <div className='flex items-center gap-2'>
            <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
              <img
                src="../../profile/Nilima.jpeg"
                alt="user"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className='font-serif text-[16px]'>Shikshya Nepal</h3>
              <p className='font-serif text-[13px] text-[#7B7676]'>28, Biratnagar</p>
            </div>
          </div>

          {/* Time */}
          <div className='flex items-center gap-2'>
            <img src="../../images/Calender.svg" alt="" />
            <p className='font-serif text-[13px] text-[#7B7676]'>2 days ago</p>
          </div>
        </div>
        <h2 className='text-text text-[14px] font-[550]'>Video Editing For Beginners.</h2>
        <p className='text-[#737373] text-[14px] font-[500] text-justify w-full leading-4.5 tracking-normal'>I offer personalized to master videography fundamentals. Learn how to effectively use your gear, frame shots, and execute basic video editing.</p>
        
          {/* Time */}
          <div className='flex items-center gap-1'>
            <img src="../../images/Time.svg" alt="" className='w-4 h-4'/>
            <p className='font-serif text-[14px] text-[#7B7676]'>Schedule: 2 months</p>
          </div>

          {/* Fees and rating*/}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
            <img src="../../images/Rupee.svg" alt="" className='w-4 h-4'/>
            <p className='font-serif text-[14px] text-[#7B7676]'>Fees: <span className='text-text font-[550]'>Rs.785</span></p>
            </div>
            <div className='flex items-center'>
            <img src="../../rating/Star.svg" alt=""/>
            <p className='font-serif text-text font-[550] text-[14px]'>4.5</p>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col gap-2'>
            <button type="submit" className='bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full'>
              View Details
            </button>
          </div>
      </div>

      <div className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>
        <div className='flex items-center justify-between'>
          {/* Profile */}
          <div className='flex items-center gap-2'>
            <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
              <img
                src="../../profile/Nilima.jpeg"
                alt="user"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className='font-serif text-[16px]'>Shikshya Nepal</h3>
              <p className='font-serif text-[13px] text-[#7B7676]'>28, Biratnagar</p>
            </div>
          </div>

          {/* Time */}
          <div className='flex items-center gap-2'>
            <img src="../../images/Calender.svg" alt="" />
            <p className='font-serif text-[13px] text-[#7B7676]'>2 days ago</p>
          </div>
        </div>
        <h2 className='text-text text-[14px] font-[550]'>Video Editing For Beginners.</h2>
        <p className='text-[#737373] text-[14px] font-[500] text-justify w-full leading-4.5 tracking-normal'>I offer personalized to master videography fundamentals. Learn how to effectively use your gear, frame shots, and execute basic video editing.</p>
        
          {/* Time */}
          <div className='flex items-center gap-1'>
            <img src="../../images/Time.svg" alt="" className='w-4 h-4'/>
            <p className='font-serif text-[14px] text-[#7B7676]'>Schedule: 2 months</p>
          </div>

          {/* Fees and rating*/}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
            <img src="../../images/Rupee.svg" alt="" className='w-4 h-4'/>
            <p className='font-serif text-[14px] text-[#7B7676]'>Fees: <span className='text-text font-[550]'>Rs.785</span></p>
            </div>
            <div className='flex items-center'>
            <img src="../../rating/Star.svg" alt=""/>
            <p className='font-serif text-text font-[550] text-[14px]'>4.5</p>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col gap-2'>
            <button type="submit" className='bg-primary text-white text-[14px] font-medium px-2 py-2 rounded-lg w-full'>
              View Details
            </button>
          </div>
      </div>

    </div>
  )
}

export default Share