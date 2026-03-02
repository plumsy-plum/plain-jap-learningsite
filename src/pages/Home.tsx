import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Japanese Learning App</h1>
      <p className="home-desc">Select a category to start learning!</p>
      <button
        className="heartbeat-btn"
        onClick={() => navigate("/dashboard")}
      >
        My Quest
      </button>
    </div>
  );
};

export default Home;
