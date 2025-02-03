"use client";

import React, { useEffect, useState } from "react";
import AddProduct from "./AddCake";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Track active section
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeSection === "Users") {
      fetchUsers();
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

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>Admin Panel</h1>
        <ul style={styles.navList}>
          {["Dashboard", "Orders", "Cake Listings", "Add New Cake", "Users", "Settings", "Logout"].map((item) => (
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
          <section>
            <h3>Order Management Coming Soon...</h3>
          </section>
        )}

        {/* Add New Cake Section */}
        {activeSection === "Add New Cake" && (
          <section>
            <AddProduct />
          </section>
        )}
        
        {/* Cake Listings Section */}
        {activeSection === "Cake Listings" && (
          <section>
            <h3>Cake Listings Coming Soon...</h3>
          </section>
        )}

        {/* Settings Section */}
        {activeSection === "Settings" && (
          <section>
            <h3>Settings Coming Soon...</h3>
          </section>
        )}
        
        {/* Logout Section */} 
        {activeSection === "Logout" && (
          <section>
            <h3>Logout Coming Soon...</h3>
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
                      <button style={{ ...styles.actionButton, ...styles.viewButton }}>View</button>
                      <button style={{ ...styles.actionButton, ...styles.editButton }}>Edit</button>
                    </td>
                  </tr>
                ))}
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
  container: { display: "flex", height: "100vh", backgroundColor: "#F4F7FC" },

  sidebar: {
    width: "250px",
    backgroundColor: "#4B0082",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
  },

  logo: { fontSize: "26px", fontWeight: "bold", marginBottom: "20px" },

  navList: { listStyleType: "none", padding: 0, width: "100%" },

  navItem: {
    padding: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    transition: "0.3s",
    marginBottom: "10px",
    backgroundColor: "#663399",
    color: "#fff",
  },

  navItemActive: {
    padding: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px",
    transition: "0.3s",
    marginBottom: "10px",
    backgroundColor: "#FFD700",
    color: "#4B0082",
    fontWeight: "bold",
  },

  main: { flex: 1, padding: "20px", overflowY: "auto" },

  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },

  headerTitle: { fontSize: "24px", color: "#333" },

  stats: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "0 10px",
  },

  statNumber: { fontSize: "28px", fontWeight: "bold", color: "#4B0082" },

  tableSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },

  sectionTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },

  th: {
    padding: "12px",
    backgroundColor: "#4B0082",
    color: "#fff",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },

  rowEven: { backgroundColor: "#f9f9f9" },

  actionButton: { padding: "6px 12px", borderRadius: "5px", border: "none", cursor: "pointer" },

  viewButton: { backgroundColor: "#4B0082", color: "#fff" },

  editButton: { backgroundColor: "#ff9800", color: "#fff" },
};

export default AdminDashboard;
