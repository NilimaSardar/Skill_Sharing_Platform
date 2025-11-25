import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const { senderId, receiverId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "Hello" },
    { id: 2, sender: "me", text: "How are you ?" },
    { id: 3, sender: "them", text: "Hi !" },
    { id: 4, sender: "them", text: "Good. What’s abt u ?" },
    { id: 5, sender: "me", text: "Fine !!" },
    { id: 6, sender: "me", text: "Let’ meet today." },
    { id: 7, sender: "them", text: "Okay." },
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-start px-[20px] py-5 bg-primary text-white">
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
          <img src="../../../images/BackArrow.svg" alt="back" className="w-[25px] h-[25px]" />
        </div>
        <div className="flex gap-2 ml-3">
          <img
            src="/avatar.jpg"
            alt=""
            className="w-10 h-10 rounded-full border"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Smith Richard</h2>
            <p className="text-xs opacity-90">Active Now</p>
          </div>
        </div>

      </div>

      {/* CHAT BODY */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50"
      >
        <p className="text-center text-gray-500 text-xs">
          WED AT 9:23 PM
        </p>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "them" && (
              <img
                src="/avatar.jpg"
                alt=""
                className="w-7 h-7 rounded-full"
              />
            )}

            <div
              className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm ${
                msg.sender === "me"
                  ? "bg-gray-200 text-black rounded-br-none"
                  : "bg-primary text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Example "Today" section like screenshot */}
        <p className="text-center text-gray-500 text-xs mt-4">Today</p>

        {/* Just a sample message */}
        <div className="flex items-end gap-2">
          <img
            src="/avatar.jpg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <div className="px-4 py-2 bg-primary text-white rounded-2xl rounded-bl-none max-w-[70%]">
            Wanna Know Something.
          </div>
        </div>
      </div>

      {/* BOTTOM INPUT */}
      <div className="p-3 border-t border-border bg-white flex items-center gap-3">

        <input
          type="text"
          placeholder="Type a message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
        />

        <button
          onClick={sendMessage}
          className="p-3 rounded-full"
        >
          <img src="../../../images/Send.svg" alt="" className="w-10 h-10"/>
        </button>
      </div>
    </div>
  );
}