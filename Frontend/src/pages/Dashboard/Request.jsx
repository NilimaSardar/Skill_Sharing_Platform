import React, { useState, useEffect, useRef } from "react";

import SendProposal from "../../components/Request/SendProposal";
import ReceivedProposal from "../../components/Request/ReceivedProposal";

const Request = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("received"); // DEFAULT → Received Proposal
  const menuRef = useRef(null);

  const handleOptionClick = () => setShowMenu(!showMenu);

  const handleFilter = (type) => {
    setFilter(type);
    setShowMenu(false);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      
      {/* Header */}
      <div className="flex items-center justify-between px-[28px] py-5 bg-primary text-white">
        <h3 className="font-serif w-full text-xl">Proposal Request</h3>

        <div
          className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer relative"
          onClick={handleOptionClick}
          ref={menuRef}
        >
          <img
            src="../../images/options.svg"
            alt="setting"
            className="w-[25px] h-[25px]"
          />

          {showMenu && (
            <div className="absolute top-7 right-0 bg-white shadow-md rounded-lg border border-gray-200 z-10 w-[160px]">
              <p
                className="px-4 py-2 text-text text-[14px] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilter("sent")}
              >
                Sent Proposal
              </p>
              <p
                className="px-4 py-2 text-text text-[14px] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilter("received")}
              >
                Received Proposal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-[28px] my-3">
        {filter === "received" && <ReceivedProposal />}
        {filter === "sent" && <SendProposal />}
      </div>
    </div>
  );
};

export default Request;