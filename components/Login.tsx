"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      console.log("API Response:", data); 
      if (response.ok) {
        toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
  
        // Store user details locally
        localStorage.setItem("user", JSON.stringify(data.user));
        Cookies.set("token", data.token, { expires: 7 });
  
        // // Redirect based on user role
        // setSuccess("Login successful! Redirecting...");
  
        setTimeout(() => {
          if (data.user?.role === "Buyer") {
            router.push("/product");
          } else if (data.user?.role === "Seller") {
            router.push("/sellerpage");
          } else if (data.user?.role === "Admin") {
            router.push("/Admin");
          } else {
            setError("Invalid role");
          }
        }, 2000); // Delay of 2 seconds before redirect
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <section className="login-background">
      <div className="login-container">
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
        <Link href="/register" className="create-account">
          Create account
        </Link>
      </div>

      <style jsx>{`
      .login-background {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        position: relative;
        overflow: hidden;
      }

     
      .login-background::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("https://res.cloudinary.com/dgyfbm2en/image/upload/v1739410646/cake-1227842_640_zvzfmn.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px;
        max-width: 420px;
        width:100%;
        height: 55vh;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.4);
        font-family: "Poppins", sans-serif;
        position: relative;
        z-index: 1;
        backdrop-filter: blur(12px);
      }
        .login-container h1 {
          color:#333;
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
          border: none;
          border-radius: 5px;
          font-size: 16px;
          background-color: #fff6;
          box-sizing: border-box;
        }

        .login-container input:focus {
          border-color: #A13A66;
          outline: none;
          box-shadow: 0 0 5px #A13A66;
        }

        .login-container button {
          width: 100%;
          padding: 12px;
          background-color: #C14679;
          color: white;
          font-size: 18px;
          font-weight: bold;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .login-container button:hover {
          background-color: #A13A66;
          transform: scale(1.02);
        }

        .login-container .error-message {
          color: red;
          font-size: 15px;
          margin-top: 20px;
        }

        .login-container .success-message {
          color: green;
          font-size: 15px;
          margin-top: 20px;
        }

        .login-container a {
          color:#E1578A;
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
          color:black;
          fontweight:bold;
          fontsize:18px;
          margin-top: 20px;
        }
      `}</style>
    </section>
  );
};

export default Login;
