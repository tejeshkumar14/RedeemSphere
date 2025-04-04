import React from 'react';
import './Navbar.css';
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyLogo from '../assets/RedeemSphere.jpg';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    axios.get("http://localhost:9999/auth/user", { withCredentials: true })
      .then(response => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      });
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:9999/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");

        // Dispatch a storage event to notify other components
        window.dispatchEvent(new Event("storage"));

        // Redirect to home
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  return (
    <header className="header">
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={CompanyLogo} alt="Redeem Sphere Logo" id="logo" />
      </div>
      <nav id="linksContainer">
        <ul>
          <li> <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink> </li>
          <li> <NavLink to="/coupons" className={({ isActive }) => (isActive ? "active" : "")}>Coupons</NavLink> </li>
          <li> <NavLink to="/offer" className={({ isActive }) => (isActive ? "active" : "")}>Offer</NavLink> </li>
          <li> <NavLink to="/help" className={({ isActive }) => (isActive ? "active" : "")}>Help</NavLink> </li>
          {user ? (
            <li> <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>{user.name}</NavLink></li>
          ) : (
            <li> <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink> </li>
          )}
          {user ? (<li> <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "" : "")}>Logout</NavLink> </li>) : ("")}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
