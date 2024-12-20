import React from "react";
// import "./Shape.css";

const Shape = ({ x, y, size, color, onClick }) => {
  return (
    <div
      className="shape"
      style={{
        top: y,
        left: x,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      onClick={onClick}
    />
  );
};

export default Shape;
