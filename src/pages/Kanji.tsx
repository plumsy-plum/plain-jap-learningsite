import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { initSession } from "../utils/session";
import type { LevelItem } from "../data/levels";

interface KanjiProps {
  items: LevelItem[];
}

const Kanji: React.FC<KanjiProps> = ({ items }) => {
  const navigate = useNavigate();
  useEffect(() => {
    initSession("kanji");
  }, []);
  return (
    <div>
      <h1>Kanji</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {items.map((item, idx) => (
          <Flashcard
            key={idx}
            character={item.character}
            meaning={item.meaning}
            romaji={item.romaji}
            example={item.example}
            level="kanji"
            cardIndex={idx}
          />
        ))}
      </div>
      <button onClick={() => navigate("/quiz/kanji")}>Start Quiz</button>
    </div>
  );
};

export default Kanji;
