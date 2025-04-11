import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HelpPage.css';

const HelpPage = () => {
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue.trim()) {
      console.log("Submitted Issue:", issue); // Replace with actual backend POST request
      setSubmitted(true);
      setIssue("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="help-container">
      <Navbar />
      <div className="help-content">
        <h2>Need Help?</h2>
        <p className="intro-text">Tell us about your problem and we'll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit} className="help-form">
          <textarea
            placeholder="Describe your issue here..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows="8"
            required
          />
          <button type="submit">Submit Issue</button>
        </form>

        {submitted && <div className="thank-you">Thank you for submitting your issue. We'll get back to you soon!</div>}

        <div className="contact-box">
          <h3>Other Ways to Reach Us</h3>
          <p><strong>Email:</strong> support@redeemsphere.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Live Chat:</strong> Coming soon!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;