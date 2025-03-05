"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!", { position: "top-right", autoClose: 2000 });
    router.push("/login");
  };

  const handleHomeClick = () => {
    if (userRole === "Seller") {
      router.push("/sellerpage");
    } else {
      router.push("/");
    }
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div onClick={handleHomeClick} style={{ ...styles.logo, cursor: "pointer" }}>
        <Image src="/images/White and Dark Brown Bold Food Logo.svg" alt="logo" width={50} height={50} />
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        {/* Home Link */}
        <li>
          <span
            onClick={handleHomeClick}
            style={{
              ...styles.navLink,
              ...(pathname === "/" ? styles.activeNavLink : {}),
            }}
          >
            Home
          </span>
        </li>

        {/* Show Dashboard for Admins and Sellers */}
        {(userRole === "Admin" || userRole === "Seller") && (
          <li>
            <Link
              href={userRole === "Admin" ? "/Admin" : "/sellerdashboard"}
              style={styles.navLink}
            >
              Dashboard
            </Link>
          </li>
        )}

        {/* Show Cakes & About only if NOT Admin or Seller */}
        {!(userRole === "Admin" || userRole === "Seller") && (
          <>
            <li>
              <Link href="/product" style={{ ...styles.navLink, ...(pathname === "/product" ? styles.activeNavLink : {}) }}>Cakes</Link>
            </li>
            <li>
            <Link href="/aboutus" style={{ ...styles.navLink, ...(pathname === "/aboutus" ? styles.activeNavLink : {}) }}>About</Link>
            </li>
          </>
        )}

        {!user ? (
          <li>
            <Link href="/login" style={{ ...styles.navLink, ...(pathname === "/login" ? styles.activeNavLink : {}) }}>Log In</Link>
          </li>
        ) : (
          <li>
            <span onClick={handleLogout} style={styles.navLink}>Log Out</span>
          </li>
        )}
      </ul>

      {/* Icons and Button */}
      <div style={styles.iconContainer}>
        {user && (
          <div style={styles.profileContainer}>
            <FontAwesomeIcon
              icon={faUser}
              style={styles.icon}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div style={styles.dropdown}>
                <Link href="/Profile" style={styles.dropdownItem}>Profile</Link>
                <Link href="/orderstatus" style={styles.dropdownItem}>Orders</Link>
                <span onClick={handleLogout} style={styles.dropdownItem}>Log Out</span>
              </div>
            )}
          </div>
        )}

        {!(userRole === "Admin" || userRole === "Seller") && (
          <>
            <Link href="/product">
              <FontAwesomeIcon icon={faSearch} style={styles.icon} />
            </Link>
            <Link href="/yourcart">
              <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} />
            </Link>
          </>
        )}

        <Link href="/contact">
          <button style={styles.button}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.buttonIcon} /> Get in Touch
          </button>
        </Link>
      </div>
    </nav>
  );
};

// Styles remain unchanged
const styles: { [key: string]: React.CSSProperties } = {
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 40px", backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", fontFamily: "Poppins, sans-serif", position: "sticky", width: "100%", top: 0, left: 0, zIndex: 1000 },
  logo: { fontSize: "28px", fontWeight: "bold", color: "#C14679" },
  logoSpan: { color: "#262626" },
  navList: { display: "flex", listStyle: "none", gap: "30px", margin: 0, padding: 0 },
  navLink: { textDecoration: "none", fontSize: "20px", fontWeight: "500", color: "#262626", padding: "8px 16px", borderRadius: "8px", transition: "all 0.3s ease", cursor: "pointer" },
  activeNavLink: { backgroundColor: "#C14679", color: "white" },
  iconContainer: { display: "flex", alignItems: "center", gap: "15px", position: "relative" },
  profileContainer: { position: "relative" },
  icon: { fontSize: "20px", color: "#C14679", cursor: "pointer", transition: "color 0.3s ease" },
  dropdown: { position: "absolute", top: "30px", right: "0px", backgroundColor: "white", border: "1px solid #ddd", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden", width: "120px", zIndex: 999 },
  dropdownItem: { display: "block", padding: "10px", fontSize: "16px", color: "#262626", textDecoration: "none", cursor: "pointer", textAlign: "center", transition: "background 0.2s ease" },
  button: { backgroundColor: "transparent", border: "2px solid #C14679", color: "#C14679", padding: "8px 16px", borderRadius: "20px", fontSize: "16px", fontWeight: "500", cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center" },
  buttonIcon: { marginRight: "8px" },
};

export default Navbar;
