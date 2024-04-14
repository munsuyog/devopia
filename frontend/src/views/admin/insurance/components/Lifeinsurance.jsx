import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

const RiskForm = () => {
  const [formState, setFormState] = useState({
    age: "",
    income: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [thresholdValue, setThresholdValue] = useState(null);
  const [lifeCover, setLifeCover] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [premium, setPremium] = useState(null);
  const [displayData, setDisplayData] = useState(false);

  useEffect(() => {
    // Fetch data from Firebase
    const firebaseConfig = {
      // Your Firebase config here
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    // Fetch threshold value
    const fetchThreshold = async () => {
      try {
        const thresholdRef = database.ref("threshold");
        const snapshot = await thresholdRef.get();
        const value = snapshot.val();
        setThresholdValue(value);
        console.log("Threshold Value:", value);
      } catch (error) {
        console.error("Error fetching threshold value:", error);
      }
    };
    fetchThreshold();

    // Fetch life cover, company name, and premium
    const fetchLifeCover = async () => {
      try {
        const lifeCoverRef = database.ref("life_cover");
        const snapshot = await lifeCoverRef.get();
        const data = snapshot.val();
        setLifeCover(data.number);
        setCompanyName(data.name);
        setPremium(data.pay);
        console.log("Life Cover Data:", data);
      } catch (error) {
        console.error("Error fetching life cover data:", error);
      }
    };
    fetchLifeCover();
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const result = ((74 - parseInt(formState.age, 10)) * parseInt(formState.income, 10))/1000000;
      if (result <= lifeCover) {
        setDisplayData(true); // Set displayData to true if condition is met
      } else {
        setDisplayData(false); // Set displayData to false if condition is not met
      }
    } catch (error) {
      console.error("Error calculating result:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#007bff", // theme color
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Calculate Now
      </button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "navy", // theme color
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
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
                color: "#007bff", // theme color
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
        </div>
      )}
      {displayData && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2>Data from Firebase</h2>
          <p>Name: {companyName}</p>
          <p>Life Cover: {lifeCover}</p>
          <p>Premium: {premium}</p>
        </div>
      )}
    </>
  );
};

export default RiskForm;
