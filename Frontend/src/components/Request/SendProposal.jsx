import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";

const SendProposal = () => {
  const { API, user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchProposals = async () => {
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch proposals");
        const data = await res.json();
        // Filter sent proposals where the current user is sender
        setProposals(data.proposals?.filter(p => p.senderId?._id === user._id) || []);
      } catch (err) {
        console.error(err);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [API, user, token]);

  const handleCancel = async (proposalId) => {
    try {
      const res = await fetch(`${API}/api/proposals/${proposalId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel proposal");

      const updated = await res.json();
      setProposals(proposals.map(p => p._id === proposalId ? updated.proposal : p));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading sent proposals...</p>;
  if (proposals.length === 0) return <p>No sent proposals</p>;

  return (
    <div className="flex flex-col gap-3">
      {proposals.map((proposal) => (
        <div
          key={proposal._id}
          className="flex relative gap-3 items-center w-full h-35 px-2 rounded-lg border border-border"
        >
          <div className="h-30 w-22 rounded-lg">
            <img
              src={
                proposal.receiverId?.profilePhoto
                  ? `${API}/uploads/${proposal.receiverId.profilePhoto}`
                  : `${API}/uploads/Profile.jpeg`
              }
              alt={proposal.receiverId?.fullName || "User"}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between h-30 w-2/3">
            <div className="flex gap-3 items-end">
              <h3 className="text-[14px] text-text font-[570]">
                {proposal.receiverId?.fullName || "Unknown"}
              </h3>
              <p className="text-[#737373] text-[12px]">28, Biratnagar</p>
            </div>
            <p className="text-[#737373] text-[13px]">
              Expert: <span className="text-primary">{proposal.postId?.type || "N/A"}</span>
            </p>
            <p className="text-[#737373] text-[13px]">
              Message: <span className="text-text">{proposal.message}</span>
            </p>
            <div className="flex">
              <img src="/rating/rating.svg" alt="rating" />
              <p className="text-[#737373] text-[12px]">(52)</p>
            </div>
            <button
              onClick={() => handleCancel(proposal._id)}
              className="bg-orange-600 text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full mt-1"
            >
              Cancel Proposal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SendProposal;