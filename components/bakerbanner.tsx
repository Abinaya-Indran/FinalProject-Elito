"use client";

import Link from "next/link"; 

export default function Home() {
  return (
    <div className="container">
      <main className="hero">
        <div className="text-section">
          <h1>Start selling cakes</h1>

          <Link href="/sellersignup" passHref>
            <button className="cta-button">Create your store</button>
          </Link>
        </div>
        <div className="image-section">
        
          <img
            src="/images/baker.jpg"
            alt="Baker preparing cakes"
            className="hero-image"
          />
          <img
            src="/images/bakerbanner2.webp"
            alt="Baker preparing cakes"
            className="hero-image"
          />
         

        </div>
      </main>

      <style jsx>{`
        /* General Styles */
        .container {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Hero Section */
        .hero {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 40px 20px;
          background-color: #f9f9f9;
        }

        .text-section {
          flex: 1;
          padding: 20px;
        }

        .text-section h1 {
          font-size: 48px;
          color: #333;
          margin-bottom: 20px;
        }

        .cta-button {
          padding: 15px 30px;
          background-color: #ff6384;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .cta-button:hover {
          background-color: #e55774;
        }

        .image-section {
          display:flex;
          flex: 2;
          width:30%;
        }

        .hero-image {
          max-width: 100%;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
