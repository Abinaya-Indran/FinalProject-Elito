"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  "/images/1.png",
  "/images/pexels-anete-lusina-18613267.jpg",
  "/images/pexels-photo-8554892.webp",
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                <h2>{`Cake ${index + 1}`}</h2>
                <p>Delicious cakes for your sweet moments!</p>
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
    bottom: "20px",
    left: "20px",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 20px",
    borderRadius: "8px",
    textAlign: "left" as const,
  },
};
