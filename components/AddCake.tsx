"use client";

import React from "react";

const AddCake = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      cakeName: (e.target as any).cakeName.value,
      quantity: (e.target as any).quantity.value,
      price: (e.target as any).price.value,
      discount: (e.target as any).discount.value,
      description: (e.target as any).description.value,
      image:
        (e.target as any).image.files[0] ? (e.target as any).image.files[0].name : null,
    };

    console.log("Form Data Submitted:", formData);
    alert("Cake added successfully!");
  };

  return (
    <div className="add-cake-container">
      <h1 className="add-cake-title">Add Cake</h1>
      <form className="add-cake-form" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="image-upload-section">
          <label htmlFor="imageUpload" className="upload-label">
            <div className="upload-placeholder">
              <i className="fas fa-camera"></i>
              <p>UPLOAD PHOTO</p>
            </div>
          </label>
          <input
            type="file"
            id="imageUpload"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
          />
          <p className="upload-text">Add your cake photos</p>
        </div>

        {/* Form Fields */}
        <div className="form-group">
          <label>Cake Name</label>
          <input type="text" name="cakeName" placeholder="Cake Name" required />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" placeholder="Quantity" required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" placeholder="Price" required />
        </div>

        <div className="form-group">
          <label>Discount</label>
          <input type="number" name="discount" placeholder="Discount" required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      {/* Styled JSX */}
      <style jsx>{`
        .add-cake-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .add-cake-title {
          text-align: center;
          font-size: 30px;
          color: #b864d4;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .add-cake-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .image-upload-section {
          text-align: center;
        }

        .upload-label {
          display: block;
          width: 150px;
          height: 150px;
          background-color: #b864d4;
          color: #fff;
          border-radius: 10px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .form-group label {
          font-size: 20px;
          color: #b864d4;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .add-button {
          padding: 10px;
          font-size: 20px;
          background-color: #b864d4;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .add-button:hover {
          transform: scale(0.95);
          background-color: #a052c6;
        }
      `}</style>
    </div>
  );
};

export default AddCake;
