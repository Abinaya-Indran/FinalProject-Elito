"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TypedText from "./typedtext"; // Ensure this component exists
import Image from "next/image";

const Hero = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <HeroSlide
          title="Delicious"
          subtitle="Cakes For You"
          imgSrc="/images/cake-8988890_640-removebg-preview (1).png"
        />
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <HeroSlide
          title="Celebrate"
          subtitle="Every Moment with Cakes"
          imgSrc="/images/pink-9014358_640-removebg-preview.png" // Change this to another cake image
        />
      </SwiperSlide>
    </Swiper>
  );
};

const HeroSlide = ({ title, subtitle, imgSrc }: { title: string; subtitle: string; imgSrc: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={styles.heroSection}>
      {/* Left Content */}
      <div style={styles.textContainer}>
        <h1 style={styles.headingPrimary}>{title}</h1>
        <h2 style={styles.headingSecondary}>{subtitle}</h2>
        <br />
        <p style={styles.description}>
          <span style={styles.typedText}>
            <TypedText />
          </span>
          <br />
        </p>
        <br /><br />
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
        <Image src={imgSrc} alt="Cake" style={styles.image} width={500} height={700}/>
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
    paddingTop: "50px",
    backgroundColor: "#F7F7F7",
    minHeight: "30vh",
    fontFamily: "Poppins, sans-serif",
    flexWrap: "wrap",
  },
  textContainer: {
    maxWidth: "600px",
    flex: 1,
  },
  headingPrimary: {
    color: "#C14679",
    fontSize: "90px",
    fontWeight: "600",
    fontFamily: "'Great Vibes', cursive",
    fontStyle: "normal",
  },
  headingSecondary: {
    color: "#262626",
    fontSize: "44px",
    fontWeight: "700",
  },
  description: {
    color: "#666",
    fontSize: "15px",
    lineHeight: "1.4",
  },
  typedText: {
    color: "#C14679",
    fontSize: "30px",
    fontStyle: "italic",
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

export default Hero;
