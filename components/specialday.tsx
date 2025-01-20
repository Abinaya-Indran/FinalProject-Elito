import React from "react";

const SpecialDay = () => {
  return (
    <div style={styles.container}>
      {/* Left Section with Image */}
      <div style={styles.leftSection}>
        <img
          src="/images/cupcakes.jpg" // Replace with your image URL
          alt="Donuts"
          style={styles.mainImage}
        />
      </div>

      {/* Right Section with Text */}
      <div style={styles.rightSection}>
        <h1 style={styles.title}>For most special day</h1>
        <p style={styles.subtitle}>
          Nulla aliquet porttitor lacus luctus accumsan tortor.
        </p>
        <div style={styles.details}>
          <p>
            <strong style={styles.highlight}>250+</strong> Outlets
          </p>
          <p>
            <strong style={styles.highlight}>Bakery made</strong>
          </p>
          <p>
            <strong style={styles.highlight}>150+</strong> Recipes
          </p>
        </div>
      </div>

      {/* Circular Donuts for Decoration */}
      <img
        src="/images/cupcake-1.webp" // Replace with actual donut image
        alt="Donut"
        style={{ ...styles.circularDonut, ...styles.donutTopRight }}
      />
      <img
        src="/images/cupcake-2.webp" // Replace with actual donut image
        alt="Donut"
        style={{ ...styles.circularDonut, ...styles.donutBottomRight }}
      />
      <img
        src="/images/cupcake-3.jpg" // Replace with actual donut image
        alt="Donut"
        style={{ ...styles.circularDonut, ...styles.donutBottomLeft }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px",
    backgroundColor: "#ffe9ec",
    position: "relative",
    borderRadius: "15px",
    // color:'#B864D4'
  },
  leftSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  mainImage: {
    borderRadius: "15px",
    width: "400px",
    objectFit: "cover",
  },
  rightSection: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    color: "#e8505b",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px",
  },
  details: {
    fontSize: "20px",
    color: "#e8505b",
    fontWeight: "bold",
    lineHeight: "2",
  },
  highlight: {
    fontSize: "24px",
    color: "#e8505b",
    fontWeight: "bold",
  },
  circularDonut: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
  donutTopRight: {
    top: "-50px",
    right: "50px",
  },
  donutBottomRight: {
    bottom: "-50px",
    right: "150px",
  },
  donutBottomLeft: {
    bottom: "-50px",
    left: "50px",
  },
};

export default SpecialDay;
