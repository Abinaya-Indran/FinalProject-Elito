import { useState } from "react";
import CakeDetails from "../components/Cakedetails";
import OrderPage from "../components/Order";
import PaymentPage from "../components/paymnet";
import DeliveryStatus from "../components/deliverystatus";

const steps = ["Cake Selection", "Order Details", "Payment", "Delivery"];

export default function Tracker() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <CakeDetails />;
      case 2:
        return <OrderPage />;
      case 3:
        return <PaymentPage />;
      case 4:
        return <DeliveryStatus />;
      default:
        return <CakeDetails />;
    }
  };

  return (
    <div className="tracker-container">
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`step ${currentStep > index ? "completed" : ""}`}>
            <div className="circle">{index + 1}</div>
            <p className="step-label">{step}</p>
            {index < steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>

      <div className="step-content">{renderStepComponent()}</div>

      {currentStep < steps.length ? (
        <button className="next-btn" onClick={() => setCurrentStep((prev) => prev + 1)}>
          Next Step
        </button>
      ) : (
        <p className="success-message">🎉 Your cake is successfully delivered! 🎂</p>
      )}

      <style jsx>{`
        .tracker-container {
          text-align: center;
          padding: 30px;
        }

        .steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;
          margin: 20px auto;
          position: relative;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 100%;
        }

        .circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: lightgray;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          color: white;
        }

        .completed .circle {
          background: #007bff;
        }

        .step-label {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }

        .line {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 4px;
          background: lightgray;
          z-index: -1;
        }

        .completed .line {
          background: #007bff;
        }

        .step-content {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #f9f9f9;
        }

        .next-btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          background: #007bff;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .next-btn:hover {
          background: #0056b3;
        }

        .success-message {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          color: #28a745;
        }
      `}</style>
    </div>
  );
}
