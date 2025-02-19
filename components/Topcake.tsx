"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";

const TopCake = () => {
  const [cakes, setCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/Product")
      .then((res) => res.json())
      .then((data) => {
        setCakes(data.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cakes:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (cake: any) => {
    const updatedCart = [...cart, cake];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setMessage("Added to cart!");

    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.pageTitle}>Top Cakes</h2>

      {message && (
        <div style={styles.messageBox}>
          <p style={styles.message}>{message}</p>
        </div>
      )}

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

                {/* Rating
                <div style={styles.ratings}>
                  {[...Array(5)].map((_, index) => (
                    index < (cake.rating || 0) ? 
                    <FaStar key={index} style={styles.star} /> : 
                    <FaRegStar key={index} style={styles.star} />
                  ))}
                </div> */}

                <div style={styles.buttonsContainer}>
                  <Link href={`/product/${cake._id}`}>
                    <button style={styles.viewDetails} className="hover-button">View Details</button>
                  </Link>
                  <button
                    style={styles.cartButton}
                    onClick={() => addToCart(cake)}
                    className="cart-button"
                  >
                    <FaShoppingCart />
                  </button>
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
            // transform: translateY(-10px);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
          }
          .hover-button:hover {
            background-color: #A13A66 !important;
            transform: scale(1.05);
          }
         
          .cart-button:hover {
            transform: scale(1.2);
            color: #A13A66;
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
    backgroundColor: "#F7F7F7",
    fontFamily: "poppins, sans-serif",
  },
  pageTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
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
    backgroundColor: "#F7F7F7",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    margin: "0 auto",
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
    // background: "linear-gradient(145deg, #C64B8C,#C64B8C)",
  },
  productName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#262626",
    marginBottom: "0.5rem",
    fontFamily: "poppins, sans-serif",
  },
  productPrice: {
    fontSize: "1.0rem",
    color: "#C14679",
    fontWeight: "700",
    marginBottom: "0.5rem",
    fontFamily: "poppins, sans-serif",
  },
  ratings: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  star: {
    color: "black",
    fontSize: "1.2rem",
    marginRight: "0.2rem",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  viewDetails: {
    backgroundColor: "#C14679",
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
  
  cartButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.6rem",
    color: "#C14679",
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
    backgroundColor: "#C14679",
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
  messageBox: {
    textAlign: "center",
    marginBottom: "1rem",
    backgroundColor: "#e0f7fa",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  },
  message: {
    fontSize: "1.2rem",
    color: "#00796b",
  },
};

export default TopCake;
