import React from 'react';
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
    const navigate = useNavigate();

    const termsItems = [
        "Account Responsibility: Users must provide accurate information and maintain the confidentiality of their login credentials.",
        "Acceptable Use: Users shall use the platform only for legitimate skill sharing and exchange activities.",
        "Prohibited Activities: Harassment, fraud, offensive content, and unauthorized transactions are strictly prohibited.",
        "Content Ownership: Users retain ownership of their content but grant ProXchange permission to display it on the platform.",
        "Payment and Transactions: All paid transactions must use the platform’s secure methods; ProXchange is not liable for off-platform payments.",
        "Reporting Violations: Users should report inappropriate behavior, scams, or policy violations immediately.",
        "Platform Rights: ProXchange reserves the right to suspend or terminate accounts that violate policies.",
        "Limitation of Liability: ProXchange is not responsible for any direct or indirect damages resulting from user interactions or exchanges."
    ];

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">

            {/* Header */}
            <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white sm:text-text sm:bg-gray-200'>
                <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
                    <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
                </div>
                <h3 className='w-full text-center text-xl mr-5 sm:text-start'>Terms of Service</h3>
            </div>

            {/* Terms Section */}
            <p className="text-gray-700 px-[28px] py-4">
                Please read and follow these terms to use ProXchange responsibly:
            </p>
            <ul className="list-disc list-inside space-y-2 px-[28px] py-2 text-gray-700">
                {termsItems.map((item, index) => (
                    <li key={index} className="hover:text-blue-600 transition-colors">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TermsOfService;
