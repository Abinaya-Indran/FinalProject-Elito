import React, { useState } from "react";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsappNumber: "",
    address: "",
    email: "",
    deliveryCity: "",
    deliveryArea: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const errorList: string[] = [];
    for (const key in formData) {
      if (formData[key as keyof typeof formData].trim() === "") {
        errorList.push(key);
      }
    }

    if (errorList.length > 0) {
      setErrors(errorList);
    } else {
      setErrors([]);
      setLoading(true);

      try {
        const response = await fetch("/api/Order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cakeId: router.query.cakeId, // Assume cakeId is passed in the query
            sellerId: router.query.sellerId, // Assume sellerId is passed in the query
            buyerDetails: {
              ...formData,
            },
            deliveryDetails: {
              deliveryCity: formData.deliveryCity,
              deliveryArea: formData.deliveryArea,
              deliveryDate: formData.deliveryDate,
              deliveryTime: formData.deliveryTime,
            },
          }),
        });

        if (response.ok) {
          router.push("/payment");
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to place the order");
        }
      } catch (error) {
        alert("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="formSection">
        <h2 className="heading">Order Details</h2>
        <div className="formGroup">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`input ${errors.includes("firstName") ? "error" : ""}`}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`input ${errors.includes("lastName") ? "error" : ""}`}
          />
        </div>
        <div className="formGroup">
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`input ${
              errors.includes("phoneNumber") ? "error" : ""
            }`}
          />
          <input
            type="text"
            placeholder="WhatsApp Number"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className={`input ${
              errors.includes("whatsappNumber") ? "error" : ""
            }`}
          />
        </div>
        <div className="formGroup">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`input ${errors.includes("address") ? "error" : ""}`}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${errors.includes("email") ? "error" : ""}`}
          />
        </div>

        <h2 className="heading">Delivery Details</h2>
        <div className="formGroup">
          <input
            type="text"
            placeholder="Delivery City"
            name="deliveryCity"
            value={formData.deliveryCity}
            onChange={handleChange}
            className={`input ${
              errors.includes("deliveryCity") ? "error" : ""
            }`}
          />
          <input
            type="text"
            placeholder="Delivery Area"
            name="deliveryArea"
            value={formData.deliveryArea}
            onChange={handleChange}
            className={`input ${
              errors.includes("deliveryArea") ? "error" : ""
            }`}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="deliveryDate" className="label">
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className={`input ${
              errors.includes("deliveryDate") ? "error" : ""
            }`}
          />
          <label htmlFor="deliveryTime" className="label">
            Delivery Time
          </label>
          <input
            type="time"
            id="deliveryTime"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            className={`input ${
              errors.includes("deliveryTime") ? "error" : ""
            }`}
          />
        </div>
        <div className="buttonContainer">
          <button className="button" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
      <style jsx>{`
        .formSection {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 20px auto;
        }
        .heading {
          margin-bottom: 15px;
          font-size: 1.8em;
          font-weight: 600;
          color: #333;
          text-align: center;
        }
        .formGroup {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
        }
        .input {
          flex: 1 1 calc(50% - 15px);
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .input.error {
          border-color: red;
        }
        .label {
          flex: 1 1 100%;
          font-weight: bold;
          margin-top: 10px;
        }
        .buttonContainer {
          text-align: center;
        }
        .button {
          background-color: #4caf50;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #45a049;
        }
      `}</style>
    </>
  );
};

export default Order;
