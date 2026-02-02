import React from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { katakana } from "../data/katakana";

const Katakana: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Katakana</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {katakana.map((k, idx) => (
          <Flashcard key={idx} front={k.char} back={k.romaji} level="katakana" cardIndex={idx} />
        ))}
      </div>
      <button onClick={() => navigate("/quiz/katakana")}>Start Quiz</button>
    </div>
  );
};

export default Katakana;
