import React, { useState } from "react";
import axios from "axios";
import { Link } from "lucide-react";

const AddCake = () => {
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name: cakeName,
      price,
      imageUrl,
      description,
      category,
    };

    try {
      const response = await axios.post("/api/Product", newProduct);
      setMessage("Product added successfully!");
      // Reset form fields
      setCakeName("");
      setPrice("");
      setImageUrl("");
      setDescription("");
      setCategory("");
    } catch (error) {
      setMessage("Failed to add product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Cake</h1>
      <form onSubmit={handleSubmit} className="cake-form">
        <div className="form-group">
          <label>Cake Name:</label>
          <input
            type="text"
            value={cakeName}
            onChange={(e) => setCakeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Add Cake</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 2rem auto;
        }

        .form-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1.5rem;
        }

        .cake-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 1rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }

        .form-message {
          margin-top: 1rem;
          color: green;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AddCake;
