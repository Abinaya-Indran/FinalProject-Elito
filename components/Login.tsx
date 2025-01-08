"use client";

import React from "react";

const Login = () => {
  return (
    <section className="login-container">
      <h1>Log In</h1>
      <br />
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">LOG IN</button>
        <br />
      </form>
      <a href="#">Forgot your password?</a>
      <br />
      <a href="#">Create account</a>

      {/* CSS styles */}
      <style jsx>{`
        .login-container {
          text-align: center;
          padding: 30px;
          max-width: 400px;
          margin: 50px auto;
        }

        .login-container h1 {
          color: #b864d4;
        }

        .login-container input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .login-container button {
          width: 100%;
          padding: 12px;
          background-color: #b864d4;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }

        .login-container button:hover {
          background-color: #a052c6;
        }

        .login-container a {
          color: #b864d4;
          text-decoration: none;
        }

        .login-container a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default Login;
