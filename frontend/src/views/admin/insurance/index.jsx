import React, { useState } from "react";
import LifeCard from './components/LifeCard'
const RiskForm = () => {
  const [formState, setFormState] = useState({
    age: "",
    income: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const premium = calculatePremium(formState.age, formState.income);
    alert(`Your premium is: ${premium}`);
  };

  const calculatePremium = (age, income) => {
    let basePremium = 100; // base premium amount

    // calculate premium based on age and income
    const premium = basePremium + (age * income) / 10000; // assuming income affects premium by a factor of 1/10000
    return premium;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "70px",
        }}
      >
        <h2 style={{ color: "#fff" }}>Explanation Video</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/your_video_id"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          jutifyItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#374151",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => setShowModal(true)}
      >
        Calculate Now
      </div>
      {showModal && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#374151",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "80%", // Adjust width as needed
            maxWidth: "600px", // Max width of modal
            maxHeight: "80%", // Max height of modal
            overflowY: "auto", // Enable vertical scrolling if needed
            zIndex: "999", // Ensure modal is on top
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formState.age}
                onChange={handleChange}
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="income">Annual Income:</label>
              <input
                type="number"
                id="income"
                name="income"
                value={formState.income}
                onChange={handleChange}
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#fff",
                color: "#007bff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: "#fff",
              color: "#007bff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "18px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <LifeCard/>
        </div>
      )}
    </>
  );
};

export default RiskForm;
