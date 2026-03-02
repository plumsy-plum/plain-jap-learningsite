import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/dashboard" className="nav-link">My Quest</NavLink>
    <NavLink to="/category/hiragana" className="nav-link">Hiragana</NavLink>
    <NavLink to="/category/katakana" className="nav-link">Katakana</NavLink>
    <NavLink to="/category/kanji" className="nav-link">Kanji</NavLink>
    <NavLink to="/category/vocab" className="nav-link">Vocab</NavLink>
  </nav>
);

export default Navbar;
