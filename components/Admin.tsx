// "use client";

// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <h3 style={styles.sidebarTitle}>Cake Admin</h3>
//         <ul style={styles.sidebarMenu}>
//           <li style={styles.sidebarItem}>Dash Board</li>
//           <li style={styles.sidebarItem}>Cakes</li>
//           <li style={styles.sidebarItem}>Buyer</li>
//           <li style={styles.sidebarItem}>Baker</li>
//           <li style={styles.sidebarItem}>Orders</li>
//           <li style={styles.sidebarItem}>Payments</li>
//           <li style={styles.sidebarItem}>Delivery</li>
//           <li style={styles.sidebarItem}>Chats</li>
//           <li style={styles.sidebarItem}>Authentication</li>
//           <li style={styles.sidebarItem}>Settings</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main style={styles.mainContent}>
//         <header style={styles.header}>
//           <h2 style={styles.headerTitle}>Dash Board</h2>
//           <div style={styles.notificationIcon}>🔔</div>
//         </header>

//         {/* Stats Section */}
//         <section style={styles.statsSection}>
//           <div style={styles.statsBox}>
//             <h3>$10,552.40</h3>
//             <p>+8.25%</p>
//           </div>
//           <div style={styles.chart}>
//             <img src="/path-to-chart-image.png" alt="Chart" style={styles.chartImage} />
//           </div>
//           <div style={styles.ordersSales}>
//             <div style={styles.stat}>
//               <h4>Orders</h4>
//               <p>310</p>
//             </div>
//             <div style={styles.stat}>
//               <h4>Sales</h4>
//               <p>$3,759.00</p>
//             </div>
//           </div>
//         </section>

//         {/* Bakers Table */}
//         <section style={styles.tableSection}>
//           <h3 style={styles.tableTitle}>Bakers</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeaderRow}>
//                 <th>#</th>
//                 <th>Order ID</th>
//                 <th>Item</th>
//                 <th>Price</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr style={styles.tableRow}>
//                 <td>1</td>
//                 <td>1002</td>
//                 <td>Chocolate Cake</td>
//                 <td>3500</td>
//                 <td>Delivered</td>
//               </tr>
//               <tr style={styles.tableRow}>
//                 <td>2</td>
//                 <td>1057</td>
//                 <td>Vanilla Cake</td>
//                 <td>2500</td>
//                 <td>Pending</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//         {/* Buyers Table */}
//         <section style={styles.tableSection}>
//           <h3 style={styles.tableTitle}>Buyers</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeaderRow}>
//                 <th>#</th>
//                 <th>Order ID</th>
//                 <th>Item</th>
//                 <th>Price</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr style={styles.tableRow}>
//                 <td>1</td>
//                 <td>1002</td>
//                 <td>Chocolate Cake</td>
//                 <td>3500</td>
//                 <td>Delivered</td>
//               </tr>
//               <tr style={styles.tableRow}>
//                 <td>2</td>
//                 <td>1057</td>
//                 <td>Vanilla Cake</td>
//                 <td>2500</td>
//                 <td>Pending</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </main>
//     </div>
//   );
// };

// // Scoped styles using CSS-in-JS
// const styles = {
//   container: {
//     display: "flex",
//     fontFamily: "Arial, sans-serif",
//   },
//   sidebar: {
//     width: "20%",
//     backgroundColor: "#f5f5f5",
//     padding: "20px",
//     height: "100vh",
//   },
//   sidebarTitle: {
//     fontSize: "20px",
//     color: "#333",
//     marginBottom: "20px",
//   },
//   sidebarMenu: {
//     listStyle: "none",
//     padding: 0,
//   },
//   sidebarItem: {
//     marginBottom: "15px",
//     color: "#555",
//     cursor: "pointer",
//     transition: "color 0.2s",
//   },
//   sidebarItemHover: {
//     color: "#d970d9",
//     fontWeight: "bold",
//   },
//   mainContent: {
//     flex: 1,
//     padding: "20px",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#d970d9",
//   },
//   notificationIcon: {
//     fontSize: "24px",
//     cursor: "pointer",
//   },
//   statsSection: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//   },
//   statsBox: {
//     width: "30%",
//     textAlign: "center",
//     background: "#d970d9",
//     color: "white",
//     padding: "20px",
//     borderRadius: "8px",
//   },
//   chart: {
//     width: "40%",
//   },
//   chartImage: {
//     maxWidth: "100%",
//   },
//   ordersSales: {
//     width: "25%",
//   },
//   stat: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   tableSection: {
//     marginTop: "40px",
//   },
//   tableTitle: {
//     color: "#d970d9",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "10px",
//   },
//   tableHeaderRow: {
//     backgroundColor: "#f5f5f5",
//     color: "#333",
//   },
//   tableRow: {
//     borderBottom: "1px solid #ddd",
//   },
//   tableRowHover: {
//     backgroundColor: "#f1f1f1",
//   },
// };

// export default AdminDashboard;
