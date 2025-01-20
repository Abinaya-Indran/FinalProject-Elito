"use client";

import React, { useState } from "react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };


  const handleSubmit = () => {
    if (paymentMethod === "bank-deposit" && !uploadedFile) {
      alert("Please upload your payment proof for Bank Deposit.");
      return;
    }
    alert("Payment processed successfully!");
  };

  return (
    <div className="paymentPage">
      <style jsx>{`
        .paymentPage {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }

        .paymentContainer {
          display: flex;
          gap: 20px;
        }

        .paymentOptions,
        .orderSummary {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          flex: 1;
        }

        .section {
          margin-bottom: 20px;
          margin :50px;
        }

        .sectionTitle {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .deliveryOptions,
        .paymentMethods {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 2px solid #d6d6d6;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        .option:hover {
          background-color: #eaeaea;
        }

        .inputField {
          width: 100%;
          padding: 10px;
          border: 2px solid #d6d6d6;
          border-radius: 5px;
          margin-top: 5px;
        }

        .cardDetails {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        .inputFieldSmall {
          width: 100%;
          padding: 8px;
          border: 2px solid #d6d6d6;
          border-radius: 5px;
        }

        .orderItem {
          display: flex;
          gap: 18px;
          margin-bottom: 10px;
        }

        .orderImage {
          width: 150px;
          height: 130px;
          border-radius: 5px;
        }

        .summary {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          
        }

        .total {
          font-size: 18px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }

        .payNow {
          width: 100%;
          padding: 15px;
          background-color:green;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin:20px 0px;
        }

        .payNow:hover {
          trancition(scale)0.9
        }
      `}</style>

      <h2 className="title">Payment Details</h2>

      <div className="paymentContainer">
        {/* Left Section */}
        <div className="paymentOptions">
          {/* Delivery Section */}
          <div className="section">
            <h3 className="sectionTitle">Delivery</h3>
            <div className="deliveryOptions">
              <label className="option">
                <input type="radio" name="delivery" value="ship" />
                <span>📦 Ship</span>
              </label>
              <label className="option">
                <input type="radio" name="delivery" value="pickup" />
                <span>🏪 Pickup in store</span>
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="section">
            <h3 className="sectionTitle">Payment Method</h3>
            <div className="paymentMethods">
              <label className="option">
                <input
                  type="radio"
                  name="payment"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={() => setPaymentMethod("credit-card")}
                />
                <span>💳 Credit Card</span>
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>🏠 Cash on Delivery (COD)</span>
              </label>
              <label className="option">
                <input
                  type="radio"
                  name="payment"
                  value="bank-deposit"
                  checked={paymentMethod === "bank-deposit"}
                  onChange={() => setPaymentMethod("bank-deposit")}
                />
                <span>🏦 Bank Deposit</span>
              </label>
            </div>
          </div>

          {/* Credit Card Details */}
          {paymentMethod === "credit-card" && (
            <div className="section">
              <h3 className="sectionTitle">Card Details</h3>
              <input
                type="text"
                className="inputField"
                placeholder="1234 5678 9012 3456"
              />
              <div className="cardDetails">
                <div>
                  <label>Valid Until</label>
                  <input
                    type="text"
                    className="inputFieldSmall"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    className="inputFieldSmall"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bank Deposit Details */}
          {paymentMethod === "bank-deposit" && (
            <div className="section">
              <h3 className="sectionTitle">Bank Deposit</h3>
              <p>Bank Name: XYZ Bank</p>
              <p>Account Number: 1234567890</p>
              <p>Branch Code: 00123</p>
              <p>
                Please deposit the amount to the above account and upload your
                payment proof below.
              </p>
              <label>
                Upload Proof:
                <input
                  type="file"
                  className="fileInput"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                />
              </label>
              {uploadedFile && <p>Uploaded: {uploadedFile.name}</p>}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="orderSummary">
          <h3 className="sectionTitle">Your Order</h3>
          <div className="orderItem">
            <img
              src="/images/Chocolate_Cherry_Brandy_Cake_360x.avif"
              alt="Black Forest Gateau"
              className="orderImage"
            />
            <div>
              <p>Black Forest Gateau</p>
              <p>Rs 4,600</p>
            </div>
          </div>
          <div className="orderItem">
            <img
              src="/images/pink cake.jpeg"
              alt="Chocolate Cherry Brandy Cake"
              className="orderImage"
            />
            <div>
              <p>Chocolate Cherry Brandy Cake</p>
              <p>Rs 3,380</p>
            </div>
          </div>
          <div className="summary">
            <p>Subtotal</p>
            <p>Rs 7,980</p>
          </div>
          <div className="summary">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>LKR Rs 7,980</p>
          </div>
          <button className="payNow" onClick={handleSubmit}>
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
