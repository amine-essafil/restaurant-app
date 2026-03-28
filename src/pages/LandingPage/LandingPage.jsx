import React from "react";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import FanFavorites from "./components/FanFavorites";
import MeetTheChefs from "./components/MeetTheChefs";
import FinalCTA from "./components/FinalCTA";
import "./LandingPage.css";

const LandingPage = () => {

  return (
    <div className="landing-page">
      {/* Section 1: The Hero (The Hook) */}
      <HeroSection  />

      {/* Section 2: Why Choose Us? (The Trust) */}
      <WhyChooseUs/>

      {/* Section 3: This Week's Fan Favorites (The Food) */}
      <FanFavorites />

      {/* Section 4: Meet The Chefs (The People) */}
      <MeetTheChefs />

      {/* Section 5: Final Call to Action (The Action) */}
      <FinalCTA  />
    </div>
  );
};

export default LandingPage;