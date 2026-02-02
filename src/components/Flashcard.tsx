import React, { useState } from "react";
import { logEvent } from "../utils/logger";
import "./Flashcard.css";

interface FlashcardProps {
  front: string;
  back: string;
  cardIndex?: number;
  level?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back, cardIndex = 0, level = "unknown" }) => {
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
      {flipped ? back : front}
    </div>
  );
};

export default Flashcard;
