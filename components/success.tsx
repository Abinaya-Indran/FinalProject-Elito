"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams ? searchParams.get("session_id") : null;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!sessionId) {
      setMessage("No payment session found.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.post("/api/verify-payment", { sessionId });
        if (response.data.success) {
          setMessage("Thank you! Your payment was successful.");
        } else {
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setMessage("An error occurred while verifying your payment.");
      }
      setLoading(false);
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="thankYouPage">
      <h1>{loading ? "Processing..." : message}</h1>
      <p>We appreciate your purchase.</p>

      <style jsx>{`
        .thankYouPage {
          text-align: center;
          padding: 50px;
          background: white;
        }
        h1 {
          color: #c64b8c;
        }
        p {
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
