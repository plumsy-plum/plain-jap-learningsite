import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/dashboard" className="nav-link">My Quest</NavLink>
  </nav>
);

export default Navbar;
