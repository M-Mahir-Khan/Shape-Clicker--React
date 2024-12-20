import React from "react";
// import "./Scoreboard.css";

const Scoreboard = ({ score, difficulty, setDifficulty }) => {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default Scoreboard;
