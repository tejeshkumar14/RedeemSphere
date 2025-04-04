import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './HelpPage.css'
const HelpPage = () => {
  return (
      <div className="help-container">
      <Navbar />
      <div className="help-content">
        <h2>Help & Support</h2>
        
        <section className="faq">
          <h3>Frequently Asked Questions</h3>
          <div className="question">
            <h4>How do I redeem a coupon?</h4>
            <p>To redeem a coupon, go to the Coupons page, select a coupon, and use the provided code at the respective store.</p>
          </div>
          <div className="question">
            <h4>How do I post a coupon?</h4>
            <p>Go to the Offer section, fill in the required details, and submit your coupon.</p>
          </div>
          <div className="question">
            <h4>Is there a limit to how many coupons I can post?</h4>
            <p>No, you can post as many coupons as you want, as long as they are valid.</p>
          </div>
          <div className="question">
            <h4>Do coupons expire?</h4>
            <p>Yes, each coupon has an expiration date. Make sure to use it before the expiry date.</p>
          </div>

          <div className="question">
            <h4>Can I delete a coupon after posting it?</h4>
            <p>Currently, you cannot delete a coupon once it's posted. Contact support for assistance if needed.</p>
          </div>

          <div className="question">
            <h4>Are all coupons verified?</h4>
            <p>Coupons are submitted by users, and while we encourage authenticity, we recommend checking details before using.</p>
          </div>

          <div className="question">
            <h4>Do I need an account to post a coupon?</h4>
            <p>Yes, you must be logged in to post or redeem coupons.</p>
          </div>

          <div className="question">
            <h4>How do I report an invalid coupon?</h4>
            <p>If a coupon is invalid, click the 'Report' button on the coupon page or contact support.</p>
          </div>

          <div className="question">
            <h4>Can I share my coupons with others?</h4>
            <p>Yes! You can share the coupon code with friends or through social media directly from our platform.</p>
          </div>
        </section>

        <section className="contact">
          <h3>Contact Support</h3>
          <p>If you need further assistance, email us at <strong>support@redeemsphere.com</strong> or call <strong>+91 9876543210</strong>.</p>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default HelpPage;