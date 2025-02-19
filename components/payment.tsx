"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string; // Assuming Cloudinary URL
}

const Payment = () => {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("productId") || "";
  const orderId = searchParams?.get("orderId") || "";
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryPrice, setDeliveryPrice] = useState(450); // Default delivery price

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/Product/${id}`);
      setProductDetails(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (paymentMethod === "bank-deposit" && !uploadedFile) {
      alert("Please upload your payment proof for Bank Deposit.");
      return;
    }
  
    setIsProcessing(true);
  
    try {
      if (paymentMethod === "credit-card") {
        const { data } = await axios.post("/api/checkout", {
          productName: productDetails?.name,
          productPrice: productDetails?.price,
          productImage: productDetails?.image,
          deliveryPrice: deliveryPrice, // Pass the delivery price
        });
  
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        // Simulate bank deposit processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Bank deposit confirmed successfully!");
      }
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="paymentPage">
      <h2 className="title">Payment Details</h2>

      <div className="orderSummary">
        <h3 className="sectionTitle">Your Order</h3>

        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : productDetails ? (
          <div className="orderItem">
            <img src={productDetails.image} alt={productDetails.name} className="orderImage" />
            <div>
              <p>{productDetails.name}</p>
              <p>Rs {productDetails.price}</p>
            </div>
          </div>
        ) : (
          <p>Product details not available.</p>
        )}

        <div className="cakeprice">
          <p>Cake Price</p>
          <p> Rs {productDetails?.price || 0}</p>
        </div>

        <div className="deliveryprice">
          <p>Delivery Price</p>
          <p>Rs {deliveryPrice}</p>
        </div>

        <div className="total">
          <p>Total Price</p>
          <p>Rs {(productDetails?.price || 0) + deliveryPrice}</p>
        </div>

        <div className="paymentMethod">
          <h3 className="sectionTitle">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="paymentSelect"
          >
            <option value="credit-card">Credit Card</option>
            <option value="bank-deposit">Bank Deposit</option>
          </select>
        </div>

        {paymentMethod === "bank-deposit" && (
          <div className="fileUpload">
            <h3 className="sectionTitle">Upload Payment Proof</h3>
            <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
          </div>
        )}

        <button className="payNow" onClick={handleSubmit} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Check out"}
        </button>
      </div>

      <style jsx>{`
        .paymentPage {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .orderSummary {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 10px;
        }

        .sectionTitle {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #444;
        }

        .orderItem {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
          margin-bottom: 10px;
        }

        .orderImage {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #ddd;
        }

        .summary,
        .total {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 16px;
          font-weight: 500;
        }

        .total {
          font-size: 18px;
          font-weight: 600;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
        .cakeprice {
          display: flex;
          font-size: 18px;
          justify-content: space-between;
          padding: 8px 0;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
       .deliveryprice {
          display: flex;
          font-size: 18px;
          justify-content: space-between;
          padding: 8px 0;
         
        }

        .paymentMethod {
          margin-top: 20px;
        }

        .paymentSelect {
          width: 100%;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 16px;
          background: white;
        }

        .fileUpload {
          margin-top: 15px;
        }

        input[type="file"] {
          display: block;
          padding: 5px;
          font-size: 14px;
        }

        .payNow {
          width: 100%;
          background: #c64b8c;
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          margin-top: 20px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .payNow:disabled {
          background: #888;
          cursor: not-allowed;
        }

        .payNow:hover:not(:disabled) {
          background: #b03e7a;
        }

        .error {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Payment;
