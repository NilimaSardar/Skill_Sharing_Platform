import React from 'react'
import { useOutletContext } from 'react-router-dom';

const SendRequest = () => {
  const { filter } = useOutletContext();

  return (
    <div className='flex flex-col gap-3'>
      {/* Show only when filter = all */}
      {(filter === "all") && (
        <div className='flex gap-3 items-center w-full h-35 px-2 rounded-lg border border-border'>
          <div className='h-30 w-22 rounded-lg'>
            <img src="../../profile/Nilima.jpeg" alt="" className='w-full h-full object-cover rounded-lg'/>
          </div>
          <div className='flex flex-col justify-between h-30 w-2/3'>
            <div className='flex gap-3 items-end'>
              <h3 className='text-[14px] text-text font-[570]'>Nilima Sardar</h3>
              <p className='text-[#737373] text-[12px]'>28,Biratnagar</p>
            </div>
            <p className='text-[#737373] text-[13px]'>Expert: <span className='text-primary'>React Developer | Singing</span></p>
            <p className='text-[#737373] text-[13px]'>Interested: <span className='text-text'>Video Editing</span></p>
            <div className='flex'>
              <img src="../../rating/rating.svg" alt="" />
              <p className='text-[#737373] text-[12px]'>(52)</p>
            </div>
            <div className='flex gap-2 mt-1'>
              <button className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-1/2'>Send Request</button>
              <button className='bg-orange-500 text-white text-[12px] font-medium px-2 py-2 rounded-lg w-1/2'>Message</button>
            </div>
          </div>
        </div>
      )}

      {/* Always show when filter === all or filter === sent */}
      {(filter === "all" || filter === "sent") && (
        <div className='flex gap-3 items-center w-full h-35 px-2 rounded-lg border border-border'>
          <div className='h-30 w-22 rounded-lg'>
            <img src="../../profile/Nilima.jpeg" alt="" className='w-full h-full object-cover rounded-lg'/>
          </div>
          <div className='flex flex-col justify-between h-30 w-2/3'>
            <div className='flex gap-3 items-end'>
              <h3 className='text-[14px] text-text font-[570]'>Nilima Sardar</h3>
              <p className='text-[#737373] text-[12px]'>28,Biratnagar</p>
            </div>
            <p className='text-[#737373] text-[13px]'>Expert: <span className='text-primary'>React Developer | Singing</span></p>
            <p className='text-[#737373] text-[13px]'>Interested: <span className='text-text'>Video Editing</span></p>
            <div className='flex'>
              <img src="../../rating/rating.svg" alt="" />
              <p className='text-[#737373] text-[12px]'>(52)</p>
            </div>
            <div className='flex gap-2 mt-1'>
              <button className='bg-orange-600 text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'>Cancel Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SendRequest;