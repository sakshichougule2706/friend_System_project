import React from "react";

const Loading = ({ label }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: "50px",
          height: "50px",
          margin: "8px",
          borderRadius: "50%",
          borderTop: "4px solid #BD57F7",
          borderRight: "4px solid #FFC300",
          borderBottom: "4px solid #DAF7A6",
          borderLeft: "4px solid #FF5733",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <p style={{ color: "#6b6b6b", margin: "8px 0 24px 0" }}>{label || "Loading..."}</p>
    </div>
  );
};

// loading animated 
const styles = `
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

// Append the keyframes style to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Loading;
