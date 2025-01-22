"use client";

import React from "react";
import Link from "next/link";

const Banner = () => {
  const slides = [
    { src: "/images/curousel1.webp", alt: "Offer 1" },
    { src: "/images/cakebanner2.webp", alt: "Offer 2" },
    { src: "/images/cakebanner1.jpg", alt: "Offer 3" },
  ];

  let currentIndex = 0;

  const showSlide = (index: number) => {
    const slides = document.querySelectorAll<HTMLElement>(".carousel-slide");
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none";
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  React.useLayoutEffect(() => {
    showSlide(currentIndex); // Show the first slide
    const interval = setInterval(nextSlide, 5000); // Auto-play every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    banner: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    carouselContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    carouselSlide: {
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    carouselImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    discoverButton: {
      position: "absolute",
      bottom: "30px", // Positioned at the bottom
      left: "50%", // Center horizontally
      transform: "translateX(-50%)", // Align to the center
      padding: "15px 30px",
      backgroundColor: "#b864d4",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for better visibility
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      border: "none",
      padding: "15px",
      cursor: "pointer",
      fontSize: "24px",
      borderRadius: "50%",
      transition: "background-color 0.3s ease",
    },
    prevButton: {
      left: "20px",
    },
    nextButton: {
      right: "20px",
    },
  };

  return (
    <div style={styles.banner}>
      <div style={styles.carouselContainer}>
        {slides.map((slide, index) => (
          <div
            className="carousel-slide"
            key={index}
            style={styles.carouselSlide}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={styles.carouselImage}
            />
           
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          style={{ ...styles.navButton, ...styles.prevButton }}
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          style={{ ...styles.navButton, ...styles.nextButton }}
          onClick={nextSlide}
        >
          &#10095;
        </button>
        <button
              style={styles.discoverButton}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
             <Link href="/cakedetails">Buy Now</Link>
            </button>
      </div>
    </div>
  );
};

export default Banner;
