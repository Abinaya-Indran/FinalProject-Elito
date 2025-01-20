import React from "react";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();

  const styles: { [key: string]: React.CSSProperties } = {
    formSection: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
    },
    heading: {
      marginBottom: "15px",
      fontSize: "1.5em",
      color: "#333",
    },
    formGroup: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "15px",
    },
    input: {
      flex: "1 1 calc(50% - 10px)",
      padding: "10px",
      margin: "5px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    label: {
      flex: "1 1 100%",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    checkboxGroup: {
      margin: "15px 0",
      display: "flex",
      alignItems: "center",
    },
    checkboxLabel: {
      marginLeft: "5px",
      color: "#555",
    },
    buttonContainer: {
      textAlign: "center",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  const handlePlaceOrder = () => {
    // Navigate to the payment page
    router.push("/payment");
  };

  return (
    <div style={styles.formSection}>
      <h2 style={styles.heading}>Order Details</h2>
      <div style={styles.formGroup}>
        <input type="text" placeholder="First Name" style={styles.input} />
        <input type="text" placeholder="Last Name" style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <input type="text" placeholder="Phone Number" style={styles.input} />
        <input type="text" placeholder="WhatsApp Number" style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <input type="text" placeholder="Address" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
      </div>

      <h2 style={styles.heading}>Delivery Details</h2>
      <div style={styles.formGroup}>
        <input type="text" placeholder="Delivery City" style={styles.input} />
        <input type="text" placeholder="Delivery Area" style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="deliveryDate" style={styles.label}>
          Delivery Date
        </label>
        <input type="date" id="deliveryDate" style={styles.input} />
        <label htmlFor="deliveryTime" style={styles.label}>
          Delivery Time
        </label>
        <input type="time" id="deliveryTime" style={styles.input} />
      </div>
      <div style={styles.checkboxGroup}>
        <input type="checkbox" id="createAccount" />
        <label htmlFor="createAccount" style={styles.checkboxLabel}>
          Create an Account?
        </label>
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={handlePlaceOrder}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor!)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = styles.button.backgroundColor!)
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
