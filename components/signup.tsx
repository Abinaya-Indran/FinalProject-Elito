import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Correct import from next/link

const SignUp: React.FC = () => {
  const [role, setRole] = useState("buyer");
  const router = useRouter();

  const styles = {
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
    roleContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
    },
    roleButton: (isActive: boolean) => ({
      padding: "10px 20px",
      borderRadius: "4px",
      border: `1px solid ${isActive ? "#4caf50" : "#ddd"}`,
      backgroundColor: isActive ? "#B864D4" : "#fff",
      color: isActive ? "#fff" : "#333",
      cursor: "pointer",
      flex: 1,
      textAlign: "center",
      margin: "0 5px",
      fontSize: "1rem",
    }),
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
    link: {
      display: "block",
      marginTop: "15px",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#B864D4",
      textDecoration: "none",
    },
  };

  const handleSignUp = () => {
    if (role === "seller") {
      router.push("/seller-signup");
    } else {
      alert("Buyer sign-up logic goes here");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.roleContainer}>
          <button
            type="button"
            style={styles.roleButton(role === "buyer")}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
          {/* Use Next.js Link for Seller Button */}
          <Link href="/sellersignup" passHref>
            <button
              type="button"
              style={styles.roleButton(role === "seller")}
              onClick={() => setRole("seller")}
            >
              Seller
            </button>
          </Link>
        </div>

        <h2 style={styles.heading}>Sign Up</h2>
        <label style={styles.label}>Full Name</label>
        <input type="text" placeholder="Full Name" style={styles.input} />

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Email" style={styles.input} />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Password" style={styles.input} />

        <label style={styles.label}>Confirm Password</label>
        <input type="password" placeholder="Confirm Password" style={styles.input} />

        <button type="button" style={styles.button} onClick={handleSignUp}>
          Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
        <a href="/login" style={styles.link}>
          Already have an account? Log In
        </a>
      </form>
    </div>
  );
};

export default SignUp;
