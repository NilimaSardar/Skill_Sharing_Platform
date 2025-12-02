import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";


const SafetyGuidelines = () => {
    const navigate = useNavigate();
    
    const guidelines = [
        "Use a strong, unique password and keep it confidential.",
        "Enable two-factor authentication for added security.",
        "Share only necessary personal information; avoid sensitive details.",
        "Interact with verified users and check reviews before exchanges.",
        "Use the platform’s chat system for communication; avoid external platforms.",
        "For paid posts, use only the platform’s secure payment method.",
        "Report or block suspicious or inappropriate users immediately.",
        "Respect privacy, intellectual property, and confidential information."
    ];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
                <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
                  <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
                </div>
                <h3 className='w-full text-center text-xl mr-5 sm:text-start'>Safety Guidelines</h3>
            </div>
      <p className="text-gray-700 px-[28px] py-4">
        Follow these guidelines to ensure a safe and secure experience on our platform:
      </p>
      <ul className="list-disc list-inside space-y-2 px-[28px] py-4 text-gray-700">
        {guidelines.map((item, index) => (
          <li key={index} className="hover:text-blue-600 transition-colors">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyGuidelines;
