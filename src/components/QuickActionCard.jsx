import React from "react";
import "./QuickActionCard.css";

const QuickActionCard = ({ title, description, link }) => {
  return (
    <div className="quick-action-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>Explore</a>
    </div>
  );
};

export default QuickActionCard;
