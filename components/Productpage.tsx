"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ProductPage = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background-color: #f7f7f7;
          padding: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background-color: #fff;
          border: 1px solid #e2e2e2;
          border-radius: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .product-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card-content {
          padding: 1rem;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
        }

        .product-price {
          font-size: 1.125rem;
          color: #777;
          margin-top: 0.5rem;
        }

        .add-to-cart-button {
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          width: 100%;
          margin-top: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .add-to-cart-button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="page-container">
        <h1 className="page-title">Our Cakes</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl || "/default-image.jpg"}
                alt={product.name}
                className="product-image"
              />
              <div className="card-content">
                <h2 className="product-name">{product.name || "Unnamed Cake"}</h2>
                <p className="product-price">₹{product.price || "N/A"}</p>
                <Link href="/yourcart">
                  <button className="add-to-cart-button">Add to Cart</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
