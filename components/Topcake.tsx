"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TopCakes = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  }

  const [cakes, setCakes] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        // Fetch only the top 20 cakes
        const response = await axios.get("/api/Product?limit=20");
        setCakes(response.data);
      } catch (error) {
        console.error("Error fetching cakes:", error);
        setError("Failed to load cakes");
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cakes.length === 0) {
    return <div>No cakes available</div>;
  }

  return (
    <div>
      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background-color: #f7f7f7;
          padding: 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #b864d4;
          margin-bottom: 2rem;
        }

        .cake-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .cake-card {
          background-color: #fff;
          border: 1px solid #e2e2e2;
          border-radius: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .cake-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .cake-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cake-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
        }

        .cake-price {
          font-size: 1.125rem;
          color: #777;
        }

        .button-container {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .action-button {
          flex: 1;
          background-color: #b864d4;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          padding: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .action-button:hover {
          background-color: #944bb8;
          transform: translateY(-3px);
        }

        .show-more-button {
          display: block;
          margin: 2rem auto 0;
          background-color: #b864d4;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 1rem;
          text-decoration: none;
          cursor: pointer;
          text-align: center;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .show-more-button:hover {
          background-color: #944bb8;
          transform: translateY(-3px);
        }
      `}</style>

      <div className="landing-container">
        <h2 className="section-title">Top Cakes</h2>

        <div className="cake-grid">
          {cakes.map((cake) => (
            <div key={cake._id} className="cake-card">
              <img
                src={cake.imageUrl || "/default-image.jpg"}
                alt={cake.name}
                className="cake-image"
              />
              <div className="card-content">
                <h3 className="cake-name">{cake.name || "Unnamed Cake"}</h3>
                <p className="cake-price">₹{cake.price || "N/A"}</p>

                {/* Buttons */}
                <div className="button-container">
                  {/* Add to Cart */}
                  <button
                    className="action-button"
                    onClick={() => console.log(`Added ${cake.name} to cart`)}
                  >
                    Add to Cart
                  </button>

                  {/* Buy */}
                  <Link href={`/checkout/${cake._id}`}>
                    <button className="action-button">Buy</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Show More" button */}
        <Link href="/product" className="show-more-button">
          Show More
       </Link>
      </div>
    </div>
  );
};

export default TopCakes;
