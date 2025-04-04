import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProfilePage.css";
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/"); // Redirect to home if user logs out
      } else {
        setUser(JSON.parse(storedUser));
      }
    };

    window.addEventListener("storage", checkUser); // Listen for changes in localStorage

    return () => {
      window.removeEventListener("storage", checkUser); // Cleanup event listener
    };
  }, [navigate]);

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" />
          <h2>User Profile</h2>
        </div>
        {user ? (
          <div className="profile-details">
            <div className="profile-item">
              <FaUser className="icon" />
              <p><strong>Full Name:</strong> {user.fullName}</p>
            </div>
            <div className="profile-item">
              <FaUser className="icon" />
              <p><strong>Username:</strong> {user.name}</p>
            </div>
            <div className="profile-item">
              <FaEnvelope className="icon" />
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="profile-item">
              <FaPhone className="icon" />
              <p><strong>Phone Number:</strong> {user.phone}</p>
            </div>
          </div>
        ) : (
          <p className="loading-text">Loading user data...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
