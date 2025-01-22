"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div style={styles.container}>
      {/* Page Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have any questions or feedback? We’d love to hear from you!
        </p>
      </header>

      {/* Contact Section */}
      <div style={styles.contactSection}>
        {/* Contact Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.sectionTitle}>Get in Touch</h2>
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Your Name"
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              style={styles.input}
              required
            />
            <textarea
              placeholder="Your Message"
              style={styles.textarea}
              required
            ></textarea>
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={styles.infoContainer}>
          <h2 style={styles.sectionTitle}>Contact Information</h2>
          <p style={styles.infoText}>
            📍 <strong>Address:</strong> 123 Cake Street, Sweet City, SC 12345
          </p>
          <p style={styles.infoText}>
            📞 <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p style={styles.infoText}>
            ✉️ <strong>Email:</strong> support@cakeonline.com
          </p>
          <p style={styles.infoText}>
            ⏰ <strong>Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

// Inline CSS styles
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#F8F9FA",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#6C63FF",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555555",
  },
  contactSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
  },
  formContainer: {
    flex: "1 1 45%",
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#333333",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #CCCCCC",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #CCCCCC",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    minHeight: "100px",
  },
  button: {
    backgroundColor: "#6C63FF",
    color: "#FFFFFF",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  infoContainer: {
    flex: "1 1 45%",
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  infoText: {
    fontSize: "16px",
    color: "#555555",
    marginBottom: "10px",
  },
};

export default ContactPage;
