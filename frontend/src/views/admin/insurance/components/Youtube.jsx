import React, { useState } from "react";
export default function Youtube() {
  const [formState, setFormState] = useState({
    age: "",
    income: "",
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
    const premium = calculatePremium(formState.age, formState.income);
    alert(`Your premium is: ${premium}`);
  };

  const calculatePremium = (age, income) => {
    let basePremium = 100; // base premium amount
  };
  return (
    <div
      style={{
        paddingTop: "20",
        width: "100%",
        color: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ color: "#fff", marginTop: "20px" }}>
          Don't know how to pick the right investments?...
          <br />
          Find out with the help of this video!
        </h2>
      </div>

      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/your_video_id"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
