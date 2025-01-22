"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sign-up failed. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

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
      textAlign: "center" as React.CSSProperties["textAlign"],
      margin: "0 5px",
      fontSize: "1rem",
    }),
    heading: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      textAlign: "center" as React.CSSProperties["textAlign"],
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
      textAlign: "center" as React.CSSProperties["textAlign"],
      fontSize: "0.9rem",
      color: "#B864D4",
      textDecoration: "none",
    },
    error: {
      color: "red",
      fontSize: "0.9rem",
      marginBottom: "10px",
    },
    success: {
      color: "green",
      fontSize: "1rem",
      marginBottom: "10px",
      textAlign: "center" as React.CSSProperties["textAlign"],
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleRegister}>
        <div style={styles.roleContainer}>
          <button
            type="button"
            style={styles.roleButton(role === "buyer")}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
          <button
            type="button"
            style={styles.roleButton(role === "seller")}
            onClick={() => setRole("seller")}
          >
            Seller
          </button>
        </div>

        <h2 style={styles.heading}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Registration successful! Redirecting...</p>}

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          style={styles.input}
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          style={styles.input}
          value={formData.email}
          onChange={handleInputChange}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          style={styles.input}
          value={formData.password}
          onChange={handleInputChange}
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          style={styles.input}
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit" style={styles.button}>
          Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
        <a href="/login" style={styles.link}>
          Already have an account? Log In
        </a>
      </form>
    </div>
  );
};

export default Register;
