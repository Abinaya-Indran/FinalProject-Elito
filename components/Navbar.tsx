"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logo}>
        Eli<span style={styles.logoSpan}>to</span>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        <li><Link href="/" style={styles.navLink} onMouseEnter={(e) => e.currentTarget.style.color = "#C14679"} onMouseLeave={(e) => e.currentTarget.style.color = "#262626"}>Home</Link></li>
        <li><Link href="/product" style={styles.navLink} onMouseEnter={(e) => e.currentTarget.style.color = "#C14679"} onMouseLeave={(e) => e.currentTarget.style.color = "#262626"}>cakes</Link></li>
        <li><Link href="/shop" style={styles.navLink} onMouseEnter={(e) => e.currentTarget.style.color = "#C14679"} onMouseLeave={(e) => e.currentTarget.style.color = "#262626"}>Shop</Link></li>
        {/* <li><Link href="/blog" style={styles.navLink} onMouseEnter={(e) => e.currentTarget.style.color = "#C64B8C"} onMouseLeave={(e) => e.currentTarget.style.color = "#262626"}>Blog</Link></li> */}
        <li><Link href="/contact" style={styles.navLink} onMouseEnter={(e) => e.currentTarget.style.color = "#C14679"} onMouseLeave={(e) => e.currentTarget.style.color = "#262626"}>Contact</Link></li>
      </ul>

      {/* Icons and Button */}
      <div style={styles.iconContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.icon} onMouseEnter={(e) => e.currentTarget.style.color = "#C64B8C"} onMouseLeave={(e) => e.currentTarget.style.color = "#666"} />
        <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} onMouseEnter={(e) => e.currentTarget.style.color = "#C64B8C"} onMouseLeave={(e) => e.currentTarget.style.color = "#666"} />
        <button style={styles.button} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C64B8C"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C64B8C"; }}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.buttonIcon} /> Get in Touch
        </button>
      </div>
    </nav>
  );
};

// Inline CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#dddddd",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Poppins, sans-serif",
    position: "sticky",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#C64B8C",
  },
  logoSpan: {
    color: "#262626",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    gap: "30px",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "500",
    color: "#262626",
    transition: "color 0.3s ease",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  icon: {
    fontSize: "20px",
    color: "#666",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  button: {
    backgroundColor: "transparent",
    border: "2px solid #C64B8C",
    color: "#C64B8C",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: "8px",
  },
};

// Add hover effects

export default Navbar;
