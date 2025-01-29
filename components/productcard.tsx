// src/app/components/ProductDetails.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Type definition for product
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
}

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query; // Get the productId from URL

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        // Ensure the correct API path (lowercase 'product')
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle loading, error, and no product found
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <style jsx>{`
        .details-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1rem;
          background-color: #fff;
          border: 1px solid #e2e2e2;
          border-radius: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .details-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1rem;
        }

        .details-content {
          padding: 1rem;
        }

        .details-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }

        .details-price {
          font-size: 1.5rem;
          color: #777;
          margin: 1rem 0;
        }

        .details-description {
          font-size: 1.125rem;
          color: #555;
        }

        .details-category {
          margin-top: 1rem;
          font-size: 1rem;
          color: #888;
        }

        .details-stock {
          margin-top: 1rem;
          font-size: 1rem;
          color: ${product.stock > 0 ? "#4caf50" : "#f44336"};
        }
      `}</style>

      <div className="details-container">
        <img
          src={product.imageUrl || "/default-image.jpg"} // Default image if none provided
          alt={product.name}
          className="details-image"
        />
        <div className="details-content">
          <h1 className="details-title">{product.name}</h1>
          <p className="details-price">₹{product.price}</p>
          <p className="details-description">
            {product.description || "No description available."}
          </p>
          <p className="details-category">
            Category: {product.category || "Uncategorized"}
          </p>
          <p className="details-stock">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
