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
          max-width: 900px;
          margin: 2rem auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease-in-out;
        }

        .product-details-container:hover {
          transform: translateY(-10px);
        }

        .product-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .product-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }

        .product-price {
          font-size: 2rem;
          font-weight: 600;
          color: #9c27b0;
          margin-bottom: 1.5rem;
        }

        .product-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #777;
          margin-bottom: 1.5rem;
        }

        .product-category,
        .product-stock {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 0.8rem;
        }

        .product-category strong,
        .product-stock strong {
          font-weight: 700;
          color: #333;
        }

        .product-stock {
          color: ${props => (props.stock > 0 ? "#388e3c" : "#d32f2f")};
        }

        .product-description,
        .product-category,
        .product-stock {
          padding: 0 1rem;
        }

        @media (max-width: 768px) {
          .product-details-container {
            padding: 1rem;
          }

          .product-title {
            font-size: 2rem;
          }

          .product-price {
            font-size: 1.6rem;
          }

          .product-image {
            height: 300px;
          }

          .product-description {
            font-size: 1rem;
          }

          .product-category,
          .product-stock {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="product-details-container">
        <img
          src={product.imageUrl}
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
