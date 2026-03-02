import React from "react";
import { Link } from "react-router-dom";
import { APP_DATA } from "../data/levels";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const colors = ["blue", "green", "orange"];

  return (
    <div className="dashboard">
      <h1>My Quest</h1>
      <p>This is your dashboard where you can track progress and continue your journey.</p>
      <div className="level-grid">
        {APP_DATA.map((level, idx) => {
          const colorClass = colors[idx % colors.length];
          return (
            <Link
              key={level.levelId}
              to={`/level/${level.levelId}`}
              className={`level-card ${colorClass}`}
            >
              {level.levelId}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
