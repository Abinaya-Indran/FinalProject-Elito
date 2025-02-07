// src/components/SellerDashboard.tsx
import { useState, useEffect } from "react";
import Addcake from "./AddCake"; // Assuming you have an AddCake component
import axios from "axios";
import { response } from "express";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  interface Order {
    _id: string;
    buyerDetails?: {
      firstName: string;
      lastName: string;
    };
    cakeId: {
      image: string;
      name: string;
    };
    status: string;
    price: number;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
    category:string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [id, setId] = useState<string>('')


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        const userId = data?.user?.userId;
        setId(userId);
  
        if (userId) {
          const [productRes, orderRes] = await Promise.all([
            axios.post('/api/Product/getbyuserid', { userId }),
            axios.post('/api/order/getbyuserid', { userId })
          ]);
  
          setProducts(productRes.data.cakes);
          setOrders(orderRes.data.orders);
        }
      } catch (error) {
        toast.error('Error fetching user data');
      }
    };
  
    fetchUser();
  }, [activeTab]); 
  
  console.log(orders)
  
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Make API call to update the order status
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder.order._id ? updatedOrder.order : order
        )
      );
    } else {
      console.error("Failed to update order status");
    }
  };
  

  // const handleDeleteOrder = async (orderId: string) => {
  //   try {
  //     const response = await axios.delete(`/api/order/${orderId}`);
  //     if (response.status === 200) {
  //       setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  //     }
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //   }
  // };

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

  const handleEditCake = async (productId: string, updatedProduct: { name: string; price: number; image: string }) => {
    console.log("Editing Product ID:", productId);
    console.log("Updated Data:", updatedProduct);
  
    try {
      const response = await axios.put(`/api/Product/${productId}`, updatedProduct);
      console.log("API Response:", response);
  
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, ...updatedProduct } : product
          )
        );
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.error("Edit Product Error:", error);
      toast.error("Failed to update product");
    }
  };
  
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout"); // Adjust based on your API
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Elito Seller</h2>
        <nav>
          <ul className="navList">
            {["Dashboard", "Orders", "Products", "Add Cake", "Profile"].map((tab) => (
              <li key={tab}>
                <button
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="mainContent">
        <header className="topHeader">
          <h1>{activeTab}</h1>
          <button className="logoutBtn">Logout</button>
        </header>

        {/* Notification */}
        {notifications.length > 0 && (
          <div className="notificationBanner">
            {notifications[notifications.length - 1]}
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "Dashboard" && (
          <div className="statsContainer">
            <div className="statBox">
              <h3>Total Sales</h3>
              <p>$10,500</p>
            </div>
            <div className="statBox">
              <h3>Orders</h3>
              <p>240</p>
            </div>
            <div className="statBox">
              <h3>Cakes Listed</h3>
              <p>50</p>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeTab === "Orders" && (
          <div className="ordersSection">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Cake</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{`${order.buyerDetails?.firstName} ${order.buyerDetails?.lastName}` || "N/A"}</td>
                      <td>
                      <img
                        src={order.cakeId?.image || ""}
                        alt={order.cakeId?.name || "Cake"}
                        style={{ width: "50px", height: "50px" }}
                      />
                      {order.cakeId?.name || ""}
                      </td>
                      <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>

                      <td>
                        <button onClick={() => handleStatusChange(order._id, "accepted")}>Accept</button>
                        <button onClick={() => handleStatusChange(order._id, "denied")}>Deny</button>
                       
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Products Section */}
        {activeTab === "Products" && ( 
           <div className="container">
              <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
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
                    <td>LKR{product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>
                        <button onClick={() => handleEditCake(product._id, { name: product.name, price: product.price, image: product.image })}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)}>
                        🗑️ Delete
                      </button>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Cake Section */}
        {activeTab === "Add Cake" && (
          <div className="addCakeSection">
            <Addcake />
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "Profile" && (
          <div className="profileSection">
            <h2>Seller Profile</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Phone:</strong> +123456789</p>
          </div>
        )}
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .dashboardContainer {
          display: flex;
          height: 100vh;
          background-color: #f9f9f9;
        }

        .sidebar {
          width: 250px;
          background: linear-gradient(135deg, #4a148c, #6a1b9a);
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .logo {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .navList {
          list-style: none;
        }

        .navList li {
          margin: 10px 0;
        }

        .navList button {
          width: 100%;
          color: white;
          background: none;
          border: none;
          padding: 12px;
          border-radius: 5px;
          font-size: 16px;
          text-align: left;
          cursor: pointer;
          transition: 0.3s;
        }

        .navList button:hover,
        .navList .active {
          background: rgba(255, 255, 255, 0.2);
        }

        .mainContent {
          flex: 1;
          padding: 20px;
        }

        .topHeader {
          display: flex;
          justify-content: space-between;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .logoutBtn {
          background: #ff3b3b;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .statsContainer {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .statBox {
          flex: 1;
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
        }

        .ordersSection, .productsSection, .addCakeSection, .profileSection {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .productList {
          list-style: none;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        table th, table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .product-table th, .product-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .product-table th {
          background-color:#6a1b9a;
          color:white;
          font-weight: bold;
        }
        .product-table tr:nth-child(even) {
          background-color: #fafafa;
        }
        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .status.shipped {
          color: green;
          font-weight: bold;
        }

        .status.pending {
          color: orange;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .dashboardContainer {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default SellerDashboard;
