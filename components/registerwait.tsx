// components/ConfirmationScreen.tsx
import React from "react";
import Link from "next/link";

const ConfirmationScreen: React.FC = () => {
  const user = { role: "seller" }; // Example: Simulate a seller role, replace with actual logic

  if (!user) return <div>Loading...</div>;

  return (
    <div className="confirmation-screen">
      {user.role === "seller" ? (
        <div className="confirmation-card">
          <div className="spinner"></div>
          <h2 className="confirmation-title">Please wait for your baker confirmation</h2>
          <p className="confirmation-message">
            We will verify your details and notify you after registration.
          </p>
          <Link href="/" passHref ><button className="confirmation-button">OK</button></Link>
        </div>
      ) : (
        <div className="buyer-message">
          Welcome, Buyer! You can browse the available cakes.
        </div>
      )}
      
      <style jsx>{`
        .confirmation-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 88vh;
          width: 100%;
          background-color: #f7f7f7;
        }

        .confirmation-card {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 600px;
          max-height: 600px;
          width: 100%;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #ccc;
          border-top: 4px solid #c64b8c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .confirmation-title {
          font-size: 30px;
          font-weight: 600;
          color: #333;
          margin-top: 20px;
        }

        .confirmation-message {
          color: #333;
          font-size: 17px;
          margin-top: 10px;
        }

        .confirmation-button {
          background-color: #c64b8c;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }

        .confirmation-button:hover {
          background-color: #a63c72;
        }

        .buyer-message {
          font-size: 18px;
          color: #333;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationScreen;
