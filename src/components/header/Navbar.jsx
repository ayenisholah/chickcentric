import React from "react";
import Burger from "./Burger";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h3>The Chick Centric</h3>
      </div>
      <Burger />
    </nav>
  );
}
