import React from 'react';
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
    const navigate = useNavigate();

    const helpItems = [
        "Reset your password using the “Forgot Password” option if you cannot log in.",
        "Contact support via email or the in-built form for account or technical issues.",
        "Create Share Posts for paid services and Exchange Posts for free skill exchange; fill all required fields.",
        "Use dashboard categories and subcategories to find relevant posts and skills.",
        "Send exchange proposals through the Proposal form and communicate securely via the in-built chat system."
    ];

    const contactItems = [
        "Support Email: support@proxchange.com",
        "Phone: +977-XXXXXXXXX",
        "Office Address: [Your Company Address, City, Country]",
        "Feedback & Suggestions: Use the “Contact Us” form on the platform to send queries or suggestions.",
        "Response Time: Our team will respond within 24–48 hours."
    ];

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">

            {/* Header */}
            <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
                <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
                    <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
                </div>
                <h3 className='w-full text-center text-xl mr-5 sm:text-start'>Help & Support</h3>
            </div>

            {/* Help Section */}
            <p className="text-gray-700 px-[28px] py-4">
                Follow these instructions to get assistance and use ProXchange effectively:
            </p>
            <ul className="list-disc list-inside space-y-2 px-[28px] py-2 text-gray-700">
                {helpItems.map((item, index) => (
                    <li key={index} className="hover:text-blue-600 transition-colors">
                        {item}
                    </li>
                ))}
            </ul>

            {/* Contact Section */}
            <p className="text-gray-700 px-[28px] py-4 font-semibold">Contact Us:</p>
            <ul className="list-disc list-inside space-y-2 px-[28px] py-2 text-gray-700">
                {contactItems.map((item, index) => (
                    <li key={index} className="hover:text-blue-600 transition-colors">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HelpSupport;
