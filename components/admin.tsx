"use client";

import React from "react";

const AdminDashboard = () => {
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

        {/* Table Section */}
        <section style={styles.tableSection}>
          <h3 style={styles.sectionTitle}>Recent Orders</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Cake Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>#001</td>
                <td style={styles.td}>John Doe</td>
                <td style={styles.td}>Birthday Cake</td>
                <td style={styles.td}>Delivered</td>
                <td style={styles.td}>
                  <button style={styles.actionButton}>View</button>
                  <button style={styles.actionButton}>Edit</button>
                </td>
              </tr>
              <tr>
                <td style={styles.td}>#002</td>
                <td style={styles.td}>Jane Smith</td>
                <td style={styles.td}>Wedding Cake</td>
                <td style={styles.td}>Pending</td>
                <td style={styles.td}>
                  <button style={styles.actionButton}>View</button>
                  <button style={styles.actionButton}>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

// Inline CSS styles
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#F8F9FA",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#6C63FF",
    color: "#FFFFFF",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    textAlign: "center",
    marginBottom: "10px",
    transition: "background-color 0.3s",
  },
  navItemHover: {
    backgroundColor: "#5048E5",
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
    backgroundColor: "#6C63FF",
    color: "#FFFFFF",
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
