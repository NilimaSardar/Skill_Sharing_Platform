import React from 'react';
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    
    const policies = [
        "Users must provide accurate information during registration.",
        "Maintain confidentiality of your login credentials; sharing is prohibited.",
        "Only verified users should be contacted for skill exchanges.",
        "Personal information should be shared responsibly; avoid sensitive data.",
        "All communications must use the platform’s chat system.",
        "Paid transactions should follow the platform’s secure payment methods.",
        "Users must not engage in harassment, fraud, or inappropriate behavior.",
        "Respect other users’ privacy, intellectual property, and shared content."
    ];

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
                <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
                    <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
                </div>
                <h3 className='w-full text-center text-xl mr-5 sm:text-start'>Privacy Policy</h3>
            </div>

            {/* Intro Text */}
            <p className="text-gray-700 px-[28px] py-4">
                Follow these guidelines to understand your rights and responsibilities on ProXchange:
            </p>

            {/* List of Policies */}
            <ul className="list-disc list-inside space-y-2 px-[28px] py-4 text-gray-700">
                {policies.map((item, index) => (
                    <li key={index} className="hover:text-blue-600 transition-colors">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
