"use client";

import React from "react";
import Image from "next/image";

// Product data
const products = [
  { id: 1, name: "Chocolate Cake", price: "Rs.1800", img: "/images/Chocolate_Gateau_360x.avif" },
  { id: 2, name: "Vanilla Cake", price: "Rs.1500", img: "/images/Ribbon_Cake_360x.avif" },
  { id: 3, name: "Mocha Cake", price: "Rs.3000", img: "/images/Mocha_Gateau_360x.avif" },
  { id: 4, name: "Fruit Cake", price: "Rs.2000", img: "/images/Fruit-Chocolate-Cake.jpg" },
  { id: 5, name: "Xmas Cake", price: "Rs.2100", img: "/images/14._X_mas_snow_man_ribbon_cake_Rs_1600_360x.avif" },
  { id: 6, name: "Unicorn Cake", price: "Rs.3500", img: "/images/blue.jpeg" },
  { id: 7, name: "Black Cake", price: "Rs.3100", img: "/images/Mocha_Gateau_360x.avif" },
  { id: 8, name: "Pink Cake", price: "Rs.1600", img: "/images/pink cake.jpeg" },
  { id: 9, name: "Cherry Cake", price: "Rs.3000", img: "/images/Chocolate_Cherry_Brandy_Cake_360x.avif" },
];

const Topcake = () => {
  return (
    <section className="product-list">
      <h2>Top Cakes</h2>
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {/* Use next/image for optimized image rendering */}
            <Image
              src={product.img}
              alt={product.name}
              width={360}
              height={360}
            />
            <p>{product.name}</p>
            <h4>{product.price}</h4>
          </div>
        ))}
      </div>

      {/* Add CSS styles */}
      <style jsx>{`
        .product-list {
          text-align: center;
          margin: 20px auto;
        }
        .products {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          width: 250px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .product-card h4 {
          color: #B864D4;
        }
      `}</style>
    </section>
  );
};

export default Topcake;
