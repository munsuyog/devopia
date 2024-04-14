import React, { useState } from "react";

const RiskButton = ({ risk, selectedRisk, setRisk }) => {
  return (
    <button
      onClick={() => setRisk(risk)}
      style={{
        backgroundColor: risk === selectedRisk ? "#007bff" : "#555",
        color: risk === selectedRisk ? "#fff" : "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        margin: "5px",
        cursor: "pointer",
      }}
    >
      {risk}
    </button>
  );
};

const RiskForm = ({ closeModal }) => {
  const [formState, setFormState] = useState({
    age: "",
    risk: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#555",
        height: "500px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="age" style={{ color: "#fff" }}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formState.age}
          onChange={handleChange}
          style={{
            backgroundColor: "#777",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "5px",
            marginLeft: "10px",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ color: "#fff" }}>Risk:</label>
        <RiskButton
          risk="Low"
          selectedRisk={formState.risk}
          setRisk={(risk) => setFormState({ ...formState, risk })}
        />
        <RiskButton
          risk="Medium"
          selectedRisk={formState.risk}
          setRisk={(risk) => setFormState({ ...formState, risk })}
        />
        <RiskButton
          risk="High"
          selectedRisk={formState.risk}
          setRisk={(risk) => setFormState({ ...formState, risk })}
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#777",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
      >
        Submit
      </button>
    </form>
  );
};

const RiskModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#333",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RiskForm closeModal={closeModal} />
      </div>
    )
  );
};

export default RiskModal;
