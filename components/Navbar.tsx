"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');  // Add state for search query
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Sample cake data for demonstration (replace with your actual data source)
  const cakes = [
    { name: "Chocolate Cake", category: "Birthday" },
    { name: "Red Velvet Cake", category: "Wedding" },
    { name: "Cupcake", category: "Birthday" },
    { name: "Love Cake", category: "Love" },
  ];

  const filteredCakes = cakes.filter(
    (cake) =>
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header style={styles.header}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <Image src="/images/Logo.png" alt="logo" width={180} height={180} />
      </div>

      {/* Navigation Section */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li>
            <Link href="/" style={styles.navLink}>
              Home
            </Link>
          </li>

          {/* Categories Dropdown
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
          </li> */}

          <li>
            <Link href="/contact" style={styles.navLink}>
              Contact
            </Link>
          </li>

          <li>
            <Link href="/delivery" style={styles.navLink}>
              Delivery
            </Link>
          </li>

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
      </nav>

      {/* Right Section: Cart & User Icon */}
      <div style={styles.rightSection}>
        <Link href="/yourcart">
          <img
            src="/images/shopping-cart.png"
            alt="Cart"
            style={styles.iconImg}
          />
        </Link>

        {user && (
          <Link href="/editProfile">
            <img src="/images/user.png" alt="User" style={styles.iconImg} />
          </Link>
        )}
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for cakes..."
          style={styles.searchInput}
          value={searchQuery} // Bind value to state
          onChange={handleSearch} // Handle input changes
        />
        <button style={styles.searchButton}>🔍</button>
      </div>

      {/* Display filtered cakes (for demonstration)
      <div>
        <h3>Search Results:</h3>
        <ul>
          {filteredCakes.map((cake, index) => (
            <li key={index}>
              {cake.name} - {cake.category} Cake
            </li>
          ))}
        </ul>
      </div> */}
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
    marginTop: "15px",
    width: "100%",
    height: "90px",
  },
  logo: {
    display: "flex",
    marginTop: "5px",
    padding: "10px 0px",
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
    fontSize: "25px",
    fontWeight: "bold",
    transition: "color 0.3s",
    cursor: "pointer",
    fontFamily: "poppins, sans-serif",
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
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "20px",
  },
  iconImg: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
};

export default Navbar;
