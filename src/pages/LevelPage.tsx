import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { initSession } from "../utils/session";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";

const LevelPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  // find the items for this levelId
  const items: LevelItem[] = (levelId
    ? APP_DATA.find(l => l.levelId === levelId)?.items || []
    : []);

  useEffect(() => {
    if (levelId) {
      initSession(levelId);
    }
  }, [levelId]);

  return (
    <div>
      <h1>{levelId}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "1rem", padding: "2rem" }}>
        {items.map((item, idx) => (
          <Flashcard
            key={idx}
            character={item.character}
            back={item.romaji || item.meaning || ""}
            example={item.example}
            level={levelId || ""}
            cardIndex={idx}
          />
        ))}
      </div>
      {levelId && (
        <button onClick={() => navigate(`/quiz/${levelId}`)}>
          Start Quiz
        </button>
      )}
    </div>
  );
};

export default LevelPage;
