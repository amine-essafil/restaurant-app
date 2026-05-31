import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendReport } from "../../api/Report.api";

//ICONS
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const Contact = () => {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleQuickHelpClick = (type) => {
    switch (type) {
      case "order":
        navigate("/profile");
        break;
      case "menu":
        navigate("/menu");
        break;
      case "refunds":
        document
          .getElementById("contact-form")
          .scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        // Simulate form submission
        console.log("Form submitted:", formData);

        // Clear form
        setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        });

    try {
        const res = await sendReport(formData);
    } catch (error) {
        console.log(error);
    }
        
        // Show success message
        setShowSuccess(true);
    
        // Hide success message after 5 seconds
        setTimeout(() => {
        setShowSuccess(false);
        }, 5000);
    };

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
      
    <div className="contact-container">
        {/* Quick Help Cards */}
        <section className="quick-help-section">
          <h2 className="section-title">Quick Help</h2>
          <div className="quick-help-cards">
            <div
              className="help-card"
              onClick={() => handleQuickHelpClick("order")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleQuickHelpClick("order");
                }
              }}
            >
              <div className="card-icon order-icon">
                <SearchIcon />
              </div>
              <h3 className="card-title">Where is my order?</h3>
              <p className="card-description">
                Track your order status and delivery progress
              </p>
              <div className="card-arrow">→</div>
            </div>

            <div
              className="help-card"
              onClick={() => handleQuickHelpClick("menu")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleQuickHelpClick("menu");
                }
              }}
            >
              <div className="card-icon menu-icon">
                <MenuIcon />
              </div>
              <h3 className="card-title">Menu & Allergens</h3>
              <p className="card-description">
                Browse our menu and view allergen information
              </p>
              <div className="card-arrow">→</div>
            </div>

            <div
              className="help-card"
              onClick={() => handleQuickHelpClick("refunds")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleQuickHelpClick("refunds");
                }
              }}
            >
              <div className="card-icon refund-icon">
                <HeartIcon />
              </div>
              <h3 className="card-title">Refunds & Issues</h3>
              <p className="card-description">
                Get help with order issues and refund requests
              </p>
              <div className="card-arrow">→</div>
            </div>
          </div>
        </section>
        
       {/* Main Contact Section */}
        <section className="main-contact-section">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">
                We'll get back to you as soon as possible
              </p>

              {showSuccess && (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <div className="success-text">
                    <strong>Thank you!</strong> Our support team will call you
                    within 15 minutes.
                  </div>
                </div>
              )}

              <form
                id="contact-form"
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="General Question">General Question</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your question or issue in detail..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
           </div>
        </section>
     </div>
</div>
  );
};

export default Contact;