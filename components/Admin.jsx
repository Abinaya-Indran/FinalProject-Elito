import React from "react";


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Cake Admin</h3>
        <ul>
          <li>Dash Board</li>
          <li>Cakes</li>
          <li>Buyer</li>
          <li>Baker</li>
          <li>Orders</li>
          <li>Payments</li>
          <li>Delivery</li>
          <li>Chats</li>
          <li>Authentication</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h2>Dash Board</h2>
          <div className="notification-icon">🔔</div>
        </header>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-box">
            <h3>$10,552.40</h3>
            <p>+8.25%</p>
          </div>
          <div className="chart">
            <img src="path-to-chart-image.png" alt="Chart" />
          </div>
          <div className="orders-sales">
            <div className="stat">
              <h4>Orders</h4>
              <p>310</p>
            </div>
            <div className="stat">
              <h4>Sales</h4>
              <p>$3,759.00</p>
            </div>
          </div>
        </section>

        {/* Bakers Table */}
        <section className="table-section">
          <h3>Bakers</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Item</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1002</td>
                <td>Chocolate Cake</td>
                <td>3500</td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1057</td>
                <td>Vanilla Cake</td>
                <td>2500</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Buyers Table */}
        <section className="table-section">
          <h3>Buyers</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Item</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1002</td>
                <td>Chocolate Cake</td>
                <td>3500</td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1057</td>
                <td>Vanilla Cake</td>
                <td>2500</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
