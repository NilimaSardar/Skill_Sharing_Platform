import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="px-[30px] py-[25px] bg-gradient-to-b from-[white_6%] to-[#dce0f9]">
        <div className='flex justify-between items-center'>
            <img src="images/ProXchange.svg" alt="" className='w-[190px] h-[30px]'/>
            <img src="images/HorizontalLine.svg" alt="" className='w-[18px] h-[18px]' />
        </div>
        <div className='mt-8 flex flex-col justify-center items-center'>
            <h2 className='text-[33px] text-center font-bold text-text mb-3 leading-10'>
                Develop your <span className='text-primary'>skills</span> in a new & unique way
            </h2>
            <p className='text-center text-[14px] text-text font-normal leading-[24px]'>
                Lorem ipsum dolor amet, consectetur adipiscing elit. Nulla ornare, site consecter enim gravida auctor vulputate, site antamet. tempor arcu, consectetur bibedum neque.
            </p>
            <div className='flex gap-5 mt-5 w-full'>
                <Link to='/welcome' className='w-full flex justify-center items-center gap-2 bg-primary text-[16px] text-white text-center py-3 rounded-xl transition duration-300 ease-in-out font-semibold text-lg border border-gray-300 hover:bg-white hover:text-text'>
                    Get Started
                </Link>
                <a 
                    href="video.mp4" // replace with your actual video file path
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='w-full flex justify-center items-center gap-2 bg-transparent text-[16px] text-text text-center py-3 rounded-xl transition duration-300 ease-in-out font-semibold text-lg border border-gray-300'
                >
                    <img src="images/PlayIcon.svg" alt="Play" className="w-5 h-5" />
                    Watch Video
                </a>
            </div>
        </div>
        <div>
            <img src="images/HeroImage.svg" alt="" />
            <div className='bg-white px-[15px] h-[100px] rounded-[10px] flex justify-between items-center'>
                <div className='leading-[30px] flex flex-col justify-center items-center h-full'>
                    <p className='text-[26px] text-primary font-bold space-x-2'>1.7k+</p>
                    <p className='text-[15px] font-medium tracking-wide'>Customers</p>
                </div>
                <div className='leading-[30px] flex flex-col justify-center items-center h-full'>
                    <p className='text-[26px] text-primary font-bold space-x-2'>10+</p>
                    <p className='text-[15px] font-medium tracking-wide'>Reviews</p>
                </div>
                <div className='leading-[30px] flex flex-col justify-center items-center h-full'>
                    <p className='text-[26px] text-primary font-bold space-x-2'>5+</p>
                    <p className='text-[15px] font-medium tracking-wide'>Partnerships</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage