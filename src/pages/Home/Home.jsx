import React from "react";
import "./Home.css";

import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu"; // 

//importation of navbar and footer for later after i code them



const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Navbar at the top */}
      {/*<Navbar />*/}

      <main className="home-content">
        {/* 2. Header (offers section) */}
        <section id="offers">
          <Header />
        </section>

        {/* 3. Menu section — linked from Navbar */}
        <section
          id="menu"
          style={{
            minHeight: "100vh",
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Menu />
        </section>

      </main>
    </div>
  );
};

export default Home;
