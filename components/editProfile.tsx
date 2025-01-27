"use client";

import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [previewPic, setPreviewPic] = useState<string | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setName(user.name || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
    setProfilePic(user.profilePic || null);
  }, []);

  // Save updated details
  const handleSave = () => {
    const updatedUser = { name, phone, address, profilePic };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewPic(previewURL);
      setProfilePic(previewURL); // Save preview for now
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Profile</h1>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div style={styles.profilePicContainer}>
          <img
            src={previewPic || profilePic || "/images/default-avatar.png"}
            alt="Profile"
            style={styles.profilePic}
          />
          <input type="file" accept="image/*" onChange={handleProfilePicUpload} style={styles.fileInput} />
        </div>

        <div style={styles.field}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="phone" style={styles.label}>
            Phone:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="address" style={styles.label}>
            Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.textarea}
          ></textarea>
        </div>

        <button type="button" onClick={handleSave} style={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Inline styles for the component
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "120px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  button: {
    padding: "10px 20px",
    color: "white",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "center",
  },
  profilePicContainer: {
    textAlign: "center",
  },
  profilePic: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  fileInput: {
    display: "block",
    margin: "0 auto",
  },
};

export default EditProfile;
