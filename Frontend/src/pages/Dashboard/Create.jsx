import React from 'react'

const Create = () => {
  return (
    <div className='mb-20'>
      <div className='flex items-center justify-start py-5 bg-primary text-white'>
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

        {/* Skills to share */}
        <div className="flex flex-col mt-3">
          <p className="text-text text-[14px] font-serif">Skills To Share</p>

          {/* Dropdowns */}
          <div className="flex items-start gap-3 mt-3">

            {/* Skill Dropdown */}
            <div className="relative w-full">
              <select className="w-full appearance-none border border-border bg-white px-3 py-2 rounded-lg text-[13px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Choose Skill You Need</option>
                <option value="dance">Dancing</option>
                <option value="coding">Programming</option>
                <option value="music">Music</option>
                <option value="cooking">Cooking</option>
              </select>

              {/* Dropdown icon */}
              <img
                src="../../create/dropdown.svg"
                alt=""
                className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70"
              />
            </div>

            {/* Duration Dropdown */}
            <div className="relative w-[55%]">

              {/* Left time icon */}
              <img
                src="../../create/time.svg"
                alt=""
                className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 opacity-70"
              />

              <select className="w-full appearance-none border border-border bg-white pl-7 pr-6 py-2 rounded-lg text-[13px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Duration</option>
                <option value="1hr">1hr</option>
                <option value="2hr">2hr</option>
                <option value="3hr">3hr</option>
              </select>

              {/* Right arrow icon */}
              <img
                src="../../create/dropdown.svg"
                alt=""
                className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-70"
              />
            </div>

          </div>
        </div>

        {/* Fees*/}
        <div className="flex flex-col mt-3">
          <p className="text-text text-[14px] font-serif">Fees</p>

          {/* Dropdowns */}
          <div className="flex items-start gap-3 mt-1">
            <input type="text" className='border border-border px-4 py-2 w-25 h-[36px] rounded-lg' />
          </div>
        </div>

        {/* button */}
        <div className='flex flex-col gap-2 mt-4'>
          <button className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'>Post</button>
          <button className='border border-border text-[#737373] text-[12px] font-medium px-2 py-2 rounded-lg w-full'>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default Create