import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/hiragana" className="nav-link">Hiragana</NavLink>
    <NavLink to="/katakana" className="nav-link">Katakana</NavLink>
    <NavLink to="/kanji" className="nav-link">Kanji</NavLink>
  </nav>
);

export default Navbar;
