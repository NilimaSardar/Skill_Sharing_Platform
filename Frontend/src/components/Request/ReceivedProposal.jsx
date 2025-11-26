import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const ReceivedProposal = () => {
  const { API, user } = useAuth();
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchProposals = async () => {
      try {
        const res = await fetch(`${API}/api/proposals/user/${user._id}?status=pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Failed to fetch proposals: ${res.status}`);

        const data = await res.json();
        const receivedFromOthers = (data.proposals || []).filter(
          (p) => p.receiverId?._id === user._id
        );

        setProposals(receivedFromOthers);
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
  if (proposals.length === 0) return <p>No pending proposals</p>;

  return (
    <div className="flex flex-col gap-3">
    {proposals.map((proposal) => {
      const sender = proposal.senderId || {};

      const expertInfo =
      proposal.postId?.skillsInterested?.length > 0
        ? proposal.postId.skillsInterested.map(s => s.subcategory).join(", ")
        : "Not specified";  
    
     const interestedInfo =
     proposal.postId?.skillsOffered?.length > 0
     ? proposal.postId.skillsOffered.map(s => s.subcategory).join(", ")
     : "Not specified";
         

  return (
      <div
        key={proposal._id}
        className="flex relative gap-3 items-center w-full h-35 px-2 rounded-lg border border-border"
      >
        <div className="h-30 w-22 rounded-lg">
          <img
            src={
              sender.profilePhoto
                ? `${API}/uploads/${sender.profilePhoto}`
                : `${API}/uploads/Profile.jpeg`
            }
            alt={sender.fullName || "User"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-between h-30 w-2/3">
          <div className="flex gap-3 items-end">
            <h3 className="text-[14px] text-text font-[570]">
              {sender.fullName || "Unknown"}
            </h3>
            <p className="text-[#737373] text-[12px]">
              {sender.age || "N/A"}, {sender.location || "Unknown"}
            </p>
          </div>

          <p className="text-[#737373] text-[13px]">
            Expert: <span className="text-primary">{expertInfo}</span>
          </p>

          <p className="text-[#737373] text-[13px]">
            Interested: <span className="text-text">{interestedInfo}</span>
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/home/view-proposal", {
                state: { post: proposal.postId, proposal },
              })
            }
            className="bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full mt-1"
          >
            View Proposal
          </button>
        </div>
      </div>
    );
  })}

    </div>
  );
};

export default ReceivedProposal;