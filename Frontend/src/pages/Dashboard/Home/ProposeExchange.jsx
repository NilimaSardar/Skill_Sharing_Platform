import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProposeExchange = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // receives: item from Exchange page

  const data = state;

  if (!data) return <p>No data found</p>;

  return (
    <div className="bg-white  pb-20">
        <div className='flex items-center justify-between px-[20px] py-5 bg-primary text-white'>
            <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
            <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
            </div>
            <h3 className='w-full text-center text-xl mr-5'>
                Propose Exchange
            </h3>
        </div>

        <div className="mx-[28px] py-4">
            <div className='border border-border rounded-lg p-3 flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                    <img
                        src="../../profile/Nilima.jpeg"
                        alt="user"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                    </div>
                    <div>
                    <h3 className='text-[16px]'>{data.name}</h3>
                    <p className='text-[13px] text-[#7B7676]'>
                        {data.age}, {data.location}
                    </p>
                    </div>
                </div>

                <div className='flex flex-col items-end'>
                    <div className='flex items-center'>
                    <img src="../../rating/Star.svg" alt=""/>
                    <p className='text-text font-[550] text-[14px]'>{data.rating}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                    <img src="../../images/Calender.svg" alt="" />
                    <p className='text-[13px] text-[#7B7676]'>{data.posted}</p>
                    </div>
                </div>
                </div>

                <h2 className='text-text text-[14px] font-[550]'>{data.title}</h2>

                <div className='flex items-center justify-between bg-primary-light px-3 py-2 my-1 rounded-lg'>
                <div>
                    <p className='text-[#737373] text-[14px]'>Offers</p>
                    <p className='text-primary text-[14px]'>{data.offer}</p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <p className='bg-red-200 text-[10px] text-red-500 p-[3px] rounded-xs'>
                    {data.offerLevel}
                    </p>
                    <img src="../../images/exchange.svg" alt="" />
                </div>
                <div className='flex flex-col items-end'>
                    <p className='text-[#737373] text-[14px]'>Wants</p>
                    <p className='text-primary text-[14px]'>{data.want}</p>
                </div>
                </div>

                <p className='text-[#737373] mb-1 text-[14px] font-[500] text-justify leading-4.5 tracking-normal'>
                {data.description}
                </p>

            </div>
        </div>


    </div>
  );
};

export default ProposeExchange;
