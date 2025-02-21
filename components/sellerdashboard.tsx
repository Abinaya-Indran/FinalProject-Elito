// src/components/SellerDashboard.tsx
import { useState, useEffect } from "react";
import Addcake from "./AddCake"; // Assuming you have an AddCake component
import axios from "axios";
import { response } from "express";
import toast from "react-hot-toast";
import Profile from "./editprofile"; // Assuming you have a Profile component


interface Order {
  _id: string;
  status: string;
  buyerDetails?: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    address: string;
  };
  deliveryDate: string;
  cakeDetails: {
    image: string;
    name: string;
  };
  deliveryDetails: {
    deliveryCity: string;
    deliveryArea: string;
    deliveryDate: string;
  };
}

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Buyer Name:</strong> {order.buyerDetails?.firstName} {order.buyerDetails?.lastName}</p>
        <p><strong>Phone:</strong> {order.buyerDetails?.phoneNumber}</p>
        <p><strong>City:</strong> {order.buyerDetails?.city}</p>
        <p><strong>Address:</strong> {order.buyerDetails?.address}</p>
        <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
        <p><strong>Cake Name:</strong> {order.cakeDetails.name}</p>
        <img src={order.cakeDetails.image} alt={order.cakeDetails.name} className="modal-image" />
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const [orders, setOrders] = useState<Order[]>([]);
  interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
    category:string;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
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

    // Open edit modal with product details
    const handleEditCake = (product: Product) => {
      setSelectedProduct(product);
      setEditModalOpen(true);
    };
  
    // Handle input change in edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (selectedProduct) {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
      }
    };
  
    // Save changes
    const handleSaveEdit = async () => {
      if (!selectedProduct) return;
  
      try {
        const response = await axios.put(`/api/Product/${selectedProduct._id}`, selectedProduct);
  
        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === selectedProduct._id ? { ...product, ...selectedProduct } : product
            )
          );
          toast.success("Product updated successfully");
          setEditModalOpen(false);
        }
      } catch (error) {
        toast.error("Failed to update product");
      }
    };
  
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

  console.log(orders);
  
  // const handleLogout = async () => {
  //   try {
  //     await axios.post("/api/logout"); // Adjust based on your API
  //     window.location.href = "/login"; // Redirect to login page
  //   } catch (error) {
  //     toast.error("Logout failed");
  //   }
  // };
  

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
          {/* <button className="logoutBtn">Logout</button> */}
        </header>


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
          <th>Delivery Details</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <p><strong>Name: </strong>{order.buyerDetails?.firstName} {order.buyerDetails?.lastName}</p>
                    <p><strong>E-mail: </strong>{order.buyerDetails?.email}</p>
                    <p><strong>Phone Number: </strong>{order.buyerDetails?.phoneNumber}</p>
                  </td>
                  <td className="cake-info">
                    <img
                      src={order.cakeDetails.image || ""}
                      alt={order.cakeDetails.name || "Cake"}
                      className="cake-image"
                    />
                    {order.cakeDetails.name || ""}
                  </td>
                  <td>
                    <p><strong>City:</strong> {order.deliveryDetails.deliveryCity}</p>
                    <p><strong>Area:</strong> {order.deliveryDetails.deliveryArea || "N/A"}</p>
                    <p><strong>Date:</strong> {order.deliveryDetails.deliveryDate}</p>
                  </td>
                  <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                  <td className="action-buttons">
                    <button className="accept-btn" onClick={() => handleStatusChange(order._id, "accepted")}>
                      Accept
                    </button>
                    <button className="decline-btn" onClick={() => handleStatusChange(order._id, "declined")}>
                      Decline
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


        {/* const OrderModal: React.FC<Order> = ({ order, onClose }) => {
        return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Buyer Name:</strong> {order.buyerDetails?.firstName} {order.buyerDetails?.lastName}</p>
            <p><strong>Phone:</strong> {order.buyerDetails?.phone}</p>
            <p><strong>City:</strong> {order.buyerDetails?.city}</p>
            <p><strong>Address:</strong> {order.buyerDetails?.address}</p>
            <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
            <p><strong>Cake Name:</strong> {order.cakeId?.name}</p>
            <img src={order.cakeId?.image} alt={order.cakeId?.name} className="modal-image" />
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div> */}

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
                    <td>LKR {product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>
                      <button onClick={() => handleEditCake(product)}>✏️ Edit</button>
                      <button onClick={() => console.log("Delete")}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Product Modal */}
        {editModalOpen && selectedProduct && (
          <div className="editModal">
            <div className="modalContent">
              <h2>Edit Product</h2>
              <label>Name:</label>
              <input type="text" name="name" value={selectedProduct.name} onChange={handleInputChange} />

              <label>Price:</label>
              <input type="number" name="price" value={selectedProduct.price} onChange={handleInputChange} />

              <label>Category:</label>
              <input type="text" name="category" value={selectedProduct.category} onChange={handleInputChange} />

              <label>Description:</label>
              <textarea name="description" value={selectedProduct.description} onChange={handleInputChange} />

              <label>Image URL:</label>
              <input type="text" name="image" value={selectedProduct.image} onChange={handleInputChange} />

              <div className="modalActions">
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditModalOpen(false)}>Cancel</button>
              </div>
            </div>
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
            <Profile/>
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
          background-color: #F9F9F;
        }

        .sidebar {
          width: 300px;
          background: linear-gradient(135deg,  #F7F7F7, #F7F7F7);
          backgroundcolor:#C14679;
          color:#C14679;
          padding: 20px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .logo {
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .navList  {
          list-style: none;
          padding: "12px",
          cursor: "pointer",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "16px",
          transition: "0.3s",
          marginBottom: "10px",
          backgroundColor: " #8B3D60",
          color: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }

        .navList li {
          margin: 10px 0;
        }

        .navList button {
          width: 100%;
          color:#333;
          backgroundcolor:#C14679;
          background: none;
          border: none;
          padding: 12px;
          border-radius: 5px;
          font-size: 18px;
          font-weight:600;
          text-align: left;
          cursor: pointer;
          transition: 0.3s;
        }

        .navList button:hover,
        .navList .active {
          background:#A13A66;
          color: white;
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
          background-color: #C14679;
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

        .status.accepted {
          color: green;
          font-weight: bold;
        }

        .status.pending {
          color: orange;
          font-weight: bold;
        }
        
         .status.declined {
          color:red;
          font-weight: bold;
        }
         .editModal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modalContent {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          display: flex;
          flex-direction: column;
        }

        .modalContent h2 {
          text-align: center;
          margin-bottom: 10px;
        }

        .modalContent label {
          font-weight: bold;
          margin-top: 10px;
        }

        .modalContent input, .modalContent textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .modalActions {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .modalActions button {
          padding: 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .modalActions button:first-child {
          background: green;
          color: white;
        }

        .modalActions button:last-child {
          background: red;
          color: white;
        }
        
        .ordersSection {
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background: #C14679;
          color: white;
        }

        .cake-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cake-image {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          object-fit: cover;
        }

        .status {
          font-weight: bold;
          text-transform: capitalize;
        }

        .status.accepted {
          color: green;
        }

        .status.declined {
          color: red;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .accept-btn, .decline-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .accept-btn {
          background-color: #28a745;
          color: white;
        }

        .accept-btn:hover {
          background-color: #218838;
        }

        .decline-btn {
          background-color: #dc3545;
          color: white;
        }

        .decline-btn:hover {
          background-color: #c82333;
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
