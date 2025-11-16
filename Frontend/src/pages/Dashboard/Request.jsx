import React, { useState, useEffect, useRef } from "react";

import ReceivedRequest from "../../components/Request/ReceivedRequest";
import SendRequest from "../../components/Request/SendRequest";

const Request = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("suggestions");
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
      {/* Top Header */}
      <div className="flex items-center justify-between px-[28px] py-5 bg-primary text-white">
        <h3 className="font-serif w-full text-xl">Exchange Request</h3>

        {/* Options Menu */}
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
            <div className="absolute top-7 right-0 bg-white shadow-md rounded-lg border border-gray-200 z-10 w-[130px]">
              <p
                className="px-4 py-2 text-text text-[14px] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilter("sent")}
              >
                Sent Request
              </p>
              <p
                className="px-4 py-2 text-text text-[14px] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilter("all")}
              >
                Show All
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-[28px] my-3">
        {/* Tabs */}
        <div className="flex w-full gap-4 text-center text-[14px] font-medium text-text">
          {/* Suggestions Tab */}
          <button
            className={`py-[6px] px-[8px] w-1/2 rounded-lg ${
              activeTab === "suggestions"
                ? "bg-primary-light text-text border border-border"
                : "text-text hover:text-primary border border-border"
            }`}
            onClick={() => {
              setActiveTab("suggestions");
              setFilter("suggestions");
            }}
          >
            Suggestions
          </button>

          {/* Received Tab */}
          <button
            className={`py-[6px] px-[8px] w-1/2 rounded-lg ${
              activeTab === "received"
                ? "bg-primary-light text-text border border-border"
                : "text-text hover:text-primary border border-border"
            }`}
            onClick={() => setActiveTab("received")}
          >
            Received Request
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
        {activeTab === "suggestions" && <SendRequest filter={filter} />}
{activeTab === "received" && <ReceivedRequest filter={filter} />}

        </div>
      </div>
    </div>
  );
};

export default Request;
