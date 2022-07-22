import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="NavBar">
      <h1>🎅 Idées Cadeaux 🎁</h1>
      <div className="NavBarLink">
        <Link to="/">
          <p>Accueil</p>
        </Link>
        <Link to="/Form">
          <p>Formulaire</p>
        </Link>
        <Link to="/Proches">
          <p>Proches</p>
        </Link>
      </div>
    </div>
  );
}
