"use client";

import React from "react";
import Link from 'next/link';

const Cakedetails = () => {
  return (
    <section style={styles.container}>
      {/* Product Image */}
      <div style={styles.productImage}>
        <img src="/images/Black and gold cake .jpeg" alt="Black and Gold Cake" style={styles.image} />
      </div>

      {/* Product Details */}
      <div style={styles.details}>
        <h1 style={styles.title}>Black and Gold Cake</h1>
        <p style={styles.price}>Rs 3000 - Rs 4500</p>

        {/* Size Options */}
        <div style={styles.sizeOptions}>
          <label style={styles.label}>Size:</label>
          <div style={styles.sizeButtonGroup}>
            <button style={styles.sizeButton}>500g</button>
            <button style={styles.sizeButton}>1kg</button>
            <button style={styles.sizeButton}>2kg</button>
            <button style={styles.sizeButton}>3kg</button>
          </div>
        </div>

        {/* Surprise Option */}
        <div style={styles.surpriseOption}>
          <input type="checkbox" id="surprise" name="surprise" />
          <label htmlFor="surprise" style={styles.checkboxLabel}>
            Surprise Delivery (+1000 Rs)
          </label>
        </div>

        {/* Personalized Icing Message */}
        <div>
          <input type="text" placeholder="Personalized Icing Message" style={styles.input} />
        </div>

        {/* Add to Cart Section */}
        <div style={styles.addToCart}>
          <Link href="/order" passHref>
            <button style={styles.cartButton}>Buy Now</button>
          </Link>
        </div>

      </div>
    </section>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    width: "90%",
    maxWidth: "1200px",
    gap: "70px",
    fontSize: "20px",
    margin: " 80px auto",
    marginTop: "80px",
    fontFamily: "'Times New Roman', Times, serif", // Use Times New Roman globally
    backgroundColor: "#fdfdfd",
    padding: "50px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  productImage: {
    width: "300px",
    // height: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "10px",
    border: "2px solid #ccc",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  price: {
    fontSize: "22px",
    color: "#555",
  },
  sizeOptions: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  sizeButtonGroup: {
    display: "flex",
    gap: "10px",
  },
  sizeButton: {
    padding: "10px 20px",
    background: "#f9f9f9",
    border: "2px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    fontFamily: "'Times New Roman', Times, serif",
  },
  sizeButtonHover: {
    backgroundColor: "#B864D4",
    color: "white",
  },
  surpriseOption: {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkboxLabel: {
    fontSize: "16px",
    fontFamily: "'Times New Roman', Times, serif",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
    fontFamily: "'Times New Roman', Times, serif",
  },
  addToCart: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    marginTop: "20px",
  },
  cartButton: {
    backgroundColor: "#B864D4",
    color: "white",
    padding: "12px 20px",
    border: "none",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    fontFamily: "'Times New Roman', Times, serif",
  },
};

export default Cakedetails;
