import React from "react";

const Shops: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>OUR SHOPS</h2>
      <div style={styles.iconWrapper}>
        <span style={styles.icon}>🧁</span>
      </div>
      <div style={styles.cardContainer}>
        {["Chef 1", "Chef 2", "Chef 3", "Chef 4"].map((chef, index) => (
          <div key={index} style={styles.card}>
            <img
              src={`/chef${index + 1}.jpg`}
              alt={`Chef ${index + 1}`}
              style={styles.image}
            />
            <h4 style={styles.title}>FORMAL SHOES</h4>
            <p style={styles.subtitle}>Top Collections</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#fff6f6",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#000",
  },
  iconWrapper: {
    fontSize: "24px",
    color: "#e75480",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "40px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "200px",
    textAlign: "center",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #ff9090",
    objectFit: "cover" as const,
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
  },
};

export default Shops;
