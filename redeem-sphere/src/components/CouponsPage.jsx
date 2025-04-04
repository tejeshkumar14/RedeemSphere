import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CouponsPage.css";
import CouponModel from "./CouponModel";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/coupons");
        let data = await response.json();
    
        // Get current date in YYYY-MM-DD format (local timezone)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of the day
    
        // Filter valid (non-expired) coupons
        const validCoupons = data.filter(coupon => {
          const expiryDate = new Date(coupon.expiry);
          expiryDate.setHours(0, 0, 0, 0); // Normalize to start of the day
          return expiryDate >= today; // Compare properly
        });
    
        setCoupons(validCoupons);
    
        // Collect expired coupons
        const expiredCoupons = data.filter(coupon => {
          const expiryDate = new Date(coupon.expiry);
          expiryDate.setHours(0, 0, 0, 0);
          return expiryDate < today;
        });

    
        // Delete expired coupons
        await Promise.all(expiredCoupons.map(async (coupon) => {
          try {
            const deleteResponse = await fetch(`http://localhost:9999/api/coupons/${coupon._id}`, {
              method: "DELETE",
            });
    
            if (!deleteResponse.ok) {
              console.error(`Failed to delete coupon: ${coupon._id}`);
            }
          } catch (error) {
            console.error("Error deleting expired coupon:", error);
          }
        }));
    
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
  
    fetchCoupons();
  }, []);
  

  return (
    <div className="couponsPage-container">
      <Navbar />
      <main className="couponsPage-grid">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="couponsPage-card">
            <h2>{coupon.title}</h2>
            <p>
              Code: <span>
                {"#".repeat(coupon.code.length - 2) + coupon.code.slice(-2)}
              </span>
            </p>
            <p>Expires: {new Date(coupon.expiry).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <button className="couponButton" onClick={() => setSelectedCoupon(coupon)}>Redeem</button>
          </div>
        ))}
      </main>
      <Footer />
      {selectedCoupon && <CouponModel coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />}
    </div>
  );
};

export default CouponsPage;