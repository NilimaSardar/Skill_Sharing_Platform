import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // remove admin token
    localStorage.removeItem("adminToken");

    // redirect to login
    navigate("/admin/login");
  }, []);

  return <p>Logging out...</p>;
};

export default AdminLogout;
