"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa"; // ❤️ Favorite icon

const TopCake = () => {
  const [cakes, setCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/Product") // Adjust the API route accordingly
      .then((res) => res.json())
      .then((data) => {
        setCakes(data.slice(0, 8)); // Show only first 8 cakes
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cakes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.pageTitle}>Top Cakes</h2>

      {loading ? (
        <p style={styles.loadingMessage}>Loading cakes...</p>
      ) : cakes.length > 0 ? (
        <div style={styles.productGrid}>
          {cakes.map((cake) => (
            <div key={cake._id} style={styles.productCard} className="product-card">
              <img
                src={cake.image || "/default-image.jpg"}
                alt={cake.name || "Unnamed Cake"}
                style={styles.productImage}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.productName}>{cake.name || "Unnamed Cake"}</h3>
                <p style={styles.productPrice}>LKR {cake.price || "N/A"}</p>
                <div style={styles.buttonsContainer}>
                  <Link href={`/product/${cake._id}`}>
                    <button style={styles.viewDetails} className="hover-button">View Details</button>
                  </Link>
                  <Link href="/yourcart">
                  <button
                    style={styles.favButton}
                    onClick={() => console.log(`Added ${cake.name} to favorites`)}
                    className="fav-button"
                  >
                    <FaHeart />
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noCakesMessage}>No cakes available</p>
      )}

      <div style={styles.viewMoreContainer}>
        <Link href="/product">
          <button style={styles.viewMoreButton} className="hover-button">View More Cakes</button>
        </Link>
      </div>

      {/* Global Styles for Hover Effects */}
      <style>
        {`
          .product-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
          }
          .hover-button:hover {
            background-color: #9b50b2 !important;
            transform: scale(1.05);
          }
          .fav-button:hover {
            transform: scale(1.2);
            color: red;
          }
        `}
      </style>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    padding: "2rem",
    backgroundColor: "#f7f7f7",
    fontFamily: "poppins, sans-serif",
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#b864d4",
    marginBottom: "2rem",
    fontFamily: "poppins, sans-serif",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "3rem",
    justifyItems: "center",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
    
  },
  productImage: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderBottom: "1px solid #e2e2e2",
  },
  cardContent: {
    padding: "1rem",
    background: "linear-gradient(145deg, #f7f7f7, #ffffff)",
    
  },
  productName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "0.5rem",
    fontFamily: "poppins, sans-serif",
  },
  productPrice: {
    fontSize: "1.3rem",
    color: "#b864d4",
    fontWeight: "700",
    marginBottom: "0.5rem",
    fontFamily: "poppins, sans-serif",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  viewDetails: {
    backgroundColor: "#b864d4",
    color: "white",
    fontFamily: "poppins, sans-serif",
    fontSize: "1rem",
    fontWeight: "700",
    padding: "0.95rem 3.5rem",
    border: "none",
    borderRadius: "0.5rem",
    flexGrow: 1,
    transition: "background-color 0.3s ease, transform 0.3s ease",
    cursor: "pointer",
  },
  favButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "#b864d4",
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#777",
  },
  noCakesMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#777",
  },
  viewMoreContainer: {
    textAlign: "center",
    marginTop: "3rem",
  },
  viewMoreButton: {
    backgroundColor: "blue",
    color: "white",
    margin: "20px auto",
    fontFamily: "poppins, sans-serif",
    fontSize: "1.2rem",
    fontWeight: "700",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
};

export default TopCake;
