import React from "react";
import Image from "next/image";


const Footer = () => {
  return (
    <footer
      style={{
        fontFamily: "Times New Roman'",
        fontSize: "16px",
        color: "black",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Logo and Description */}
        <div style={{ margin: "0 20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Image src="/images/White and Dark Brown Bold Food Logo.svg" alt="Elite Logo" width={80} height={80} />
          </div>
          <p>
            Sri Lanka&apos;s largest online cake shop that can customize any type of
            cake.
          </p>
          <p>No-80, Viyasar Road, Thonikkal, Vavuniya, Sri Lanka.</p>
          <p>Email: elito28@gmail.com</p>
          <p>Phone: +94 776511492</p>
        </div>

        {/* Useful Links */}
        <div style={{ margin: "0 20px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Useful Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>About Us</li>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>Delivery</li>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>Contact</li>
          </ul>
        </div>

        {/* My Account */}
        <div style={{ margin: "0 20px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>My Account</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>My Account</li>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>Discount</li>
            <li style={{ marginBottom: "8px", fontSize: "14px", cursor: "pointer" }}>Order History</li>
          </ul>
        </div>
      </div>

      {/* Middle Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ textAlign: "center", margin: "0 10px" }}>
          <Image src="/images/delivery.png" alt="Delivery" width={60} height={50} />
          <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>Delivery</h5>
          <p style={{ fontSize: "14px", color: "#555" }}>Fast and Responsible Delivery</p>
        </div>
        <div style={{ textAlign: "center", margin: "0 10px" }}>
          <Image src="/images/value-removebg-preview (1).png" alt="Value for Money" width={70} height={50} />
          <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>100% Value For Your Money</h5>
          <p style={{ fontSize: "14px", color: "#555" }}>We can make your dream come true.</p>
        </div>
        <div style={{ textAlign: "center", margin: "0 10px" }}>
          <Image src="/images/online-removebg-preview (1).png" alt="Support" width={50} height={50} />
          <h5 style={{ fontSize: "16px", marginBottom: "5px" }}>24/7 Online Support</h5>
          <p style={{ fontSize: "14px", color: "#555" }}>Via Facebook Messenger Service.</p>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
