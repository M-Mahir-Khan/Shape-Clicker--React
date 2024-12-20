import React, { useState, useEffect } from "react";
import Shape from "./components/Shape";
import Scoreboard from "./components/Scoreboard";
import Timer from "./components/Timer";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [shapes, setShapes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState("Easy");
  const [isGameOver, setIsGameOver] = useState(false);

  // Shape spawn interval based on difficulty
  const shapeInterval = {
    Easy: 2000,
    Medium: 1500,
    Hard: 700,
  }[difficulty];

  // Add a random shape
  const addShape = () => {
    const newShape = {
      id: Date.now(),
      x: Math.random() * 80 + 10 + "vw",
      y: Math.random() * 80 + 10 + "vh",
      size: Math.random() * 40 + 30 + "px",
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    };
    setShapes((prev) => [...prev, newShape]);
  };

  // Remove clicked shape and update score
  const handleShapeClick = (id) => {
    setShapes((prev) => prev.filter((shape) => shape.id !== id));
    setScore((prev) => prev + 1);
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true);
      setShapes([]);
    }
  }, [timeLeft]);

  // Generate shapes periodically
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(addShape, shapeInterval);
      return () => clearInterval(interval);
    }
  }, [isGameOver, shapeInterval]);

  // Restart game logic
  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setShapes([]);
    setIsGameOver(false);
  };

  return (
    <div className="app">
      <h1>Shape Clicker Game</h1>
      <Scoreboard score={score} difficulty={difficulty} setDifficulty={setDifficulty} />
      <Timer timeLeft={timeLeft} />
      {!isGameOver ? (
        shapes.map((shape) => (
          <Shape key={shape.id} {...shape} onClick={() => handleShapeClick(shape.id)} />
        ))
      ) : (
        <div className="game-over">
          <p>Game Over! Your score: {score}</p>
          <button className="restart-btn" onClick={restartGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
