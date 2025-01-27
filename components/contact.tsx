// components/ContactPage.tsx
"use client";

import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setStatus(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('Failed to send message.');
      console.error('Error:', error);
    }
  };

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
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              style={styles.input}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              style={styles.textarea}
              required
            ></textarea>
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>
          {status && <p>{status}</p>} {/* Display status */}
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
