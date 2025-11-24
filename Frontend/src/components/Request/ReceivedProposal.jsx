import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";

const ReceivedProposal = () => {
  const { API, user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !user._id) return; // Don't fetch if user is not loaded

    const fetchProposals = async () => {
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch proposals");

        const data = await res.json();
        setProposals(data.proposals || []);
      } catch (err) {
        console.error(err);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [API, user, token]);

  if (loading) return <p>Loading proposals...</p>;

  if (proposals.length === 0) return <p>No received proposals</p>;

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
                    proposal.senderId?.profilePhoto
                    ? `${API}/uploads/${proposal.senderId.profilePhoto}`
                    : `${API}/uploads/Profile.jpeg`
                }
                alt={proposal.senderId?.fullName || "User"}
                className="w-full h-full object-cover rounded-lg"
            />

          </div>
          <div className="flex flex-col justify-between h-30 w-2/3">
            <div className="flex gap-3 items-end">
              <h3 className="text-[14px] text-text font-[570]">{proposal.senderId?.fullName || "Unknown"}</h3>
              <p className="text-[#737373] text-[12px]">28, Biratnagar</p>
            </div>
            <p className="text-[#737373] text-[13px]">
              Expert: <span className="text-primary">{proposal.postId?.type || "N/A"}</span>
            </p>
            <p className="text-[#737373] text-[13px]">
              Message: <span className="text-text">{proposal.message}</span>
            </p>
            <div className="flex">
              <img src="../../rating/rating.svg" alt="" />
              <p className="text-[#737373] text-[12px]">(52)</p>
            </div>
            <button className="bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full mt-1">
              View Proposal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedProposal;