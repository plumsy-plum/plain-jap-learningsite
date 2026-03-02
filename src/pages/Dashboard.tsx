import React from "react";
import { Link } from "react-router-dom";
import { APP_DATA } from "../data/levels";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const colors = ["blue", "green", "orange"];

  return (
    <div className="dashboard">
      <h1 style={{
        fontSize: '2.5rem',
        color: 'var(--baby-pink, #ff99c8)',
        fontWeight: 900,
        textShadow: '2px 2px 0 var(--icy-blue, #a9def9), 4px 4px 0 var(--mauve, #e4c1f9), 6px 6px 8px rgba(0,0,0,0.10)',
        marginBottom: '1.5rem',
        animation: 'fadeInDown 1s'
      }}>My Quest</h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--frosted-mint, #d0f4de)',
        fontWeight: 600,
        marginBottom: '2.5rem',
        textShadow: '1px 1px 0 var(--icy-blue, #a9def9), 2px 2px 0 var(--mauve, #e4c1f9), 3px 3px 6px rgba(0,0,0,0.08)',
        animation: 'fadeInUp 1s'
      }}>This is your dashboard where you can track progress and continue your journey.</p>
      <div className="level-grid">
        {APP_DATA.map((level, idx) => {
          const colorClass = colors[idx % colors.length];
          return (
            <Link
              key={level.levelId}
              to={`/level/${level.levelId}`}
              className={`level-card ${colorClass}`}
            >
              <span className="level-id">{level.levelId}</span>
              <span>{`Start ${level.levelId}`}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
