import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/"); // back home
  };

  const handleGoToApp = () => {
    navigate("/Landin"); // main app
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to your Dashboard!</h1>
      <p>Spravuj svoje ciele, sleduj progres a viac...</p>
      <button onClick={handleGoToApp} style={{ marginRight: "1rem" }}>
        Prejsť do aplikácie
      </button>
      <button onClick={handleLogout}>Odhlásiť sa</button>
    </div>
  );
};

export default Dashboard;
