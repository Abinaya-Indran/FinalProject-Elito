"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ProductPage = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by maximum price
    if (maxPrice !== null) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, maxPrice, products]);

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
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #b864d4;
          margin-bottom: 2rem;
        }

        .filter-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .filter-input,
        .filter-select {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          justify-items: center;
        }

        .product-card {
          background-color: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 500px;
          text-align: center;
          margin: 0 auto;
          position: relative;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #e2e2e2;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-image {
          opacity: 0.9;
        }

        .card-content {
          padding: 1rem;
          background: linear-gradient(145deg, #f7f7f7, #ffffff);
          position: relative;
        }

        .product-name {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }

        .product-price {
          font-size: 1.125rem;
          color: #b864d4;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .add-to-cart-button {
          background-color: #b864d4;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          width: 100%;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .add-to-cart-button:hover {
          background-color: #944bb8;
          transform: scale(1.05);
        }

        .add-to-cart-button:focus {
          outline: none;
        }
      `}</style>

      <div className="page-container">
        <h1 className="page-title">Our Cakes</h1>

        <div className="filter-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="number"
            className="filter-input"
            placeholder="Max Price"
            value={maxPrice === null ? "" : maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value, 10) : null)
            }
          />
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
               <img
                  src={product.image} // Direct Cloudinary URL
                  alt={product.name || "Unnamed Cake"}
                  className="product-image"
                  width={200}
                  height={200}
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
