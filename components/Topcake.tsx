"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TopCakes = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: number; // Add the rating field
  }

  const [cakes, setCakes] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get("/api/Product?limit=20"); // Fetch the top 20 cakes
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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Display full stars based on rating
    const halfStar = rating % 1 !== 0; // Display half star if there's a decimal

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">&#9733;</span>); // Full star
    }
    if (halfStar) {
      stars.push(<span key={fullStars} className="star half">&#9733;</span>); // Half star
    }
    return stars;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (cakes.length === 0) {
    return <div className="no-cakes">No cakes available</div>;
  }

  return (
    <div className="top-cakes-container">
      <h2 className="section-title">Top Cakes</h2>

      <div className="cake-grid">
        {cakes.map((cake) => (
          <div key={cake._id} className="cake-card">
            <img
              src={cake.image || "/default-image.jpg"}
              alt={cake.name || "Unnamed Cake"}
              className="cake-image"
            />
            <div className="card-content">
              <h3 className="cake-name">{cake.name || "Unnamed Cake"}</h3>
              <p className="cake-price">₹{cake.price || "N/A"}</p>

              <div className="cake-rating">
                {renderStars(cake.rating)} {/* Display stars based on rating */}
              </div>

              <div className="button-container">
                <button
                  className="action-button"
                  onClick={() => console.log(`Added ${cake.name} to cart`)}
                >
                  Add to Cart
                </button>
                {/* <Link href={`/checkout/${cake._id}`}>
                  <button className="action-button">Buy</button>
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/product" className="show-more-link">
        <button className="show-more-button">Show More</button>
      </Link>

      <style jsx>{`
        .top-cakes-container {
          padding: 2rem;
          background-color: #f7f7f7;
          border-radius: 1rem;
          min-height: 100vh;
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
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 3rem;
          justify-items: center;
        }

        .cake-card {
          background-color: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 900px;
          text-align: center;
          position: relative;
          cursor: pointer;
        }

        .cake-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }

        .cake-image {
          width: 100%;
          height: 350px;
          object-fit: cover;
          border-bottom: 1px solid #e2e2e2;
          transition: opacity 0.3s ease;
        }

        .cake-card:hover .cake-image {
          opacity: 0.9;
        }

        .card-content {
          padding: 1rem;
          background: linear-gradient(145deg, #f7f7f7, #ffffff);
        }

        .cake-name {
          font-size: 1.4rem;
          font-weight:bold;
          color: #333;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }

        .cake-price {
          font-size: 1.5rem;
          color: #b864d4;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .cake-rating {
          margin-bottom: 1rem;
          font-size: 1.7rem;
          color: #f1c40f; /* Gold color for the stars */
        }

        .star {
          margin-right: 0.2rem;
        }

        .star.full {
          color: #f1c40f;
        }

        .star.half {
          color: #f39c12;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .action-button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          background-color: #b864d4;
          border: none;
          border-radius: 0.5rem;
          width: 100%;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .action-button:hover {
          background-color: #944bb8;
          transform: scale(1.05);
        }

        .show-more-link {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .show-more-button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          background-color: #b864d4;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .show-more-button:hover {
          background-color: #944bb8;
          transform: scale(1.05);
        }

        .loading,
        .error,
        .no-cakes {
          text-align: center;
          font-size: 1.2rem;
          color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default TopCakes;
