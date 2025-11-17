import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProposeExchange = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const data = state;

  if (!data) return <p>No data found</p>;

  return (
    <div className="bg-white pb-20 min-h-screen">

      {/* Top Header */}
      <div className="flex items-center justify-between px-[20px] py-5 bg-primary text-white">
        <div
          onClick={() => navigate(-1)}
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
        >
          <img
            src="../../images/BackArrow.svg"
            alt="back"
            className="w-[25px] h-[25px]"
          />
        </div>
        <h3 className="w-full text-center text-xl mr-5 font-serif">
          Propose Exchange
        </h3>
      </div>

      {/* User Summary Card */}
      <div className="mx-[28px] py-4">
        <div className="border border-border rounded-lg p-3 flex flex-col gap-1.5 shadow-sm">

          {/* Profile Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                <img
                  src={data.profile}
                  alt="user"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-[16px] font-serif">{data.name}</h3>
                <p className="text-[13px] text-[#7B7676] font-serif">
                  {data.age}, {data.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <img src="../../rating/Star.svg" alt="" />
                <p className="text-text font-[550] text-[14px]">{data.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="../../images/Calender.svg" alt="" />
                <p className="text-[13px] text-[#7B7676]">{data.posted}</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-text text-[15px] font-semibold mt-1">
            {data.title}
          </h2>

          {/* Offer / Want Box */}
          <div className="flex items-center justify-between bg-primary-light px-3 py-2 my-1 rounded-lg">
            <div>
              <p className="text-[#737373] text-[14px]">Offers</p>
              <p className="text-primary text-[14px] font-medium">{data.offer}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="bg-red-200 text-[10px] text-red-500 px-2 py-[2px] rounded-xs">
                {data.offerLevel}
              </p>
              <img src="../../images/exchange.svg" alt="" />
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[#737373] text-[14px]">Wants</p>
              <p className="text-primary text-[14px] font-medium">{data.want}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#737373] text-[14px] font-[500] text-justify leading-5 tracking-normal">
            {data.description}
          </p>
        </div>
      </div>

      {/* Proposal Form */}
      <form className="mx-[28px] flex flex-col gap-5">

        {/* Proposal Message */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Proposal Message</p>
          <textarea
            placeholder="Enter a message here..."
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none h-[120px]"
          ></textarea>
        </div>

        {/* Estimate Duration */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Estimate Duration</p>
          <input
            type="text"
            placeholder="Eg: 2 hours"
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred Start Date</p>
          <input
            type="date"
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[15px]">Preferred End Date</p>
          <input
            type="date"
            className="border border-border rounded-lg p-3 text-[14px] focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white text-[15px] font-medium py-3 rounded-lg w-full shadow-md active:scale-[0.98] transition"
        >
          Send Proposal
        </button>
      </form>
    </div>
  );
};

export default ProposeExchange;
