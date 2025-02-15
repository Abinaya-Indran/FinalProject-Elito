"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TypedText from "../components/typedtext"; // Import animated text component

const images = [
  "/images/banner/1.png",
  "/images/banner/2.png",
  "/images/banner/3.png",
];

export default function Banner() {
  return (
    <div style={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
      >
        
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <motion.div
              style={styles.imageWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              
              <img src={src} alt={`Cake ${index + 1}`} style={styles.image} />
             
              <div style={styles.caption}>
                <h2 style={styles.typedText}>
                  <TypedText /> {/* Animated slogan */}
                </h2>
               
              </div>
              {/* Centered Button */}
              <div style={styles.buttonContainer}>
                <a href="/product">
                  <button style={styles.glowingButton as React.CSSProperties}>
                    Buy Now
                  </button>
                </a>
              </div>
              
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  container: {
    position: "relative" as const,
    width: "100%",
    maxWidth: "1800px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    // backgroundColor: "#262626",

    
  },
  imageWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "900px",
    overflow: "hidden",
    borderRadius: "16px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "16px",
  },
  caption: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 50px",
    borderRadius: "8px",
    textAlign: "left" as const,
  },
  typedText: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute" as const,
    bottom: "40px",
    width: "100%",
  },
  glowingButton: {
    marginTop: '5rem',
    padding: '15px 40px',
    fontSize: '30px',
    color: 'purple',
    fontWeight: "bold",
    backgroundColor: 'white', /* Dark gray background for a modern look */
    border: '2px solid purple', /* Red border for contrast */
    borderRadius: '50px', /* Modern rounded corners */
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 30px , 0 0 60px rgba(209, 15, 226, 0.6), 0 0 90px rgba(188, 4, 185, 0.5)', /* Enhanced glowing red shadows */
    transition: '0.3s ease-in-out, box-shadow 0.5s ease',
    animation: 'pulseGlow 1.5s ease-in-out infinite', /* Smooth pulse effect */
  },
  
  glowingButtonHover: {
    backgroundColor: ' #B864D4', /* Red background on hover */
    color: 'white',
    boxShadow: '0 0 80px  #B864D4, 0 0 120px  #B864D4, 0 0 180px  #B864D4', /* Stronger glowing effect */
    transform: 'translateY(-6px) scale(1.1)', /* Button moves up and scales slightly more for hover */
  },
  
  '@keyframes pulseGlow': {
    '0%': {
      boxShadow: '0 0 30px rgba(188, 4, 185, 0.7), 0 0 60px rgba(182, 4, 188, 0.6)',
    },
    '50%': {
      boxShadow: '0 0 60px rgba(185, 4, 188, 0.9), 0 0 90px rgba(188, 4, 182, 0.7)',
    },
    '100%': {
      boxShadow: '0 0 30px rgba(206, 16, 209, 0.7), 0 0 60px rgba(188, 4, 188, 0.6)',
    },
  },
};

