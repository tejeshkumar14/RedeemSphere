import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./OffersPage.css";

const OffersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    title: "",
    code: "",
    description: "",
    companyName: "",     // New field
    companyLink: "",
    expiry: "",
  });
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showPopup("You must log in to post a coupon.", "error");
      return;
    }

    const couponData = {
      title: newCoupon.title,
      code: newCoupon.code,
      description: newCoupon.description,
      companyName: newCoupon.companyName, // Include company name
      companyLink: newCoupon.companyLink,
      expiry: new Date(newCoupon.expiry).toISOString().split("T")[0],
      username: user.name,
    };

    try {
      const response = await fetch("http://localhost:9999/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(couponData),
      });

      if (response.ok) {
        const savedCoupon = await response.json();
        setCoupons([...coupons, savedCoupon]);
        setNewCoupon({
          title: "",
          code: "",
          description: "",
          companyName: "",
          companyLink: "",
          expiry: "",
        });
        showPopup("Coupon posted successfully!", "success");
      } else {
        const errorText = await response.json();
        showPopup(`Failed to post coupon: ${errorText.error}`, "error");
      }
    } catch (error) {
      showPopup("Error posting coupon.", "error");
      console.error("Error:", error);
    }
  };

  const showPopup = (message, type) => {
    setPopup({ visible: true, message, type });
    setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 3000);
  };

  return (
    <div className="offers-container">
      <Navbar />
      <div className="offer-form-container">
        <h2>Post a New Coupon</h2>
        <form onSubmit={handleSubmit} className="offer-form">
          <input
            type="text"
            name="title"
            placeholder="Coupon Title"
            value={newCoupon.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Coupon Description"
            value={newCoupon.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={newCoupon.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="companyLink"
            placeholder="Company Website Link"
            value={newCoupon.companyLink}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiry"
            value={newCoupon.expiry}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
          <button type="submit">Post Coupon</button>
        </form>

        {popup.visible && (
          <div className={`popup-box ${popup.type}`}>
            {popup.message}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OffersPage;
