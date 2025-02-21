import React from "react";

const DoughnutSpinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  spinner: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "5px solid #C64B8C",
    borderTop: "5px solid transparent",
    animation: "spin 1s linear infinite",
  },
};

export default DoughnutSpinner;
