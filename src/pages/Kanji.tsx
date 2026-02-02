import React from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { kanji } from "../data/kanji";
import { useEffect } from "react";
import { initSession } from "../utils/session";

const Kanji: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    initSession("kanji");
  }, []);
  return (
    <div>
      <h1>Kanji</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {kanji.map((k, idx) => (
          <Flashcard key={idx} front={k.char} back={k.meaning} level="kanji" cardIndex={idx} />
        ))}
      </div>
      <button onClick={() => navigate("/quiz/kanji")}>Start Quiz</button>
    </div>
  );
};

export default Kanji;
