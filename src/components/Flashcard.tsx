import React, { useState } from "react";
import { logEvent } from "../utils/logger"; // logging utility
import "./Flashcard.css";

interface FlashcardProps {
  character: string;
  meaning?: string;
  romaji?: string;
  example?: string;
  cardIndex?: number;
  level?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
  character,
  meaning,
  romaji,
  example,
  cardIndex = 0,
  level = "unknown"
}) => {
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

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Web Speech API for Japanese (ja-JP)
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Slightly slower for better learning
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flashcard-container" onClick={handleClick}>
      {/* Main Upper Box for the Character */}
      <div className="flashcard-main-wrapper">
        <div className="flashcard-main">{character}</div>
        <button className="speaker-btn" onClick={handleAudio} title="Play audio">
          🔊
        </button>
      </div>

      {/* Detail Cards below - shown only when flipped for the Gamified version */}
      {flipped && (
        <div className="flashcard-details">
          <div className="detail-card">
            <span className="detail-title">Meaning</span>
            <div className="detail-content">{meaning || "-"}</div>
          </div>
          <div className="detail-card">
            <span className="detail-title">Example</span>
            <div className="detail-content">{example || "-"}</div>
          </div>
          <div className="detail-card">
            <span className="detail-title">Romaji</span>
            <div className="detail-content">{romaji || "-"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;