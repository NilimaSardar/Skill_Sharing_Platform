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
        const res = await fetch(`${API}/api/proposals/user/${user._id}?status=pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch proposals");

        const data = await res.json();
        const received = (data.proposals || []).filter(
          (p) => p.receiverId?._id === user._id
        );

        const newMessages = received.map((p) => ({
          id: p._id,
          text: `New proposal from ${p.senderId?.fullName || "Someone"}`,
          createdAt: p.createdAt,
          proposalId: p._id,
        }));

        setMessages(newMessages);
      } catch (err) {
        console.error(err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [API, user, token]);

  if (loading) return <p className="text-center mt-4">Loading notifications...</p>;
  if (messages.length === 0) return <p className="text-center mt-4 text-gray-500">No new messages</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-3">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      {messages.map((msg) => (
        <div
          key={msg.id}
          onClick={() => navigate("/dashboard/request", { state: { proposalId: msg.proposalId } })}
          className="flex justify-between items-start bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <p className="text-gray-800">{msg.text}</p>
          <span className="text-gray-400 text-xs">
            {msg.createdAt
              ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              : "Just now"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
