"use client";

import React, { useState } from "react";
import Link from "next/link";
import TypedText from "./typedtext"; // Ensure this component exists

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={styles.heroSection}>
      {/* Left Content */}
      <div style={styles.textContainer}>
        <h1 style={styles.headingPrimary}>Delicious</h1>
        <h2 style={styles.headingSecondary}>Cakes For You</h2>
        <p style={styles.description}>
          <span style={styles.typedText}>
            <TypedText />
          </span>
          <br />
        </p>
        <br/>
        {/* Glowing Button */}
        <Link href="/product" passHref>
        <button
          style={{
            ...styles.glowingButton,
            ...(isHovered ? styles.glowingButtonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Shop Now
        </button>
        </Link>
      </div>

      {/* Right Image */}
      <div style={styles.imageContainer}>
        <img
          src="/images/cake-8988890_640-removebg-preview (1).png"
          alt="Cake"
          style={styles.image}
        />
      </div>
    </section>
  );
};

// CSS-in-JS styles
const styles: { [key: string]: React.CSSProperties } = {
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "50px 10%",
    backgroundColor: "#F7F7F7",
    minHeight: "30vh",
    fontFamily: "Poppins, sans-serif",
    flexWrap: "wrap",
  },
  textContainer: {
    maxWidth: "500px",
    flex: 1,
  },
  headingPrimary: {
    color: "#C14679",
    fontSize: "90px",
    fontWeight: "600",
    fontFamily: "'Great Vibes', cursive",
    fontStyle: "normal",
    marginBottom: "5px",
  },
  headingSecondary: {
    color: "#262626",
    fontSize: "44px",
    fontWeight: "700",
  },
  description: {
    color: "#666",
    fontSize: "18px",
    marginTop: "15px",
    lineHeight: "1.6",
  },
  typedText: {
    color: "#C14679",
    fontSize: "50px",
    // fontWeight: "600",
    // fontStyle: "italic",
  },
  glowingButton: {
    marginTop: "25px",
    padding: "12px 24px",
    fontSize: "25px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#C14679",
    border: "2px solid #C14679",
    borderRadius: "30px",
    cursor: "pointer",
    outline: "none",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(193, 70, 121, 0.6), 0 0 60px rgba(193, 70, 121, 0.5)",
    transition: "0.3s ease-in-out, box-shadow 0.5s ease",
    animation: "pulseGlow 1.5s ease-in-out infinite",
  },
  glowingButtonHover: {
    backgroundColor: " #C14679",
    boxShadow: "0 0 80px  #C14679, 0 0 120px  #C14679, 0 0 180px  #C14679",
    transform: "scale(1.05)",
  },
  imageContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "700px",
  },
};

// Add keyframes for glowing effect (Inject in global CSS)
const glowKeyframes = `
  @keyframes pulseGlow {
    0% { boxShadow: "0 0 30px rgba(193, 70, 121, 0.7), 0 0 60px rgba(193, 70, 121, 0.6)"; }
    50% { boxShadow: "0 0 60px rgba(193, 70, 121, 0.9), 0 0 90px rgba(193, 70, 121, 0.7)"; }
    100% { boxShadow: "0 0 30px rgba(206, 16, 209, 0.7), 0 0 60px rgba(193, 70, 121, 0.6)"; }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = glowKeyframes;
  document.head.appendChild(styleSheet);
}

export default Hero;
