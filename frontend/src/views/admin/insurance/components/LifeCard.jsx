import React from "react";

const Card = ({ companyName, pay, insuranceCover }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "10px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>{companyName}</h2>
      </div>
      <div>
        <p style={{ margin: 0 }}>Pay: {pay}</p>
      </div>
      <div>
        <p style={{ margin: 0 }}>Insurance Cover: {insuranceCover}</p>
      </div>
    </div>
  );
};

export default Card;
