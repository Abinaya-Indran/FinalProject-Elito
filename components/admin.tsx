"use client";

import React, { useEffect, useState } from "react";
import AddProduct from "./AddCake";
import AdminProductPage from "./adminProduct";
import AddcakePage from "@/pages/addcake";


interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: string;
  sellerType?: string;
  cakeShopName?: string;
}

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Track active section
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (activeSection === "Users") {
      fetchUsers();
    }
    if (activeSection === "Orders") {
      fetchOrders();
    }
    if (activeSection === "Payment details") {
      fetchPaymentDetails();
    }
  }, [activeSection]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/user");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/order");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment"); // Update with your actual API endpoint
      if (!response.ok) throw new Error("Failed to fetch payment details");
      const data = await response.json();
      setPaymentDetails(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleView = async (userId: string) => {
    try {
      const res = await fetch("/api/user/getuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedUser(data.user);
        setModalOpen(true);
      } else {
        alert("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>Admin Panel</h1>
        <ul style={styles.navList}>
          {["Dashboard", "Orders", "Cake Listings", "Add New Cake", "Users", "Payment details"].map((item) => (
            <li
              key={item}
              style={activeSection === item ? styles.navItemActive : styles.navItem}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>{activeSection}</h2>
        </header>

        {/* Render Section Based on Selected Menu Item */}
        {activeSection === "Dashboard" && (
          <section style={styles.stats}>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>150</h3>
              <p style={styles.statLabel}>Total Orders</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>50</h3>
              <p style={styles.statLabel}>Delivered</p>
            </div>
            <div style={styles.statCard}>
              <h3 style={styles.statNumber}>20</h3>
              <p style={styles.statLabel}>Pending Orders</p>
            </div>
          </section>
        )}

         {/* Orders Section */}
         {activeSection === "Orders" && (
          <section style={styles.tableSection}>
            <h3 style={styles.sectionTitle}>Orders</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Cake ID</th>
                  <th style={styles.th}>Buyer ID</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} style={index % 2 === 0 ? styles.rowEven : {}}>
                    <td style={styles.td}>{order._id}</td>
                    <td style={styles.td}>{order.cakeId}</td>
                    <td style={styles.td}>{order.buyerId}</td>
                    <td style={styles.td}>{order.status}</td>
                    <td style={styles.td}>
                      <button style={{ ...styles.actionButton, ...styles.viewButton }}>View</button>
                      <button style={{ ...styles.actionButton, ...styles.editButton }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Add New Cake Section */}
        {activeSection === "Add New Cake" && (
          <section>
            <AddcakePage/>
          </section>
        )}
        
        {/* Cake Listings Section */}
        {activeSection === "Cake Listings" && (
          <section>
            <AdminProductPage/>
          </section>
        )}

         {/* Payment Details Section */}
         {activeSection === "Payment details" && (
          <section style={styles.tableSection}>
            <h3 style={styles.sectionTitle}>Payment Details</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Payment ID</th>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentDetails.map((payment, index) => (
                  <tr key={payment._id} style={index % 2 === 0 ? styles.rowEven : {}}>
                    <td style={styles.td}>{payment._id}</td>
                    <td style={styles.td}>{payment.orderId}</td>
                    <td style={styles.td}>{payment.amount}</td>
                    <td style={styles.td}>{payment.status}</td>
                    <td style={styles.td}>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Users Section */}
        {activeSection === "Users" && (
          <section style={styles.tableSection}>
            <h3 style={styles.sectionTitle}>Users</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>User ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} style={index % 2 === 0 ? styles.rowEven : {}}>
                    <td style={styles.td}>{user._id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.role}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>
                       <button onClick={() => handleView(user._id)}>View</button>
                      {/* <button style={{ ...styles.actionButton, ...styles.editButton }}>Edit</button> */}
                    </td>
                  </tr>
                ))}
                 {modalOpen && selectedUser && (
                  <div className="modal">
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    {selectedUser.phoneNumber && <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>}
                    {selectedUser.address && <p><strong>Address:</strong> {selectedUser.address}</p>}
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                    {selectedUser.role === "Seller" && (
                      <>
                        <p><strong>Seller Type:</strong> {selectedUser.sellerType}</p>
                        {selectedUser.sellerType === "Cake Shop" && selectedUser.cakeShopName && (
                          <p><strong>Cake Shop Name:</strong> {selectedUser.cakeShopName}</p>
                        )}
                      </>
                    )}
                    <button onClick={() => setModalOpen(false)}>Close</button>
                  </div>
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

// 🌟 Improved Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    display: "flex", 
    height: "100vh", 
    backgroundColor: " #F7F7F7", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  sidebar: {
    width: "250px",
    backgroundColor: " #EDEDED",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  logo: { 
    fontSize: "26px", 
    color:"#333",
    fontWeight: "bold", 
    marginBottom: "20px", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  navList: { 
    listStyleType: "none", 
    padding: 0, 
    width: "100%", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  navItem: {
    padding: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    transition: "0.3s",
    marginBottom: "10px",
    backgroundColor: " #8B3D60",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  navItemActive: {
    padding: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    transition: "0.3s",
    marginBottom: "10px",
    backgroundColor: " #C14679",
    color: "",
    fontWeight: "bold",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  main: { 
    flex: 1, 
    padding: "20px", 
    overflowY: "auto", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "20px", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  headerTitle: { 
    fontSize: "24px", 
    color: "#333", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  stats: { 
    display: "flex", 
    justifyContent: "space-between", 
    marginBottom: "20px", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "0 10px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  statNumber: { 
    fontSize: "28px", 
    fontWeight: "bold", 
    color: "#C14679", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  tableSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  sectionTitle: { 
    fontSize: "20px", 
    fontWeight: "bold", 
    marginBottom: "10px", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  th: {
    padding: "12px",
    backgroundColor: "#8B3D60",
    color: "#fff",
    textAlign: "left",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  tdHover: {
    backgroundColor: "pink",
  },

  rowEven: { 
    backgroundColor: "#f9f9f9", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  actionButton: { 
    padding: "6px 12px", 
    borderRadius: "5px", 
    border: "none", 
    cursor: "pointer", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  viewButton: { 
    backgroundColor: "#C14679", 
    color: "#fff", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },

  editButton: { 
    backgroundColor: "#gray", 
    color: "#333", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" // Add sans-serif font stack
  },
};

export default AdminDashboard;
