"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const YourCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={styles.cartPage}>
      <h1 style={styles.heading}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          <table style={styles.cartTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Product</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Total</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td style={styles.tableCell}>
                    <div style={styles.productDetails}>
                      <Image src={item.image} alt={item.name} style={styles.productImage} width={80} height={80}/>
                      <div>
                        <p style={styles.productName}>{item.name}</p>
                        {/* {item.size && <p style={styles.productSize}>Size: {item.size}</p>} */}
                      </div>
                    </div>
                  </td>
                  <td style={styles.tableCell}>Rs {item.price.toLocaleString()}</td>
                  <td style={styles.tableCell}>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      style={styles.quantityInput}
                    />
                  </td>
                  <td style={styles.tableCell}>Rs {(item.price * item.quantity).toLocaleString()}</td>
                  <td style={styles.tableCell}>
                    <button onClick={() => handleRemove(item.id)} style={styles.removeButton}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.cartSummary}>
            <p style={styles.summaryText}>
              <span>Subtotal</span> <span>Rs  {subtotal.toLocaleString()}</span>
            </p>
            {/* <p style={styles.taxInfo}>Tax included and shipping calculated at checkout</p> */}
            <br/>
            <Link href="/payment">
              <button style={styles.buyButton}>Buy Now</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  cartPage: { maxWidth: "800px", margin: "100px auto", padding: "20px", fontFamily: "Poppins, sans-serif" },
  heading: { textAlign: "center", fontSize: "35px", marginBottom: "30px" ,color: " #C14679"},
  emptyCart: { textAlign: "center", fontSize: "18px", color: "#888" },
  cartTable: { width: "100%", borderCollapse: "collapse", marginBottom: "30px" },
  tableHeader: { borderBottom: "2px solid #ddd", textAlign: "left", padding: "10px", color: " #333" ,fontSize: "20px" },
  tableCell: { borderBottom: "1px solid #ddd", padding: "15px 10px", verticalAlign: "top" },
  productDetails: { display: "flex", alignItems: "center" },
  productImage: { width: "80px", height: "80px", objectFit: "cover", marginRight: "15px", borderRadius: "8px" },
  productName: { fontSize: "16px", fontWeight: "bold", color: " #333", margin: "0" },
  productSize: { fontSize: "14px", color: "#888", margin: "5px 0" },
  removeButton: { background: "none", border: "1px solid #ddd", padding: "5px 10px", cursor: "pointer", color: "#555" },
  quantityInput: { width: "50px", textAlign: "center", padding: "5px", border: "1px solid #ddd", borderRadius: "4px" },
  cartSummary: { textAlign: "right" },
  summaryText: { fontSize: "16px", margin: "5px 0", display: "flex", justifyContent: "space-between", fontWeight:"bold"},
  // taxInfo: { fontSize: "12px", color: "#555", marginTop: "5px" },
  buyButton: { padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "16px", borderRadius: "4px", backgroundColor: "#C14679", color: "white" },
};

export default YourCart;
