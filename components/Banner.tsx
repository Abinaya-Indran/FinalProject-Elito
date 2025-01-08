"use client";

import React from "react";

const Banner = () => {
  // JavaScript logic for carousel
  const slides = [
    { src: "/images/curousel1.webp", alt: "Offer 1" },
    { src: "/images/valentines.jpg", alt: "Offer 2" },
    { src: "/images/Adds.jpg", alt: "Offer 3" },
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
    const interval = setInterval(nextSlide, 3000); // Auto-play every 3 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Inline CSS styles
  const styles: Record<string, React.CSSProperties> = {
    banner: {
      position: "relative",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      overflow: "hidden",
    },
    carouselContainer: {
      position: "relative",
      width: "100%",
    },
    carouselSlide: {
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center" as "center",
      width: "100%",
    },
    carouselImage: {
      width: "100%",
      maxHeight: "500px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    discoverButton: {
      marginTop: "15px",
      padding: "10px 20px",
      backgroundColor: "#b864d4",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "18px",
      transition: "transform 0.3s ease",
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      fontSize: "20px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    },
    prevButton: {
      left: "10px",
    },
    nextButton: {
      right: "10px",
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
            <button
              style={styles.discoverButton}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Buy Now
            </button>
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
      </div>
    </div>
  );
};

export default Banner;
