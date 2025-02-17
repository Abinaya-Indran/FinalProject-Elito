import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Header = () => {
  return (
    <header style={styles.header}>
      {/* Location Section */}
      <div style={styles.location}>
        <FaMapMarkerAlt style={styles.icon} />
        <div>
          <p style={styles.text}>No-80,Viyasar road , </p>
          <p style={styles.text}>Thonikkal ,Vavuniya <br/> Srilanka.</p>
        </div>
      </div>

      {/* Logo */}
      <div style={styles.logo}>
        <span>Sweet</span>
        <FaEnvelope style={styles.logoIcon} />
        <span>Bakery</span>
      </div>

      {/* Contact Button */}
      <button style={styles.contactButton}>
        <FaEnvelope style={styles.btnIcon} /> GET IN TOUCH
      </button>
    </header>
  );
};

// Inline Styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    background: "white",
    borderBottom: "2px solid #C14679",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "#C14679",
    fontSize: "20px",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#262626",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    fontFamily: "'Poppins', sans-serif",
    color: "#262626",
    fontWeight: "bold",
  },
  logoIcon: {
    color: "#C14679",
    fontSize: "28px",
    margin: "0 5px",
  },
  contactButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 15px",
    border: "2px solid #C14679",
    background: "none",
    color: "#262626",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  btnIcon: {
    fontSize: "16px",
  },
};

// Button Hover Effect
const hoverEffect = () => {
  const button = document.querySelector("button");
  if (button) {
    button.addEventListener("mouseover", () => {
      button.style.background = "#C14679";
      button.style.color = "white";
    });
    button.addEventListener("mouseleave", () => {
      button.style.background = "none";
      button.style.color = "#262626";
    });
  }
};

// Run the hover effect
setTimeout(hoverEffect, 100);

export default Header;
