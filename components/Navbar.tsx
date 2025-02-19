"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const pathname = usePathname(); // Get the current route
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    // Remove the token and user data from cookies and localStorage
    Cookies.remove("token");
    localStorage.removeItem("user");

    // Show a toast notification
    toast.success("Logged out successfully!", { position: "top-right", autoClose: 2000 });

    // Redirect to the login page
    router.push("/login");
  };

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
        {!user ? (
          <li>
            <Link href="/login" style={styles.navLink}>
              Log In
            </Link>
          </li>
        ) : (
          <li>
            <span onClick={handleLogout} style={styles.navLink}>
              Log Out 
            </span>
          </li>
        )}
      </ul>
     
      {/* Icons and Button */}
      <div style={styles.iconContainer}>
        {user && (
           <Link href={"/Profile"} passHref>
           <FontAwesomeIcon icon={faUser} style={styles.icon} />
         </Link>
          )}
        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
        <Link href={"/yourcart"} passHref>
          <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} />
        </Link>
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
    cursor: "pointer",
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
    color: "#C14679",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  button: {
    backgroundColor: "transparent",
    border: "2px solid #C14679",
    color: " #C14679",
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
