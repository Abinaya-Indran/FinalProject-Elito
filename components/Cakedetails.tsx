import React from 'react';
import cakeImage from '../images/Black and gold cake .jpeg'; 

const Cakedetails = () => {
  return (
    <section className="product-details-container">
      <div className="product-image">
        <img src={cakeImage} alt="Cake" />
      </div>
      <div className="details">
        <h1>Black and Gold Cake</h1>
        <p className="price">Rs 4000 - Rs 7500</p>
        <div className="size-options">
          <label>Size:</label><br/>
          <button>Medium</button>
          <button>Large</button>
          <button>XL</button>
          <button>XXL</button>
        </div>
        <p>Price: <span>Rs 4000</span></p>
        <div className="surprise-option">
          <input type="checkbox" id="surprise" name="surprise" />
          <label htmlFor="surprise">Surprise Delivery (+1000 RS)</label>
        </div>
        <input type="text" placeholder="Personalized Icing Message" />
        <div className="add-to-cart">
          <input type="number" defaultValue="1" min="1" />
          <button>Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default Cakedetails;
