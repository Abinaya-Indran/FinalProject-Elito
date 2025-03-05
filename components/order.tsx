"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Order = () => {
  const [cakeId, setCakeId] = useState<string>("");
  const [buyerId, setBuyerId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams ? searchParams.get('productId') : null;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("/api/cookie");
        setBuyerId(response.data.user.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const cakeId = router.query.productId;
      setCakeId(typeof cakeId === "string" ? cakeId : "");
    }
  }, [router.isReady, router.query]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    deliveryCity: "",
    deliveryArea: "",
    deliveryDate: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const errorList: string[] = [];

    if (!cakeId.trim()) errorList.push("cakeId is required");
    if (!buyerId.trim()) errorList.push("buyerId is required");

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) errorList.push(`${key} is required`);
    });

    if (errorList.length > 0) {
      setErrors(errorList);
      return;
    }

    setErrors([]);
    setLoading(true);
    setSuccessMessage(""); // Reset previous success message

    try {
      const response = await axios.post("/api/order", {
        cakeId,
        buyerId,
        buyerDetails: formData,
        deliveryDetails: {
          deliveryCity: formData.deliveryCity,
          deliveryArea: formData.deliveryArea,
          deliveryDate: formData.deliveryDate,
        },
      });

      if (response.status !== 201) {
        alert("Failed to place the order");
        return;
      }

      setSuccessMessage("Order sent successfully!");
      setTimeout(() => {

        if (response.status === 201 && response.data.order) {
          router.push(`/orderstatus?orderId=${response.data.order._id}&productId=${productId}`)
        }
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="formSection">
        <h2 className="heading">Order Details</h2>

        {successMessage && (
          <div className="successMessage">
            <p>{successMessage}</p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="errorMessage">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        <div className="formGroup">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`input ${errors.includes("firstName is required") ? "error" : ""}`}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`input ${errors.includes("lastName is required") ? "error" : ""}`}
          />
        </div>

        <div className="formGroup">
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`input ${errors.includes("phoneNumber is required") ? "error" : ""}`}
          />
        </div>

        <div className="formGroup">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`input ${errors.includes("address is required") ? "error" : ""}`}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input ${errors.includes("email is required") ? "error" : ""}`}
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
            className={`input ${errors.includes("deliveryCity is required") ? "error" : ""}`}
          />
          <input
            type="text"
            placeholder="Delivery Area"
            name="deliveryArea"
            value={formData.deliveryArea}
            onChange={handleChange}
            className={`input ${errors.includes("deliveryArea is required") ? "error" : ""}`}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="deliveryDate" className="label">Delivery Date</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className={`input ${errors.includes("deliveryDate is required") ? "error" : ""}`}
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
        .successMessage {
          background-color: #d4edda;
          color: #155724;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          text-align: center;
          font-weight: bold;
        }
        .errorMessage {
          background-color: #ffdddd;
          color: red;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
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
        .buttonContainer {
          text-align: center;
        }
        .button {
          background-color: #C14679;
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
