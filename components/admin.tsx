"use client";

import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/user?role=buyer"); // Adjust the role as needed
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>Admin Panel</h1>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Dashboard</li>
          <li style={styles.navItem}>Orders</li>
          <li style={styles.navItem}>Cake Listings</li>
          <li style={styles.navItem}>Add New Cake</li>
          <li style={styles.navItem}>Users</li>
          <li style={styles.navItem}>Settings</li>
          <li style={styles.navItem}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.headerTitle}>Welcome, Admin!</h2>
        </header>

        {/* Stats Section */}
        <section style={styles.stats}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>150</h3>
            <p style={styles.statLabel}>Total Orders</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>50</h3>
            <p style={styles.statLabel}>Active Listings</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>20</h3>
            <p style={styles.statLabel}>Pending Orders</p>
          </div>
        </section>

        {/* Users Table Section */}
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
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>{user._id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <button style={styles.actionButton}>View</button>
                    <button style={styles.actionButton}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

// Inline CSS styles (your existing styles)
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#F8F9FA",
    fontSize: "20px",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#E0B0FF",
    color: "black",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    fontWeight: "bold",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    width: "100%",
  },
  navItem: {
    padding: "15px 20px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "8px",
    textAlign: "left",
    marginBottom: "10px",
    transition: "background-color 0.3s",
  },
  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  header: {
    marginBottom: "20px",
  },
  headerTitle: {
    fontSize: "24px",
    color: "#333333",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    flex: 1,
    margin: "0 10px",
  },
  statNumber: {
    fontSize: "32px",
    color: "#6C63FF",
    marginBottom: "10px",
  },
  statLabel: {
    fontSize: "16px",
    color: "#666666",
  },
  tableSection: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    backgroundColor: "#E0B0FF",
    color: "black",
    padding: "10px",
    borderBottom: "1px solid #CCCCCC",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #CCCCCC",
    textAlign: "left",
  },
  actionButton: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#6C63FF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminDashboard;
