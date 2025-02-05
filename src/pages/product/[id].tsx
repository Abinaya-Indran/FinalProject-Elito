"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const ProductDetails = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    seller: {
      name: string;
      contact: string;
    };
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
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
    <section style={styles.container}>
      <div style={styles.productImage}>
        <img src={product.image || "/default-image.jpg"} alt={product.name} style={styles.image} />
      </div>

      <div style={styles.details}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>LKR {product.price}</p>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.category}>Category: {product.category}</p>

        {/* Seller Details */}
        <div style={styles.sellerInfo}>
          <h3>Seller Information</h3>
          <p><strong>Seller Name:</strong> {product.seller?.name || "Not Available"}</p>
        </div>

        <div style={styles.addToCart}>
          <Link href={`/order?productId=${product._id}`} passHref>
            <button style={styles.cartButton}>Buy Now</button>
          </Link>
          <Link href="/yourcart" passHref>
            <button style={styles.cartButton}>Add To Cart</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    width: "90%",
    maxWidth: "1200px",
    gap: "70px",
    margin: "80px auto",
    backgroundColor: "#fdfdfd",
    padding: "50px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  productImage: {
    width: "600px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "10px",
    border: "2px solid #ccc",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: "22px",
    color: "#555",
  },
  description: {
    fontSize: "18px",
    color: "#666",
  },
  category: {
    fontSize: "18px",
    color: "#777",
  },
  stock: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#D9534F",
  },
  date: {
    fontSize: "16px",
    color: "#777",
  },
  sellerInfo: {
    padding: "15px",
    backgroundColor: "#f3f3f3",
    borderRadius: "8px",
  },
  addToCart: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    marginTop: "20px",
  },
  cartButton: {
    backgroundColor: "#B864D4",
    color: "white",
    padding: "12px 20px",
    border: "none",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
};

export default ProductDetails;
