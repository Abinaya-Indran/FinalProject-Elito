import React from "react";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const steps = [
    "Choose Cake",
    "Order Details",
    "Order Accepted",
    "Payment",
    "Delivered",
  ];

  return (
    <div className="progress-container">
      {steps.map((label, index) => (
        <div key={index} className={`step ${index < step ? "completed" : ""}`}>
          <div className="circle">{index + 1}</div>
          <p>{label}</p>
        </div>
      ))}

      <style jsx>{`
        .progress-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }
        .circle {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: lightgray;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          transition: 0.5s;
        }
        .completed .circle {
          background: #28a745;
        }
        .step p {
          margin-top: 8px;
          font-size: 14px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
