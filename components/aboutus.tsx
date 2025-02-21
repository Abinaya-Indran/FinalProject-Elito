"use client";

import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <section className="about-us">
      <h2 className="title">ABOUT US</h2>
      <div className="content">
        <div className="image-container">
          <img
            src="/images/close-up-woman-with-delicious-cupcakes.jpg"
            alt="Baked goods"
          />
        </div>
        <div className="text-container">
          <h3 className="subtitle">
            PROVIDING QUALITY BAKED GOODS FOR ALL CUSTOMERS
          </h3>
          <p className="description">
            {activeTab === "mission" &&
              "Our mission is to create a bakery that makes the best quality baked goods on-site from scratch, and where both employees and customers feel comfortable."}
            {activeTab === "values" &&
              "Our values include quality, integrity, and customer satisfaction. We strive to deliver freshly baked goods made with the best ingredients."}
            {activeTab === "goals" &&
              "Our goal is to expand our bakery business globally while maintaining high standards in taste, hygiene, and customer service."}
          </p>
          <div className="icons">
            <div className="icon">
              <img src="/images/muffin_17519788.png" alt="Quality" />
              <span>Quality</span>
            </div>
            <div className="icon">
              <img src="/images/fresh_6718209.png" alt="Freshness" />
              <span>Freshness</span>
            </div>
            <div className="icon">
              <img src="/images/career_9647991.png" alt="Passion" />
              <span>Passion</span>
            </div>
          </div>
          <div className="mission-values">
            <div
              className={`item ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              <span className="number">01</span>
              <span className="label">OUR MISSION</span>
            </div>
            <div
              className={`item ${activeTab === "values" ? "active" : ""}`}
              onClick={() => setActiveTab("values")}
            >
              <span className="number">02</span>
              <span className="label">OUR VALUES</span>
            </div>
            <div
              className={`item ${activeTab === "goals" ? "active" : ""}`}
              onClick={() => setActiveTab("goals")}
            >
              <span className="number">03</span>
              <span className="label">OUR GOALS</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-us {
          text-align: center;
          padding: 50px 20px;
        }
        .title {
          font-size: 50px;
          font-weight: bold;
          margin-bottom: 50px;
          color: #262626;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          max-width: 1000px;
          margin: 20px auto;
        }
        .image-container {
          flex: 1;
          padding-right: 50px;
        }
        .image-container img {
          width: 100%;
          border-radius: 10px;
        }
        .text-container {
          flex: 1;
          text-align: left;
        }
        .subtitle {
          font-size: 30px;
          font-weight: bold;
          color: #262626;
        }
        .description {
          margin: 15px 0;
          font-size: 18px;
          color: #555;
          transition: opacity 0.3s ease-in-out;
        }
        .mission-values {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          gap: 30px;
        }
        .item {
          text-align: center;
          color: #999;
          font-size: 20px;
          cursor: pointer;
          padding: 10px 20px;
          transition: color 0.3s ease-in-out;
        }
        .item:hover {
          color: #c14679;
        }
        .item .number {
          font-size: 32px;
          font-weight: bold;
        }
        .item.active {
          color: #C14679;
        }
        .item.active .number {
          color: #C14679;
        }
           .icons {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-top: 50px;
        }
        .icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .icon img {
          width: 50px;
          height: 50px;
        }
        .icon span {
          font-size: 16px;
          color: #262626;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .content {
            flex-direction: column;
            text-align: center;
          }
          .text-container {
            text-align: center;
          }
          .mission-values {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
