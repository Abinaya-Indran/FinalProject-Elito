import React from "react";

const TrendingSale = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <p style={styles.newCollection}>New Collection</p>
        <h1 style={styles.title}>TRENDING SALE</h1>
        <p style={styles.description}>
          I’ll walk you through how to write a book "description", provide you a
          template and include
        </p>
      </div>

      {/* Buttons Section */}
      <div style={styles.buttonsContainer}>
        <button style={styles.activeButton}>BEST SALE</button>
        <button style={styles.inactiveButton}>NEW COLLECTIONS</button>
        <button style={styles.inactiveButton}>BEST COLLECTION</button>
      </div>

      {/* Products Grid */}
      <div style={styles.grid}>
        {products.map((product, index) => (
          <div key={index} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <p style={styles.productName}>{product.name}</p>
            <p style={styles.productPrice}>
              {product.discountedPrice ? (
                <>
                  <span style={styles.discountedPrice}>
                    ${product.discountedPrice}
                  </span>{" "}
                  <span style={styles.originalPrice}>${product.price}</span>
                </>
              ) : (
                `$${product.price}`
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const products = [
  {
    name: "Baked Lemon Cheesecake",
    price: 30.0,
    image: "https://via.placeholder.com/200",
  },
  {
    name: "Marble Cake",
    price: 35.0,
    image: "https://via.placeholder.com/200",
  },
  {
    name: "Lemon Coconut Cake",
    price: 23.0,
    discountedPrice: 20.0,
    image: "https://via.placeholder.com/200",
  },
  {
    name: "Traditional Fruitcake",
    price: 82.0,
    discountedPrice: 80.0,
    image: "https://via.placeholder.com/200",
  },
  // Add more products as needed
];

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  newCollection: {
    color: "#ff6d88",
    fontSize: "18px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    color: "#666",
    fontSize: "16px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  activeButton: {
    backgroundColor: "#ff6d88",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  inactiveButton: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "1px solid #ddd",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  productName: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#ff6d88",
  },
  discountedPrice: {
    fontWeight: "bold",
    color: "#ff6d88",
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#999",
    marginLeft: "5px",
  },
};

export default TrendingSale;
