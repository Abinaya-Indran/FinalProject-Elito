import React, { useState } from "react";
import Link from "next/link"; 


const YourCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Chocolate Cherry Brandy Cake",
      size: "500 gr",
      price: 3380,
      quantity: 1,
      image: "/images/pink cake.jpeg",
    },
    {
      id: 2,
      name: "Black Forest Gateau",
      size: "",
      price: 4600,
      quantity: 1,
      image: "/images/Chocolate_Cherry_Brandy_Cake_360x.avif",
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={styles.cartPage}>
      <h1 style={styles.heading}>Your cart</h1>
      <table style={styles.cartTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Product</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Quantity</th>
            <th style={styles.tableHeader}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={styles.tableCell}>
                <div style={styles.productDetails}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.productImage}
                  />
                  <div>
                    <p style={styles.productName}>{item.name}</p>
                    {item.size && <p style={styles.productSize}>Size: {item.size}</p>}
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>
              <td style={styles.tableCell}>₹ {item.price.toLocaleString()}</td>
              <td style={styles.tableCell}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  style={styles.quantityInput}
                />
              </td>
              <td style={styles.tableCell}>
                ₹ {(item.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.cartSummary}>
        <p style={styles.summaryText}>
          <span>Subtotal</span> <span>₹ {subtotal.toLocaleString()}</span>
        </p>
        <p style={styles.taxInfo}>
          Tax included and shipping calculated at checkout
        </p>
        <div style={styles.actionButtons}>
          <Link href="/order"><button style={styles.buyButton}> Buy</button></Link>
          <button style={styles.addToCartButton}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  cartPage: {
    maxWidth: "800px",
    margin: "100px auto",
    padding: "20px",
    fontFamily: "Times New Roman', Times, serif",
    fontSize: "20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "30px",
  },
  cartTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    padding: "10px",
    color: "#a64ca6",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    verticalAlign: "top",
  },
  productDetails: {
    display: "flex",
    alignItems: "center",
  },
  productImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    marginRight: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#a64ca6",
    margin: "0",
  },
  productSize: {
    fontSize: "14px",
    color: "#888",
    margin: "5px 0",
  },
  removeButton: {
    background: "none",
    border: "1px solid #ddd",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },
  quantityInput: {
    width: "50px",
    textAlign: "center",
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  cartSummary: {
    textAlign: "right",
  },
  summaryText: {
    fontSize: "16px",
    margin: "5px 0",
    display: "flex",
    justifyContent: "space-between",
  },
  taxInfo: {
    fontSize: "12px",
    color: "#555",
    marginTop: "5px",
  },
  actionButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  buyButton: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "4px",
    backgroundColor: "#a64ca6",
    color: "white",
  },
  addToCartButton: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    color: "#555",
  },
};

export default YourCart;
