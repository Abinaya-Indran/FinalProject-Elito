"use client";

import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
    <div className="container">
      <main className="hero">
        <div className="text-section">
          <h1>Start Selling & Grow Your Business with Elito</h1>
          <p>Join Elito and reach more customers with ease. List your cakes, manage orders, and boost your sales effortlessly!</p><br/><br/>
          <Link href="/register" passHref>
            <button className="cta-button">Become a seller</button>
          </Link>
        </div>
        <div className="image-section">
        
          <Image
            src="/images/woman-putting-walnut-top-classic-cake-decorated-with-figs-syrup.jpg"
            alt="Baker preparing cakes"
            className="hero-image"
            width={600}
            height={700} 
          />
          <Image
            src="/images/bakerbanner2.webp"
            alt="Baker preparing cakes"
            className="hero-image"
            width={600}
            height={700}
          />
         

        </div>
      </main>

      <style jsx>{`
        /* General Styles */
        .container {
          fontFamily: "poppins, sans-serif",
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow:hidden;
        }

        /* Hero Section */
        .hero {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 40px 20px;
          background-color: white;
        }

        .text-section {
          flex: 1;
          padding: 20px;
           fontFamily: 'Poppins',
        }

        .text-section h1 {
          font-size: 40px;
          color: #333;
          margin-bottom: 20px;
          fontFamily: "poppins,sans-serif",
        }
        .text-section p{
          font-size: 20px;
          color: #333;
          margin-bottom: 20px;
          fontFamily: "poppins,sans-serif",
        }

        .cta-button {
          padding: 15px 30px;
          background-color:#C14679;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 20px;
          cursor: pointer;
          fontFamily: "poppins, sans-serif",
        }

        .cta-button:hover {
            background-color: #A13A66 ;
            transform: scale(1.06);
        }

        .image-section {
          display:flex;
          flex: 2;
          width:30%;
        }

        .hero-image {
          max-width: 50%;
          border-radius: 8px;
        }
       
      `}</style>
    </div>
  );
}
