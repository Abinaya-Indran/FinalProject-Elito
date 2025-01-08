import React from "react";


const AddCake = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      cakeName: e.target.cakeName.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      discount: e.target.discount.value,
      description: e.target.description.value,
      image: e.target.image.files[0] ? e.target.image.files[0].name : null,
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
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" placeholder="Price" required />
        </div>

        <div className="form-group">
          <label>Discount</label>
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCake;
