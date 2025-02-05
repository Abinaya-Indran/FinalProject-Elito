import { useState, useEffect } from "react";
import Addcake from "./AddCake";
import io from "socket.io-client";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  interface Order {
    _id: string;
    buyerDetails?: {
      name: string;
    };
    cakeId: {
      name: string;
      image: string;
      price: number;
    };
    status: string;
    price: number;
  }
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

    // Fetch orders from API
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch("/api/order"); // Adjust endpoint if needed
          if (!response.ok) throw new Error("Failed to fetch orders");
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
  
      if (activeTab === "Orders") {
        fetchOrders();
      }
    }, [activeTab]);
  
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
  
    const handleDeleteOrder = async (orderId: string) => {
      // Make API call to delete the order
      const response = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOrders(orders.filter((order) => order._id !== orderId));
      } else {
        console.error("Failed to delete order");
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

       
         {/* Orders Section with Fetched Data */}
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
                  <th>Price (LKR)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.buyerDetails?.name || "N/A"}</td>
                      <td>
                        <img
                          src={order.cakeId.image}
                          alt={order.cakeId.name}
                          style={{ width: "50px", height: "50px" }}
                        />
                        {order.cakeId.name}
                      </td>
                      <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                      <td>{order.price}</td>
                      <td>
                        <button onClick={() => handleStatusChange(order._id, "accepted")}>
                          Accept
                        </button>
                        <button onClick={() => handleStatusChange(order._id, "denied")}>
                          Deny
                        </button>
                        <button onClick={() => handleDeleteOrder(order._id)}>
                          Delete
                        </button>
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
          <div className="productsSection">
            <h2>My Cakes</h2>
            <ul className="productList">
              <li>🎂 Chocolate Cake - $40</li>
              <li>🍰 Vanilla Cake - $35</li>
              <li>🧁 Cupcakes - $25</li>
            </ul>
          </div>
        )}

        {/* Add Cake Section */}
        {activeTab === "Add Cake" && (
          <div className="addCakeSection">
            <Addcake/>
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

        /* Sidebar */
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

        /* Main Content */
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

        .addBtn {
          margin-top: 10px;
          background: #6a1b9a;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
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
