import React, { useState } from "react";
import { logEvent } from "../utils/logger";
import "./Flashcard.css";

interface FlashcardProps {
  character: string;            // displayed on front
  back: string;                 // romaji, meaning, etc.
  example?: string;             // optional example sentence
  cardIndex?: number;
  level?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ character, back, example, cardIndex = 0, level = "unknown" }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = async () => {
    setFlipped(!flipped);
    
    // Log the flip event
    await logEvent({
      eventType: "flip",
      level,
      questionId: cardIndex,
      responseTime: 0,
      isCorrect: true
    });
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      {flipped ? (
        <div>
          <div>{back}</div>
          {example && <div className="example">{example}</div>}
        </div>
      ) : (
        <div>{character}</div>
      )}
    </div>
  );
};

export default Flashcard;
