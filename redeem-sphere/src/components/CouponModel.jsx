import React, { useState } from "react";
import "./CouponModel.css";

const CouponModel = ({ coupon, onClose }) => {
  if (!coupon) return null;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const maskedCode = "#".repeat(coupon.code.length - 2) + coupon.code.slice(-2);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleBuyNow = async () => {
    if (!currentUser) {
      setError("Please log in to buy this coupon.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/api/coupons/${coupon._id}/buy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: currentUser.name }),
      });

      if (response.ok) {
        setSuccess("Coupon purchased successfully!");
        setError("");
        setTimeout(() => {
          onClose(); // Close after 2s
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to purchase coupon");
        setSuccess("");
      }
    } catch (error) {
      console.error("Buy error:", error);
      setError("Error occurred while buying the coupon.");
      setSuccess("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✖</button>

        <h2 className="modal-title">{coupon.title}</h2>

        <div className="modal-info">
          <p><span>Description:</span> {coupon.description}</p>
          <p><span>Company Name:</span> {coupon.companyName}</p>
          <p><span>Company Link:</span> <a href={coupon.companyLink} target="_blank" rel="noopener noreferrer">{coupon.companyLink}</a></p>
          <p><span>Expires:</span> {new Date(coupon.expiry).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
          <p><span>Redeem Code:</span> {maskedCode}</p>
        </div>

        <button className="modal-buy" onClick={handleBuyNow}>Buy Now</button>

        {error && <p className="modal-error">{error}</p>}
        {success && <p className="modal-success">{success}</p>}
      </div>
    </div>
  );
};

export default CouponModel;
