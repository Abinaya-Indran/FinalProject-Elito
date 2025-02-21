"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa"; // Import icons
import product from "../models/product";
import toast from "react-hot-toast";

const ProductPage = () => {
  interface Product {
    _id: string;
    sellerId: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        setProducts(response.data);
        setFilteredProducts(response.data);
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

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Added name filter
      );
    }
  
    if (maxPrice !== null) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, maxPrice, products]);

  const addToCart = async (id: string) => {
    try {
      // Fetch userId from cookies
      const cookieResponse = await axios.get('/app/cookie');
      const userId = cookieResponse.data.userId;
  
      if (!userId) {
        toast.error('Please log in to add items to your cart.');
        return;
      }
  
      // Add product to cart in the database
      const response = await axios.post('/api/cart', {
        userId: userId,
        productId: id,
        quantity: 1,
      });
  
      if (response.status === 200 && response.data.product) {
        // Update local state with new cart data
        setCart((prevCart) => [...prevCart, response.data.product]);
  
        // Save cart to localStorage (optional)
        localStorage.setItem("cart", JSON.stringify([...cart, response.data.product]));
  
        toast.success('Product added to your cart.');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <div>
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background-color:#F7F7F7;
          padding: 2rem;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color:#333;
          margin-bottom: 2rem;
        }
        .filter-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        .filter-input {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 3rem;
          justify-items: center;
         
        }
        .product-card {
          background-color:white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px rgba(54, 54, 54, 0.48);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 400px;
          text-align: center;
          margin: 0 auto;
          position: relative;
          cursor: pointer;
        }
        .product-card:hover {
          // transform: translateY(-10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }
        .product-image {
          width: 100%;
          height: 350px;
          object-fit:fill;
          border-bottom: 1px solid white;
        }
        .card-content {
          padding: 1rem;
          background: linear-gradient(145deg,white,white);
          position: relative;
          background-color:"#AF0171";
        }
        .product-name {
          font-size: 1.2rem;
          font-weight:bold;
          color:#262626;
          margin-bottom: 0.5rem;
        }
        .product-price {
          font-size: 1.0rem;
          color:#C14679;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .ratings {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }
        .star {
          color: #ffd700;
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }
        .buttons-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        
        }
        .view-details { 
          background-color: #C14679;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          flex-grow: 1;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .view-details:hover {
          background-color: #A13A66;
          transform: scale(1.05);
        }
        .cart-button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          color:#C14679;
          transition: transform 0.3s ease;
          background-color:white;
          
        }
        .cart-button:hover {
          transform: scale(1.2);
          color: #A13A66;
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
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="card-content">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">LKR {product.price}</p>


                <div className="buttons-container">
                  <Link href={`/product/${product._id}`}>
                    <button className="view-details hover-button">View Details</button>
                  </Link>
                  <button
                    className="cart-button"
                    onClick={() => addToCart(product._id)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
