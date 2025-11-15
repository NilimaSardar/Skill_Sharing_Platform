import React from 'react'

const Create = () => {
  return (
    <div className=''>
      <div className='flex items-center justify-start py-6 bg-primary text-white'>
        <h3 className='font-serif w-full text-center text-[18px]'>Create Post</h3>
      </div>
      <div className='flex flex-col py-3 mx-[28px]'>
        <div className='flex items-center gap-2'>
          <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
            <img
              src="../../profile/Nilima.jpeg"
              alt="user"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className='font-serif text-[16px]'>Shikshya Nepal</h3>
            <p className='font-serif text-[13px] text-[#7B7676]'>28, Biratnagar</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 mt-2'>
          <input type="text" className='border border-border px-4 py-2 w-full rounded-lg placeholder:text-[14px]' placeholder='Type a descriptive title...'/>
          <textarea type="text" className='border border-border px-4 py-2 h-25 w-full rounded-lg placeholder:text-[14px]' placeholder='Enter the body text here...'/>
          <span className='text-[#737373] text-[12px]'>0/100 characters</span>
        </div>

        {/* post type */}
        <div className='flex flex-col mt-2'>
          <p className='text-text text-[14px]'>Choose Post Type (Requried)</p>
          <div className='flex flex-col items-start gap-2 mt-2'>
            <div className='flex items-center gap-2'>
              <input type="radio" name="postType" className='h-3'/>
              <span className='text-[13px] text-[#737373]'>Exchange</span>
            </div>
            
            <div className='flex items-center gap-2'>
              <input type="radio" name="postType" className='h-3'/>
              <span className='text-[13px] text-[#737373]'>Share</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Create