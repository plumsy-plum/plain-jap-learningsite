import React from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { hiragana } from "../data/hiragana";

const Hiragana: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hiragana</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {hiragana.map((h, idx) => (
          <Flashcard key={idx} front={h.char} back={h.romaji} level="hiragana" cardIndex={idx} />
        ))}
      </div>
      <button onClick={() => navigate("/quiz/hiragana")}>Start Quiz</button>
    </div>
  );
};

export default Hiragana;
