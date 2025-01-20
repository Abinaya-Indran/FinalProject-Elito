"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header style={styles.header}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <Image src="/images/Logo.png" alt="logo" width={180} height={180} />
      </div>

      {/* Navigation Section */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {/* Home */}
          <li>
            <Link href="/" style={styles.navLink}>
              Home
            </Link>
          </li>

          {/* Categories Dropdown */}
          <li
            style={styles.dropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span style={styles.navLink}>Categories ▼</span>
            {dropdownOpen && (
              <ul style={styles.dropdownMenu}>
                <li style={styles.dropdownItem}>
                  <Link href="/birthdaycakes" style={styles.dropdownLink}>
                    🎂 Birthday Cakes
                  </Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link href="/lovecakes" style={styles.dropdownLink}>
                    ❤️ Love Cakes
                  </Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link href="/weddingcakes" style={styles.dropdownLink}>
                    💍 Wedding Cakes
                  </Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link href="/cupcakes" style={styles.dropdownLink}>
                    🧁 Cupcakes
                  </Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link href="/piececakes" style={styles.dropdownLink}>
                    🍰 Piece Cakes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Seller */}
          <li>
            <Link href="/sellersignup" style={styles.navLink}>
              Seller
            </Link>
          </li>

          {/* Rating */}
          <li>
            <Link href="/Rating" style={styles.navLink}>
              Rating
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link href="/contact" style={styles.navLink}>
              Contact
            </Link>
          </li>

          {/* Log In */}
          <li>
            <Link href="/login" style={styles.navLink}>
              Log In
            </Link>
          </li>
        </ul>
      </nav>

      {/* Icons */}
      <div style={styles.icon}>
        {/* User Icon */}
        <Link href="/signup">
          <img
            src="/images/user.png"
            alt="User"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </Link>

        {/* Cart Icon */}
        <Link href="/yourcart">
          <img
            src="/images/shopping-cart.png"
            alt="Cart"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for cakes..."
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>🔍</button>
      </div>
    </header>
  );
};

// Inline CSS styles
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B864D4",
    color: "white",
    padding: "10px 20px",
    width: "100%",
    height: "80px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    flex: 1,
    textAlign: "center",
  },
  navList: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    gap: "40px",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "color 0.3s",
    cursor: "pointer",
  },
  dropdown: {
    position: "relative",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "white",
    color: "black",
    listStyle: "none",
    padding: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    minWidth: "200px",
    textAlign: "left",
  },
  dropdownItem: {
    padding: "12px 20px",
    transition: "background-color 0.3s, color 0.3s",
    cursor: "pointer",
  },
  dropdownLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
    maxWidth: "300px",
    width: "100%",
    margin: "0px 20px",
  },
  searchInput: {
    border: "none",
    padding: "10px",
    outline: "none",
    flex: 1,
    fontSize: "16px",
  },
  searchButton: {
    backgroundColor: "black",
    border: "none",
    color: "white",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "16px",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    marginRight: "20px",
  },
};

export default Navbar;
