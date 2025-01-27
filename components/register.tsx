"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register: React.FC = () => {
  const [role, setRole] = useState("Buyer"); // Default role is Buyer
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(""); // For Seller role
  const [phoneNumber, setPhoneNumber] = useState(""); // For Seller role
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Name, email, password, and confirm password are required.");
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
    if (role === "Seller" && (!address || !phoneNumber)) {
      setError("Address and phone number are required for Seller registration.");
      return;
    }

    setError(null); // Clear previous errors
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        ...(role === "Seller" && { address, phoneNumber }), // Include Seller-specific fields
      };

      const response = await axios.post("/api/User/register", payload);

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/"); 
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);
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
            style={styles.roleButton(role === "Buyer")}
            onClick={() => setRole("Buyer")}
          >
            Buyer
          </button>
          <button
            type="button"
            style={styles.roleButton(role === "Seller")}
            onClick={() => setRole("Seller")}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          style={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {role === "Seller" && (
          <>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              style={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              style={styles.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        )}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : `Sign Up as ${role}`}
        </button>
        <a href="/login" style={styles.link}>
          Already have an account? Log In
        </a>
      </form>
    </div>
  );
};

export default Register;
