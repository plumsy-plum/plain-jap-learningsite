import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { initSession } from "../utils/session";
import type { LevelItem } from "../data/levels";

interface HiraganaProps {
  items: LevelItem[];
}

const Hiragana: React.FC<HiraganaProps> = ({ items }) => {
  const navigate = useNavigate();

  useEffect(() => {
    initSession("hiragana");
  }, []);

  return (
    <div>
      <h1>Hiragana</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {items.map((item, idx) => (
          <Flashcard
            key={idx}
            character={item.character}
            meaning={item.meaning}
            romaji={item.romaji}
            example={item.example}
            level="hiragana"
            cardIndex={idx}
            type="hiragana"
          />
        ))}
      </div>
      <button onClick={() => navigate("/quiz/hiragana")}>Start Quiz</button>
    </div>
  );
};

export default Hiragana;
