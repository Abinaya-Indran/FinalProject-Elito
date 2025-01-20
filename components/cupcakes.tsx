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
      <h2>Cup Cakes</h2>
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Image
              src={product.img}
              alt={product.name}
              width={200}
              height={200}
              className="product-image"
            />
            <p className="product-name">{product.name}</p>
            <h4 className="product-price">{product.price}</h4>
          </div>
        ))}
      </div>

      {/* Add CSS styles */}
      <style jsx>{`
        .product-list {
          text-align: center;
          margin: 40px auto;
          padding: 20px;
          max-width: 1200px;
        }

        .product-list h2 {
          font-size: 32px;
          color: #B864D4;
          margin-bottom: 30px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .product-card {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 12px;
          overflow: hidden;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .product-image {
          border-radius: 8px;
        }

        .product-name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 10px 0;
        }

        .product-price {
          font-size: 20px;
          color: #B864D4;
        }
      `}</style>
    </section>
  );
};

export default Topcake;
