import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="The Chick Centric" />
        </Link>
        <Link to="/">
          <h3>Home</h3>
        </Link>
      </div>
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fas fa-cart-plus" />
        </Link>
      </div>
    </nav>
  );
}
