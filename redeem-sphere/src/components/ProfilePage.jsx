import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProfilePage.css";
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [allCoupons, setAllCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/");
      } else {
        setUser(JSON.parse(storedUser));
      }
    };

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:9999/api/coupons")
      .then(res => res.json())
      .then(data => setAllCoupons(data))
      .catch(err => console.error("Failed to fetch coupons", err));
  }, []);

  const couponsOnSale = allCoupons.filter(c => c.username === user?.name && c.status === "onSale");
  const couponsSold = allCoupons.filter(c => c.username === user?.name && c.status === "sold");
  const couponsBought = allCoupons.filter(c => c.boughtBy === user?.name && c.status === "bought");

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
            <div className="profile-item"><FaUser className="icon" /><p><strong>Full Name:</strong> {user.fullName}</p></div>
            <div className="profile-item"><FaUser className="icon" /><p><strong>Username:</strong> {user.name}</p></div>
            <div className="profile-item"><FaEnvelope className="icon" /><p><strong>Email:</strong> {user.email}</p></div>
            <div className="profile-item"><FaPhone className="icon" /><p><strong>Phone Number:</strong> {user.phone}</p></div>

            <div className="coupon-category">
              <h3>Coupons On Sale</h3>
              {couponsOnSale.map(c => (
                <div key={c._id} className="coupon-box">
                  <p><strong>Title:</strong> {c.title}</p>
                  <p><strong>Company:</strong> {c.companyName}</p>
                  <p><strong>Expiry:</strong> {new Date(c.expiry).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              ))}

              <h3>Coupons Bought</h3>
              {couponsBought.map(c => (
                <div key={c._id} className="coupon-box">
                  <p><strong>Title:</strong> {c.title}</p>
                  <p><strong>Company:</strong> {c.companyName}</p>
                  <p><strong>Posted by:</strong> {c.username}</p>
                </div>
              ))}

              <h3>Coupons Sold</h3>
              {couponsSold.map(c => (
                <div key={c._id} className="coupon-box">
                  <p><strong>Title:</strong> {c.title}</p>
                  <p><strong>Company:</strong> {c.companyName}</p>
                  <p><strong>Bought by:</strong> {c.boughtBy}</p>
                </div>
              ))}
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