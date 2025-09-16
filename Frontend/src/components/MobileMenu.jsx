import React from 'react'
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi2";
import { VscDiffAdded } from "react-icons/vsc";
import { BsChatText } from "react-icons/bs";

const MobileMenu = () => {
  return (
    <div className='flex justify-between px-[28px] py-[20px] sticky bottom-0 bg-white w-full max-w-md  items-center border-t-1 border-border'>
        <li className="flex flex-col items-center text-[#737373] gap-1">
            <GoHome className='font-semibold text-[25px]'/>
            <p className='text-[14px]'>Home</p>
        </li>
        <li className="flex flex-col items-center text-[#737373] gap-1">
            <HiOutlineUserGroup className='font-semibold text-[25px]'/>
            <p className='text-[14px]'>Request</p>
        </li>
        <li className="flex flex-col items-center text-[#737373] gap-1">
            <VscDiffAdded className='font-semibold text-[25px]'/>
            <p className='text-[14px]'>Create</p>
        </li>
        <li className="flex flex-col items-center text-[#737373] gap-1">
            <BsChatText className='font-semibold text-[25px]'/>
            <p className='text-[14px]'>Chat</p>
        </li>
        <li className="flex flex-col items-center text-[#737373] gap-1">
            <HiOutlineUser  className='font-bold text-[25px]'/>
            <p className='text-[14px]'>Profile</p>
        </li>
    </div>
  )
}

export default MobileMenu