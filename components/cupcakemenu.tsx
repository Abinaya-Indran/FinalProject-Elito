"use client"; // Add this at the very top

import React from 'react';

export default function DonutMenu() {
  return (
    <div className="donut-menu">
      <div className="left-section">
        <h2>Special Cupcakes</h2>
        <p>Starts from <span>Rs.75.00</span></p>
        <img src="/donuts-stack.jpg" alt="Donuts" className="donuts-image" />
      </div>
      <div className="right-section">
        <div className="donut-item">
          <img src="/glazed-donut.jpg" alt="Glazed Donut" />
          <div className="donut-info">
            <h3>Glazed Donut</h3>
            <p>Dom tempus turpis at metus scelerisque placerat nulla deumantos solicitud...</p>
          </div>
          <p className="price">Rs. 100.00</p>
        </div>
        <hr />
        <div className="donut-item">
          <img src="/banana-donut.jpg" alt="Banana Donut" />
          <div className="donut-info">
            <h3>Banana Donut</h3>
            <p>Sam tempus turpis at metus scelerisque placerat nulla deumantos solicitud...</p>
          </div>
          <p className="price">Rs. 100.00</p>
        </div>
        <hr />
        <div className="donut-item">
          <img src="/cheese-donut.jpg" alt="Cheese Donut" />
          <div className="donut-info">
            <h3>Cheese Donut</h3>
            <p>Som tempus turpis at metus scelerisque placerat nulla deumantos solicitud...</p>
          </div>
          <p className="price">Rs. 150.00</p>
        </div>
        <hr />
        <div className="donut-item">
          <img src="/batter-donut.jpg" alt="Batter Donut" />
          <div className="donut-info">
            <h3>Batter Donut</h3>
            <p>Dam tempus turpis at metus scelerisque placerat nulla deumantos solicitud...</p>
          </div>
          <p className="price">Rs. 100.00</p>
        </div>
      </div>

      <style jsx>{`
        .donut-menu {
          display: flex;
          padding: 20px;
          background-color: #ffe6ea;
          border-radius: 8px;
        }

        .left-section {
          flex: 1;
          padding: 20px;
          text-align: center;
        }

        .left-section h2 {
          font-size: 28px;
          color: #d9534f;
        }

        .left-section p {
          font-size: 18px;
          color: #d9534f;
          margin-top: 10px;
        }

        .left-section span {
          font-size: 24px;
          font-weight: bold;
        }

        .donuts-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .right-section {
          flex: 2;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .donut-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .donut-item img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .donut-info {
          flex: 1;
        }

        .donut-info h3 {
          margin: 0;
          font-size: 18px;
          color: #d9534f;
        }

        .donut-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }

        .price {
          font-size: 16px;
          font-weight: bold;
          color: #d9534f;
        }

        hr {
          border: none;
          border-top: 1px dashed #ddd;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
