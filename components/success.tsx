import React, { useState } from 'react';
import DeliveryTracking from '../components/deliverytracking';

const SuccessPage: React.FC = () => {
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);

  const handleGoBackHome = () => {
    setShowDeliveryTracking(true);
  };

  return (
    <div style={styles.container}>
      {showDeliveryTracking ? (
        <DeliveryTracking />
      ) : (
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={styles.icon}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h1 style={styles.title}>Payment Successful!</h1>
          <p style={styles.message}>
            Thank you for your purchase. Your payment has been successfully processed.
          </p>
          <button style={styles.button} onClick={handleGoBackHome}>
            Track Delivery
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '87vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center' as const,
    maxWidth: '400px',
    width: '100%',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  icon: {
    width: '64px',
    height: '64px',
    color: '#4CAF50',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    color: '#666666',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#C14679',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default SuccessPage;
