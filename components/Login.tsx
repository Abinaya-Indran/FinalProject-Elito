"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/User/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        setError("");
        localStorage.setItem("token", data.token); // Store JWT token
        router.push("/dashboard"); // Redirect user
      } else {
        setError(data.error || "Invalid email or password.");
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <section className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">LOG IN</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <Link href="/signup" className="create-account">
        Create account
      </Link>

      {/* CSS styles */}
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          max-width: 400px;
          height: "100vh";
          margin: 230px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: #f9f9f9;
          font-family: "Arial", sans-serif;
        }

        .login-container h1 {
          color: #b864d4;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .login-container form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-container input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          background-color: #ffffff;
          box-sizing: border-box;
        }

        .login-container input:focus {
          border-color: #b864d4;
          outline: none;
          box-shadow: 0 0 5px rgba(184, 100, 212, 0.5);
        }

        .login-container button {
          width: 100%;
          padding: 12px;
          background-color: #b864d4;
          color: white;
          font-size: 18px;
          font-weight: bold;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .login-container button:hover {
          background-color: #a052c6;
          transform: scale(1.02);
        }

        .login-container .error-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        .login-container .success-message {
          color: green;
          font-size: 14px;
          margin-top: 10px;
        }

        .login-container a {
          color: #b864d4;
          text-decoration: none;
          font-size: 14px;
          margin-top: 10px;
        }

        .forgot-password {
          margin-top: 15px;
        }

        .login-container a:hover {
          text-decoration: underline;
        }

        .create-account {
          margin-top: 20px;
        }
      `}</style>
    </section>
  );
};

export default Login;
