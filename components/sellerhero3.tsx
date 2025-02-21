'use client';

import React from "react";

const SellerHero3: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h2>
          Create your store in <span>5 Minutes!</span><br />
          Start selling within <span>24 Hours!</span>
        </h2>
      </div>
      <style jsx>{`
        .hero-section {
          position: relative;
          background: #C64B8C;
          color: white;
          text-align: center;
          padding: 50px 20px;
          overflow: hidden;
        }
        .overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 30%;
          height: 100%;
          background:#F7F7F7;
          clip-path: polygon(100% 0, 100% 100%, 0 70%);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2.5rem;
          font-weight: bold;
          line-height: 1.3;
        }
        span {
          color: #BFF6F2;
        }
        @media (max-width: 768px) {
          .overlay {
            clip-path: polygon(100% 0, 100% 100%, 0 85%);
          }
          h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SellerHero3;