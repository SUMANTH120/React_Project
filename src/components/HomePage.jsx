import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import "./HomePage.css";

const HomePage = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="home-page">
      <HamburgerMenu />
      <h1>Welcome, {username}!</h1>
      <p>Start your online doctor consultation journey.</p>
    </div>
  );
};

export default HomePage;
