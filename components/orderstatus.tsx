// pages/order-status.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OrderStatus = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [status, setStatus] = useState<"pending" | "accepted" | "declined" | null>(null);
  const [cakeName, setCakeName] = useState("");

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") return;

    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`/api/order/${orderId}`);
        const data = await response.json();
        if (data.status) {
          setStatus(data.status);
          setCakeName(data.cakeName);
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div className="container">
      {status === "pending" && (
        <div className="status-card pending">
          <h2>🎂 Order Sent!</h2>
          <p>Your order for <strong>{cakeName}</strong> has been sent to the seller. Please wait for confirmation. 🚀</p>
        </div>
      )}

      {status === "accepted" && (
        <div className="status-card accepted">
          <h2>✅ Order Accepted!</h2>
          <p>The seller has accepted your order for <strong>{cakeName}</strong>. Get ready for your delicious treat! 🎉</p>
        </div>
      )}

      {status === "declined" && (
        <div className="status-card declined">
          <h2>❌ Order Declined</h2>
          <p>We're sorry! The seller is unable to fulfill your order for <strong>{cakeName}</strong> at this time. 😞</p>
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #f9f9f9, #f0f0f0);
          font-family: "Poppins", sans-serif;
        }

        .status-card {
          text-align: center;
          padding: 30px;
          width: 100%;
          max-width: 500px;
          border-radius: 12px;
          box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out;
        }

        .status-card:hover {
          transform: scale(1.02);
        }

        .pending {
          background: #ffe6f2;
          color: #a1005b;
          border-left: 6px solid #d63384;
        }

        .accepted {
          background: #e6f9e6;
          color: #0a580a;
          border-left: 6px solid #28a745;
        }

        .declined {
          background: #fdecea;
          color: #8a1c1c;
          border-left: 6px solid #dc3545;
        }

        h2 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        p {
          font-size: 18px;
          line-height: 1.6;
          font-weight: 500;
        }

        strong {
          font-weight: 700;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default OrderStatus;
