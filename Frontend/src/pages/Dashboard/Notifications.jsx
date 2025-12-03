import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const { API, user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchProposals = async () => {
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch proposals");

        const data = await res.json();

        // Received pending proposals
        const received = (data.proposals || []).filter(
          (p) => p.receiverId?._id === user._id && p.status === "pending"
        );

        // Sent proposals that are accepted or cancelled
        const sentStatusUpdates = (data.proposals || []).filter(
          (p) => p.senderId?._id === user._id && p.status !== "pending"
        );

        const receivedMessages = received.map((p) => ({
          id: p._id,
          text: `New proposal from ${p.senderId?.fullName || "Someone"}`,
          createdAt: p.createdAt,
          proposalId: p._id,
          status: "pending",
        }));

        const sentMessages = sentStatusUpdates.map((p) => ({
          id: p._id,
          text: `${p.receiverId?.fullName || "Someone"} ${
            p.status === "accepted" ? "accepted" : "cancelled"
          } your request`,
          createdAt: p.updatedAt,
          proposalId: p._id,
          status: p.status,
        }));

        setMessages(
          [...receivedMessages, ...sentMessages].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (err) {
        console.error(err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [API, user, token]);

  if (loading)
    return <p className="text-center mt-4">Loading notifications...</p>;
  if (messages.length === 0)
    return (
      <p className="text-center mt-4 text-gray-500">No new notifications</p>
    );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Pending</span>;
      case "accepted":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Accepted</span>;
      case "cancelled":
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mb-20 sm:mb-0'">
        <div className='flex items-center justify-start pl-[20px] py-5 sm:pl-0 bg-primary text-white sm:text-text sm:bg-gray-200'>
            <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
                <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
            </div>
            <h3 className=' w-full text-center text-[18px] sm:text-start pr-40 sm:pl-4 sm:text-xl'>
                Notifications
            </h3>
        </div>

      {messages.map((msg) => (
        <div
          key={msg.id}
          onClick={() =>
            navigate("/dashboard/request", { state: { proposalId: msg.proposalId } })
          }
          className="flex justify-between items-center m-3 bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <div className="flex flex-col">
            <p className="text-gray-800">{msg.text}</p>
            <span className="text-gray-400 text-xs mt-1">
              {msg.createdAt
                ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
                : "Just now"}
            </span>
          </div>
          <div>{getStatusBadge(msg.status)}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
