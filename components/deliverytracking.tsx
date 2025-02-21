import React from 'react';
import { useRouter } from 'next/router';

const DeliveryTracking: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleTrackDelivery = () => {
    // Redirect to the landing page when the button is clicked
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Your Cake is on the Way!</h1>
        <p style={styles.message}>
          Your cake will arrive on <strong>February 23, 2025</strong>.
        </p>
        <button style={styles.button} onClick={handleTrackDelivery}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: '#C14679',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
  },
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
    textAlign: 'center' as 'center',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#666666',
    marginBottom: '20px',
  },
};

export default DeliveryTracking;
