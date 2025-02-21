"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;

}

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        setProducts(response.data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId: string) => {
    alert(`Edit product: ${productId}`);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/Product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (products.length === 0) return <div className="empty">No products available</div>;

  return (
    <div className="container">
      {/* <h1 className="title">Admin Product Dashboard</h1> */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (LKR)</th>
            <th>category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.image} alt={product.name} className="product-image" />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                {/* <button className="edit-btn" onClick={() => handleEdit(product._id)}>
                  <FaEdit />
                </button> */}
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          padding: 2rem;
          background-color: #f4f4f9;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: #C14679;
          margin-bottom: 2rem;
        }
        .product-table {
          width: 90%;
          max-width: 1200px;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .product-table th,
        .product-table td {
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        .product-table th {
          background-color: #8B3D60;
          color: white;
          font-size: 1.2rem;
        }
        .product-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .product-table tr:hover {
          background-color: pink;
          
        }
        .product-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }
        .edit-btn,
        .delete-btn {
          border: none;
          padding: 8px;
          margin: 5px;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.3s;
        }
        .edit-btn {
          background-color: #c14679;
          color: white;
        }
        .delete-btn {
          background-color: #e63946;
          color: white;
        }
        .edit-btn:hover {
          background-color:rgb(117, 39, 71);
          color:white;
        }
        .delete-btn:hover {
          background-color: #d62828;
        }
        .loading,
        .error,
        .empty {
          font-size: 1.5rem;
          text-align: center;
          margin-top: 50px;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default AdminProductPage;
