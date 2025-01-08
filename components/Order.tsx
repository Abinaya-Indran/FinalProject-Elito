import React from 'react';


const Order = () => {
  return (
    <div className="form-section">
      <h2>Order Details</h2>
      <div className="form-group">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Phone Number" />
        <input type="text" placeholder="WhatsApp Number" />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Address" />
        <input type="email" placeholder="Email" />
      </div>

      <h2>Delivery Details</h2>
      <div className="form-group">
        <input type="text" placeholder="Delivery City" />
        <input type="text" placeholder="Delivery Area" />
      </div>
      <div className="form-group">
        <input type="date" placeholder="Delivery Date" />
        <input type="time" placeholder="Delivery Time" />
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="createAccount" />
        <label htmlFor="createAccount">Create an Account?</label>
      </div>
      <div className="button-container">
        <button>Place Order</button>
      </div>
    </div>
  );
};

export default Order;
