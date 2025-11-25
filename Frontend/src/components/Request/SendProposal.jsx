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
        setProposals(
          data.proposals
            ?.filter(p => p.senderId?._id === user._id && p.status === "pending")
            || []
        );
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
  
      // Remove cancelled proposal from displayed list
      setProposals(prev => prev.filter(p => p._id !== proposalId));
  
    } catch (err) {
      console.error(err);
    }
  };  

  if (loading) return <p>Loading sent proposals...</p>;
  if (proposals.length === 0) return <p>No sent proposals</p>;

  return (
    <div className="flex flex-col gap-3">
      {proposals.map((proposal) => {
        const receiver = proposal.receiverId || {};

        // Expert: Skills offered in the post
        const expertInfo =
          proposal.postId?.skillsOffered?.length > 0
            ? proposal.postId.skillsOffered.map(s => `${s.subcategory} | ${s.expertLevel}`).join(", ")
            : "Not specified";

        // Interested: Skills wanted in the post
        const interestedInfo =
          proposal.postId?.skillsInterested?.length > 0
            ? proposal.postId.skillsInterested.map(s => s.subcategory).join(", ")
            : "Not specified";

        return (
          <div
            key={proposal._id}
            className="flex relative gap-3 items-center w-full h-35 px-2 rounded-lg border border-border"
          >
            <div className="h-30 w-22 rounded-lg">
              <img
                src={
                  receiver.profilePhoto
                    ? `${API}/uploads/${receiver.profilePhoto}`
                    : `${API}/uploads/Profile.jpeg`
                }
                alt={receiver.fullName || "User"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between h-30 w-2/3">
              <div className="flex gap-3 items-end">
                <h3 className="text-[14px] text-text font-[570]">
                  {receiver.fullName || "Unknown"}
                </h3>
                <p className="text-[#737373] text-[12px]">
                  {receiver.age || "N/A"}, {receiver.location || "Unknown"}
                </p>
              </div>
              <p className="text-[#737373] text-[13px]">
                Expert: <span className="text-primary">{expertInfo}</span>
              </p>
              <p className="text-[#737373] text-[13px]">
                Interested: <span className="text-text">{interestedInfo}</span>
              </p>
              <button
                onClick={() => handleCancel(proposal._id)}
                className="bg-orange-600 text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full mt-1"
              >
                Cancel Proposal
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SendProposal;