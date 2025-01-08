import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        {/* Optimized Image */}
        <Image src="/images/Logo.png" alt="logo" width={80} height={80} />
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li><a href="#" style={styles.navLink}>Home</a></li>
          <li><a href="#" style={styles.navLink}>Become a Seller</a></li>
          <li><a href="#" style={styles.navLink}>Log In</a></li>
        </ul>
      </nav>
      <div style={styles.icon}>🛒</div>
      <div style={styles.icon}></div>
    </header>
  );
};

// Inline CSS styles
const styles = {

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#B864D4',
    color: 'white',
    padding: '10px 20px',
    maxWidth: '100%',
    maxHeight: '100px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    flex: 1,
    textAlign: 'center',
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    gap: '50px',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
  },
  icon: {
    fontSize: '25px',
    cursor: 'pointer',
  },
};

export default Navbar;
