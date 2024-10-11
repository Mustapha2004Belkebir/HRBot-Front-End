import React from "react";
import { Link } from "react-router-dom";
import "./OBheader.css";
import logo from "../assets/images/Logo.png";

function OBheader() {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-main">
          <div className="navbar-logo">
            <img src={logo} className="logo" alt="logo" />
            <div className="slogon">HRBot</div>
          </div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Features
            </Link>
            <Link to="/" className="navbar-link">
              About Us
            </Link>
            <Link to="/" className="navbar-link">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="navbar-buttons">
          <Link to="/login" className="login-button">
            <div>LogIn</div>
          </Link>
          <Link to="/whoAreYou" className="join-button">
            <div>Join Now</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OBheader;
