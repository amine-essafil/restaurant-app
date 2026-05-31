import React from "react";


const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop&crop=center"
            alt="FoodExpress Restaurant Interior"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">How can we help you today?</h1>
          <p className="hero-subtitle">
            We're here for you, ready to assist with any questions or concerns
          </p>
        </div>
      </section>

    </div>
  );
};

export default Contact;