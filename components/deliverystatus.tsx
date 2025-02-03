import { useState, useEffect } from "react";

export default function DeliveryStatus() {
  const [status, setStatus] = useState(0); // Track status (0 to 3)
  const statuses = [
    "Your cake is coming soon 🎂",
    "Your cake is ready for delivery 🚚",
    "Your cake has been successfully delivered ✅",
  ];
  const [isDelivered, setIsDelivered] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 3000); // Update status every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-container">
      <h2>📦 Cake Delivery Status</h2>
      <div className="progress-container">
        {statuses.map((text, index) => (
          <div key={index} className={`step ${status >= index ? "completed" : ""}`}>
            <div className="circle">{index + 1}</div>
            <p className="status-text">{text}</p>
          </div>
        ))}
      </div>

      {status === statuses.length - 1 && !isDelivered && (
        <div className="confirm-box">
          <h3>Did you receive the cake? 🎂</h3>
          <button className="yes-btn" onClick={() => setIsDelivered(true)}>
            ✅ Yes
          </button>
          <button className="no-btn">❌ No</button>
        </div>
      )}

      {isDelivered && (
        <div className="thank-you-box">
          <h3>🎉 Thank You for Your Order! 🎂</h3>
          <p>Sweet moments with cake! Have a nice day! 😊</p>
        </div>
      )}

      <style jsx>{`
        .delivery-container {
          text-align: center;
          padding: 30px;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          margin: 20px auto;
        }

        .step {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 20px;
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
          transition: 0.5s;
        }

        .completed .circle {
          background: #28a745;
        }

        .status-text {
          margin-left: 20px;
          font-size: 16px;
          font-weight: bold;
        }

        .confirm-box {
          margin-top: 30px;
        }

        .yes-btn, .no-btn {
          margin: 10px;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .yes-btn {
          background: #28a745;
          color: white;
        }

        .no-btn {
          background: #dc3545;
          color: white;
        }

        .thank-you-box {
          margin-top: 30px;
          padding: 20px;
          border-radius: 10px;
          background: #f8f9fa;
          font-size: 18px;
          font-weight: bold;
          color: #28a745;
        }
      `}</style>
    </div>
  );
}
