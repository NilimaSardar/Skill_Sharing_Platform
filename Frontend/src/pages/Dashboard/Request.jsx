import React, { useState, useEffect, useRef } from "react";
import SendProposal from "../../components/Request/SendProposal";
import ReceivedProposal from "../../components/Request/ReceivedProposal";

const Request = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("received"); // Default: Received Proposal
  const menuRef = useRef(null);

  const handleOptionClick = () => setShowMenu(!showMenu);

  const handleFilter = (type) => {
    setFilter(type);
    setShowMenu(false);
  };

  // Close menu if clicked outside
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
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-primary text-white relative">
        <h3 className="font-serif text-xl">Proposal Request</h3>

        {/* Options Menu */}
        <div
          className="relative"
          ref={menuRef}
        >
          <button
            onClick={handleOptionClick}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
          >
            <img src="../../images/options.svg" alt="options" className="w-6 h-6" />
          </button>

          {showMenu && (
            <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg border border-gray-200 z-20 w-40">
              <p
                onClick={() => handleFilter("sent")}
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                Sent Proposal
              </p>
              <p
                onClick={() => handleFilter("received")}
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                Received Proposal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-6 my-4">
        {filter === "received" && <ReceivedProposal />}
        {filter === "sent" && <SendProposal />}
      </div>
    </div>
  );
};

export default Request;