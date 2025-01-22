"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

import profilePic from "../public/images/sellerprofile.jpg";
import heartCake from "../public/images/celebrate.png";
import strawberryCake from "../public/images/images.webp";
import vanillaCake from "../public/images/heart.jpeg";
import unicornCake from "../public/images/unicorncake.jpeg";
import cherryCake from "../public/images/download (2).jpeg";
import pinkCake from "../public/images/pink cake.jpeg";

const SellerPage = () => {
  const cakes = [
    { id: 1, name: "Heart Cake", price: "Rs. 3500", img: heartCake },
    { id: 2, name: "Strawberry Cake", price: "Rs. 4000", img: strawberryCake },
    { id: 3, name: "Vanilla Cake", price: "Rs. 1800", img: vanillaCake },
    { id: 4, name: "Unicorn Cake", price: "Rs. 4000", img: unicornCake },
    { id: 5, name: "Cherry Cake", price: "Rs. 3500", img: cherryCake },
    { id: 6, name: "Pink Cake", price: "Rs. 3000", img: pinkCake },
  ];

  const orders = [
    { id: 1, userId: 1002, cake: "Chocolate Cake", price: "Rs. 3500", status: "Delivered" },
    { id: 2, userId: 1027, cake: "Vanilla Cake", price: "Rs. 2500", status: "Pending" },
    { id: 3, userId: 1007, cake: "Chocolate Cake", price: "Rs. 2500", status: "Delivered" },
    { id: 4, userId: 1052, cake: "Vanilla Cake", price: "Rs. 2500", status: "Pending" },
  ];

  // Component for rendering individual cakes
  const CakeCard = ({ name, price, img }: { name: string; price: string; img: StaticImageData }) => (
    <div style={{ textAlign: "center" }}>
      <Image src={img} alt={name} width={150} height={150} style={{ borderRadius: "8px" }} />
      <p>{price}</p>
    </div>
  );

  // Component for rendering individual orders
  const OrderRow = ({ id, userId, cake, price, status }: any) => (
    <tr>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{id}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{userId}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{cake}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{price}</td>
      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{status}</td>
    </tr>
  );

  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Times New Roman', Times, serif",
      fontSize: "20px",
    },
    profile: {
      textAlign: "center" as const,
      marginBottom: "30px",
     
    },
    profilePic: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      // marginBottom: "10px",
    },
    stats: {
      // margin: "0px 600px",
      margintop: "80px",
      gap: "30px",
      fontSize: "20px",
    },
    statItem: {
      display: "inline-block",
      margin: "5px 10px",
      fontWeight: "bold",
    },
    profilebutton: {
      marginTop: "20px",
    },
    button: {
      margin: "5px",
      padding: "10px 15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "17px",
    },

    Addbutton:{
       margin: " 20px",
      padding: "80px 45px",
      backgroundColor: "#B864D4",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "20px",
      fontWeight: "bold",
      
    },

    section: {
      margin: "50px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
    },
    thTd: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "center" as const,
    },
  };

  return (
    <div style={styles.page}>
      {/* Seller Profile */}
      <div style={styles.profile}>
        <Image src={profilePic} alt="Seller Profile" width={150} height={150} style={styles.profilePic} />
        <h2>Abinaya</h2>
        <p>
          Abi Cake Shop
          <br />
          Call: 0703807848
        </p>
        <div style={styles.stats}>
          <span style={styles.statItem}>Posts  <br/> 50</span>
          <span style={styles.statItem}>Likes <br/> 1000 </span>
          <span style={styles.statItem}>Followers<br/>1.9k </span>
          <span style={styles.statItem}>Reviews & Ratings<br/>40 </span>
        </div>
        <div style={styles.profilebutton}>
          <button style={styles.button}>+ Follow</button>
          <button style={styles.button}>Message</button>
        </div>
        <Link href="/addcake">
      <button style={styles.Addbutton}>+ Add Cake</button>
    </Link>
      </div>

      {/* My Cakes Section */}
      <div style={styles.section}>
        <h3>My Cakes</h3>
        <div style={styles.grid}>
          {cakes.map((cake) => (
            <CakeCard key={cake.id} name={cake.name} price={cake.price} img={cake.img} />
          ))}
        </div>
      </div>

      {/* My Orders Section */}
      <div style={styles.section}>
        <h3>My Orders</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd}>Order ID</th>
              <th style={styles.thTd}>User ID</th>
              <th style={styles.thTd}>Cake Name</th>
              <th style={styles.thTd}>Price</th>
              <th style={styles.thTd}>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                id={order.id}
                userId={order.userId}
                cake={order.cake}
                price={order.price}
                status={order.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPage;
