import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewShareDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data found</p>;

  return (
    <div className="p-4">

      <button onClick={() => navigate(-1)}>Back</button>

      <h2>{state.title}</h2>
      <p>{state.description}</p>
      <p>Schedule: {state.schedule}</p>
      <p>Fees: Rs.{state.fees}</p>

    </div>
  );
};

export default ViewShareDetails;
