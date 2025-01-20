import { useRouter } from "next/router";
import React, { useState } from "react";

const SellerSignUp: React.FC = () => {
  const [sellerType, setSellerType] = useState("individual");
  const router = useRouter(); // Initialize router

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f5f0",
    },
    form: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      width: "100%",
    },
    heading: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "1rem",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    sellerTypeContainer: {
      marginBottom: "15px",
    },
    sellerTypeOption: {
      marginRight: "10px",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#B864D4",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    console.log("Form submitted!"); // Add your form logic here

    // Redirect to the sellerpage
    router.push("/sellerpage"); // Replace with the actual route
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignUp}>
        <h2 style={styles.heading}>Seller Sign Up</h2>
        <label style={styles.label}>Full Name</label>
        <input type="text" placeholder="Full Name" style={styles.input} />

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Email" style={styles.input} />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Password" style={styles.input} />

        <label style={styles.label}>Phone Number</label>
        <input type="text" placeholder="Phone Number" style={styles.input} />

        <label style={styles.label}>Address</label>
        <input type="text" placeholder="Address" style={styles.input} />

        <div style={styles.sellerTypeContainer}>
          <label style={styles.label}>Seller Type</label>
          <label style={styles.sellerTypeOption}>
            <input
              type="radio"
              value="individual"
              checked={sellerType === "individual"}
              onChange={() => setSellerType("individual")}
            />
            Individual
          </label>
          <label style={styles.sellerTypeOption}>
            <input
              type="radio"
              value="cakeshop"
              checked={sellerType === "cakeshop"}
              onChange={() => setSellerType("cakeshop")}
            />
            Cake Shop
          </label>
        </div>
        
        <button type="submit" style={styles.button}>
          Sign Up as Seller
        </button>
      </form>
    </div>
  );
};

export default SellerSignUp;
