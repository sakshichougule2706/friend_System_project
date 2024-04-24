import React from "react";
import "./GridLayout.css"; // Import the CSS file for styling

const GridLayout = (props) => {
  const { left, right } = props;

  return (
    <div className="grid-layout-container">
      <div className="left-column">{left}</div>
      <div className="right-column">{right}</div>
    </div>
  );
};

export default GridLayout;
