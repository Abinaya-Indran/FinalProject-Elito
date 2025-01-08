import React from 'react';
import profilePic from '../images/sellerprofile.jpg'; 
import heartCake from '../images/celebrate.png'; 
import strawberryCake from '../images/images.webp';
import vanillaCake from '../images/heart.jpeg';
import unicornCake from '../images/unicorncake.jpeg';
import cherryCake from '../images/download (2).jpeg';
import pinkCake from '../images/pink cake.jpeg';

const SellerPage = () => {
  const cakes = [
    { id: 1, name: 'Heart Cake', price: 'Rs. 3500', img: heartCake },
    { id: 2, name: 'Strawberry Cake', price: 'Rs. 4000', img: strawberryCake },
    { id: 3, name: 'Vanilla Cake', price: 'Rs. 1800', img: vanillaCake },
    { id: 4, name: 'Unicorn Cake', price: 'Rs. 4000', img: unicornCake },
    { id: 5, name: 'Cherry Cake', price: 'Rs. 3500', img: cherryCake },
    { id: 6, name: 'Pink Cake', price: 'Rs. 3000', img: pinkCake },
  ];

  const orders = [
    { id: 1, userId: 1002, cake: 'Chocolate Cake', price: 'Rs. 3500', status: 'Delivered' },
    { id: 2, userId: 1027, cake: 'Vanilla Cake', price: 'Rs. 2500', status: 'Pending' },
    { id: 3, userId: 1007, cake: 'Chocolate Cake', price: 'Rs. 2500', status: 'Delivered' },
    { id: 4, userId: 1052, cake: 'Vanilla Cake', price: 'Rs. 2500', status: 'Pending' },
  ];

  return (
    <div style={styles.page}>
      {/* Seller Profile */}
      <div style={styles.profile}>
        <img src={profilePic} alt="Seller Profile" style={styles.profilePic} />
        <h2>Abinaya</h2>
        <p>
          Abi cake shop<br />
          Call: 0703807848
        </p>
        <div style={styles.stats}>
          <span>50 Posts</span>
          <span>1000 Likes</span>
          <span>1.9k Followers</span>
          <span>40 Reviews & Ratings</span>
        </div>
        <br/>
        <div style={styles.profileButtons}>
          <button style={styles.followButton}>+ Follow</button>
          <button style={styles.messageButton}>Message</button>
        </div><br/><br/>
        <button style={styles.addCakeButton}>+ Add Cake</button>
      </div>
      <br/> <br/>
      {/* My Cakes Section */}
      <div style={styles.section}>
        <h3>My Cakes</h3>
        <div style={styles.grid}>
          {cakes.map((cake) => (
            <div key={cake.id} style={styles.card}>
              <img src={cake.img} alt={cake.name} style={styles.cakeImage} />
              <p>{cake.price}</p>
            </div>
          ))}
        </div>
      </div>
      <br/> <br/>
      {/* My Orders Section */}
      <div style={styles.section}>
        <h3>My Orders</h3> <br/>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Cake Name</th>
              <th>Price</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <br/>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.cake}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    // fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    width:'80%',
    justifyContent:'center',
    margin:'200px'
  },
  profile: {
    // textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    
  },
  profilePic: {
    width: '200px',
    borderRadius: '50%',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0px 180px',
   
  },
  profileButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 80px',

  },
  followButton: {
    backgroundColor: '#B864D4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  messageButton: {
    backgroundColor: '#ddd',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  addCakeButton: {
    display: 'block',
    backgroundColor: '#B864D4',
    color: 'white',
    padding: '80px 50px',
    border: 'none',
    borderRadius: '5px',
    
  },
  section: {
    marginBottom: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
  },
  card: {
    textAlign: 'center',
    width: '150px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  cakeImage: {
    width: '100%',
    height:'70%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    // borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: '#f3f3f3',
  },
  tableCell: {
    padding: '10pxpx 20px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
};

export default SellerPage;
