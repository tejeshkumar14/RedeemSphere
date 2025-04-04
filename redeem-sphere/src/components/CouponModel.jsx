import React from "react";
import "./CouponModel.css";

const CouponModel = ({ coupon, onClose }) => {
  if (!coupon) return null;

  const maskedCode = "#".repeat(coupon.code.length - 2) + coupon.code.slice(-2);

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

        <button className="modal-buy">Buy Now</button>
      </div>
    </div>
  );
};

export default CouponModel;
