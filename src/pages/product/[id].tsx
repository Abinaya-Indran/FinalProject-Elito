"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ProductDetails = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    category: string;
    stock: number;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; // Wait until the route is fully loaded
      try {
        const response = await axios.get(`/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <style jsx>{`
        .product-details-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1rem;
          background: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .product-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1rem;
        }

        .product-price {
          font-size: 1.5rem;
          color: #b864d4;
          margin-bottom: 1rem;
        }

        .product-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .product-category,
        .product-stock {
          font-size: 1rem;
          color: #777;
        }
      `}</style>

      <div className="product-details-container">
        <img
          src={product.imageUrl || "/default-image.jpg"}
          alt={product.name}
          className="product-image"
        />
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">₹{product.price}</p>
        <p className="product-description">{product.description || "No description available."}</p>
        <p className="product-category">
          <strong>Category:</strong> {product.category || "Uncategorized"}
        </p>
        <p className="product-stock">
          <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
