import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where
} from "firebase/firestore";

// console.log("Firestore DB:", db);    


export default function ChatRoom() {
  const { senderId, receiverId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Unique chat ID for this conversation (same for both users)
  const chatId = [senderId, receiverId].sort().join("_");


  // console.log("senderId:", senderId, "receiverId:", receiverId);
  // console.log("chatId:", chatId);


  // Listen to messages in real-time
  useEffect(() => {
    const q = query(
      collection(db, "messages"),    
      where("chatId", "==", chatId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), where("chatId", "==", chatId)),
      (snapshot) => {
        const loadedMessages = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
        setMessages(loadedMessages);
      }
    );
    
    

    return () => unsubscribe();
  }, [chatId]);


  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    try {
      console.log("Sending message:", input);
      await addDoc(collection(db, "messages"), {
        chatId,
        senderId,
        receiverId,
        text: input,
        createdAt: serverTimestamp()
      });
      console.log("Message sent successfully");
      setInput("");
    } catch (err) {
      console.error("Firestore write error:", err);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-start px-[20px] py-5 bg-primary text-white">
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
          <img src="../../../images/BackArrow.svg" alt="back" className="w-[25px] h-[25px]" />
        </div>
        <div className="flex gap-2 ml-3">
          <img src="/avatar.jpg" alt="" className="w-10 h-10 rounded-full border" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Chat</h2>
            <p className="text-xs opacity-90">Active Now</p>
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.senderId === senderId ? "justify-end" : "justify-start"}`}
          >
            {msg.senderId !== senderId && (
              <img src="/avatar.jpg" alt="" className="w-7 h-7 rounded-full" />
            )}
            <div className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm ${
              msg.senderId === senderId
                ? "bg-gray-200 text-black rounded-br-none"
                : "bg-primary text-white rounded-bl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM INPUT */}
      <div className="p-3 border-t border-border bg-white flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="p-3 rounded-full">
          <img src="../../../images/Send.svg" alt="send" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}