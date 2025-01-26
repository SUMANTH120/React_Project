import React from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  return (
    <nav className="hamburger-menu">
      <ul>
        <li>Home</li>
        <li>Consult a Doctor</li>
        <li>My Appointments</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
