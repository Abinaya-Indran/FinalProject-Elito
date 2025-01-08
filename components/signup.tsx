import React from 'react';
import profilePlaceholder from '../images/add profile.jpeg';

const Signup = () => {
  return (
    
    <section className="seller-account-container">
      <h1>Sign Up</h1>
      
      {/* <div className="profile-photo">
        <img src={profilePlaceholder} alt="Profile Placeholder" />
      </div> */}
      <br/><br/>
      <form>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" placeholder="First Name" />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" placeholder="Last Name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" />

        <label htmlFor="mobile">Mobile No</label>
        <input type="text" id="mobile" placeholder="Mobile No" />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" placeholder="Address" />
        <br/>
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default Signup;
