// import { useState, useEffect } from "react";
// import axios from "axios";

// const SellerOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios.get("/api/order/seller")
//       .then((res) => setOrders(res.data.orders))
//       .catch(() => setMessage("Failed to load orders"));
//   }, []);

//   const updateOrder = async (orderId, status) => {
//     try {
//       const res = await axios.put("/api/order/update", { orderId, status });
//       setMessage(res.data.message);
//       setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
      
//       if (status === "accepted") {
//         window.location.href = `/payment?orderId=${orderId}`;
//       }
//     } catch {
//       setMessage("Update failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Seller Orders</h2>
//       {orders.map((order) => (
//         <div key={order._id}>
//           <p>Buyer: {order.buyer.name}</p>
//           <p>Status: {order.status}</p>
//           {order.status === "pending" && (
//             <>
//               <button onClick={() => updateOrder(order._id, "accepted")}>Accept</button>
//               <button onClick={() => updateOrder(order._id, "denied")}>Deny</button>
//             </>
//           )}
//         </div>
//       ))}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SellerOrders;
