import React from 'react'

const MySkills = () => {
  return (
    <div className="flex flex-col gap-3">

      {/* Scrollable Skill List (shows approx 3 items) */}
      <div className="max-h-[260px] overflow-y-auto flex flex-col gap-3 pr-1 hide-scrollbar">

        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <div 
            key={i}
            className='flex gap-4 p-2 border border-border bg-white rounded-lg'
          >
            <div className='w-[130px] h-[70px]'>
              <img 
                src="../../skillCover/graphic.svg" 
                alt="" 
                className='w-full h-full object-cover'
              />
            </div>

            <div className='text-[14px]'>
              <h4 className='text-[15px] font-medium'>Graphics Design</h4>
              <p className='text-[#737373] mb-1'>Visual Arts</p>
              <p className='bg-yellow-100 text-yellow-500 inline p-1 rounded-lg'>
                Intermediate
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Add Skills Button */}
      <div className='flex flex-col gap-2 mt-4'>
        <button 
          type="submit" 
          className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'
        >
          Add Skills +
        </button>
      </div>

    </div>
  )
}

export default MySkills
