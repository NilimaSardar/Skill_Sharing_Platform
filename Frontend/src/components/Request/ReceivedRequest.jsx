import React from 'react'

const ReceivedRequest = () => {
  return (
    <div className='flex flex-col gap-3'>

        {/* Send Request */}
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
                    <button className='bg-primary text-white text-[13px] font-medium px-2 py-1 rounded-lg w-1/2'>Accept</button>
                    <button className='bg-orange-500 text-white text-[13px] font-medium px-2 py-1 rounded-lg w-1/2'>Decline</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ReceivedRequest