"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logo}>
        Eli<span style={styles.logoSpan}>to</span>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        {navItems.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              style={{
                ...styles.navLink,
                ...(pathname === path ? styles.activeNavLink : {}),
              }}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons and Button */}
      <div style={styles.iconContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
        <Link href={"/yourcart"} passHref><FontAwesomeIcon icon={faShoppingCart} style={styles.icon} /></Link>
        <Link href={"/contact"} passHref>
        <button style={styles.button}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.buttonIcon} /> Get in Touch
        </button>
        </Link>
      </div>
    </nav>
  );
};

// Navigation items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Cakes", path: "/product" },
  { name: "About", path: "/aboutus" },
];

// Inline CSS Styles
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "white",
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
    color: "#C14679",
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
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  activeNavLink: {
    backgroundColor: "#C14679",
    color: "white",
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
    border: "2px solid #C14679",
    color: "#C14679",
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

export default Navbar;
