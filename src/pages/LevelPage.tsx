import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { initSession } from "../utils/session";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";

const containerStyle: React.CSSProperties = {
  background: "#ede0d4",
  minHeight: "100vh",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start"
};

const lessonContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "600px",
  width: "100%"
};

const buttonStyle: React.CSSProperties = {
  borderRadius: "25px",
  backgroundColor: "#7f5539",
  color: "#ede0d4",
  border: "none",
  padding: "12px 40px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "2rem",
  transition: "background 0.3s"
};

const pageIndicatorStyle: React.CSSProperties = {
  marginTop: "1rem",
  fontSize: "0.95rem",
  color: "#7f5539"
};

const LevelPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  // find the items for this levelId
  const items: LevelItem[] = (levelId
    ? APP_DATA.find(l => l.levelId === levelId)?.items || []
    : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLessonStarted, setIsLessonStarted] = useState(false);

  useEffect(() => {
    if (levelId) {
      initSession(levelId);
    }
  }, [levelId]);

  const startLesson = () => {
    setCurrentIndex(0);
    setIsLessonStarted(true);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>{levelId}</h1>

      {!isLessonStarted ? (
        levelId && (
          <button onClick={startLesson}>Start Lesson</button>
        )
      ) : (
        <div style={lessonContainerStyle}>
          {items[currentIndex] && (
            <Flashcard
              character={items[currentIndex].character}
              meaning={items[currentIndex].meaning}
              romaji={items[currentIndex].romaji}
              example={items[currentIndex].example}
              level={levelId || ""}
              cardIndex={currentIndex}
            />
          )}
          {currentIndex < items.length - 1 ? (
            <>
              <button style={buttonStyle} onClick={handleNext}>
                Next
              </button>
              <div style={pageIndicatorStyle}>
                {currentIndex + 1} / {items.length}
              </div>
            </>
          ) : (
            <>
              <button
                style={buttonStyle}
                onClick={() => navigate(`/quiz/${levelId}`)}
              >
                Start Quiz
              </button>
              <div style={pageIndicatorStyle}>
                {currentIndex + 1} / {items.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LevelPage;
