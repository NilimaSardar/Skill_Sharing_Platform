import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundDesgin from '../components/BackgroundDesgin'

const Welcome = () => {
  return (
    <div className="h-screen bg-white px-[31px] flex items-center justify-center relative overflow-hidden">

      <BackgroundDesgin/>
        <div className="z-10 bg-white flex flex-col justify-center gap-[40px] w-full sm:w-[500px] sm:shadow-2xl sm:gap-[0px] sm:p-10 sm:rounded-3xl">
            <div>
                <img src="images/Work from home.svg" alt="" className='w-full h-full'/>
            </div>
            <div>
                <h2 className="text-[28px] text-center font-medium text-primary mb-3 leading-8">
                    Discover Your <br /> Dream Job here
                </h2>
                <p className="text-black  text-[15px] font-normal text-center">
                    Explore all the existing job roles based <br />on your interest and study major
                </p>
            </div>

            <div className='flex gap-5 mt-10 w-full sm:w-[400px]'>
                <Link to='/login' className='w-full bg-primary text-[16px] text-white text-center py-3 rounded-xl transition duration-300 ease-in-out font-semibold text-lg drop-shadow-[0px_10px_20px_#CBD6FF] hover:bg-opacity-80'>
                    Login
                </Link>
                <Link to='/register' className='w-full bg-transparent text-[16px] text-[#0A0A0A] text-center py-3 rounded-xl transition duration-300 ease-in-out font-semibold text-lg drop-shadow-[0px_10px_20px_#CBD6FF] hover:bg-primary hover:text-white'>
                    Register
                </Link>

            </div>
        </div>
    </div>
  )
}

export default Welcome