import React, { useState } from 'react'

const Create = () => {
  const [postType, setPostType] = useState("exchange");
  
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
          {/* Exchange */}
          <div className='flex items-center gap-2'>
            <input
              type="radio"
              name="postType"
              className='h-3'
              value="exchange"
              checked={postType === "exchange"}
              onChange={(e) => setPostType(e.target.value)}
            />
            <span className='text-[13px] text-[#737373]'>Exchange</span>
          </div>

          {/* Share */}
          <div className='flex items-center gap-2'>
            <input
              type="radio"
              name="postType"
              className='h-3'
              value="share"
              checked={postType === "share"}
              onChange={(e) => setPostType(e.target.value)}
            />
            <span className='text-[13px] text-[#737373]'>Share</span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-start gap-2 mt-3 w-full">

          {/* Skill You Offer  */}
          <div className="relative w-1/2">
            <p className="text-text text-[14px] font-serif">Skill You Offer</p>

            <select className="w-full appearance-none border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">Eg: Web Development</option>
              <option value="dance">Dancing</option>
              <option value="coding">Programming</option>
              <option value="music">Music</option>
              <option value="cooking">Cooking</option>
            </select>

            {/* Dropdown icon */}
            <img
              src="../../create/dropdown.svg"
              alt=""
              className="w-3 h-3 absolute right-1 top-12 -translate-y-1/2 pointer-events-none opacity-70"
            />
          </div>

          {/* Skill You Want */}
          <div className="relative w-1/2">
            <p className="text-text text-[14px] font-serif">Skill You Want</p>

            <select className="w-full appearance-none border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">Eg: Music, Cooking</option>
              <option value="dance">Dancing</option>
              <option value="coding">Programming</option>
              <option value="music">Music</option>
              <option value="cooking">Cooking</option>
            </select>

            {/* Dropdown icon */}
            <img
              src="../../create/dropdown.svg"
              alt=""
              className="w-3 h-3 absolute right-1 top-12 -translate-y-1/2 pointer-events-none opacity-70"
            />
          </div>
        </div>



        {/* Duration & Fees → Hide when postType = "share" */}
        {postType === "share" && (
          <div className="flex items-start gap-2 mt-3 w-full">

            {/* Duration */}
            <div className="relative w-1/2">
              <p className="text-text text-[14px] font-serif">Duration</p>

              <select className="w-full appearance-none border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Eg: 15 days</option>
                <option value="20days">20 Days</option>
                <option value="30days">30 Days</option>
                <option value="2month">2 Month</option>
                <option value="3month">3 Month</option>
              </select>

              <img
                src="../../create/dropdown.svg"
                alt=""
                className="w-3 h-3 absolute right-1 top-12 -translate-y-1/2 pointer-events-none opacity-70"
              />
            </div>

            {/* Fees */}
            <div className="w-1/2">
              <p className="text-text text-[14px] font-serif">Fees</p>

              <input type="text" className='w-full appearance-none border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373] focus:outline-none focus:ring-1 focus:ring-primary' />
            </div>
          </div>
        )}

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