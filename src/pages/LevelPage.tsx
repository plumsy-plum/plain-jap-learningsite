import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import "./LevelPage.css";
import { initSession } from "../utils/session";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";

const containerStyle: React.CSSProperties = {
  background: "var(--lemon-chiffon, #fcf6bd)",
  minHeight: "20vh",
  width: "98%",
  maxWidth: "1100px",
  margin: "5.5rem auto 2rem auto",
  padding: "2.5rem 2rem",
  borderRadius: "32px",
  boxShadow: "0 10px 30px rgba(228,193,249,0.10)", // mauve shadow
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  transition: "box-shadow 0.3s, transform 0.3s",
  position: "relative",
  color: "var(--mauve, #e4c1f9)"
};

// when the lesson hasn't started we want content vertically centered
const preLessonContainerStyle: React.CSSProperties = {
  ...containerStyle,
  justifyContent: "center"
};

const startCardStyle: React.CSSProperties = {
  background: "var(--frosted-mint, #d0f4de)",
  padding: "2rem",
  borderRadius: "1rem",
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(169,222,249,0.10)", // icy-blue shadow
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const startButtonStyle: React.CSSProperties = {
  borderRadius: "999px",
  backgroundColor: "var(--baby-pink, #ff99c8)",
  color: "var(--mauve, #e4c1f9)",
  border: "none",
  padding: "16px 60px",
  fontSize: "1.2rem",
  cursor: "pointer",
  marginTop: "2rem",
  transition: "transform 0.2s"
};

const lessonContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "900px",
  width: "95%",
  margin: "0 auto"
};

const buttonStyle: React.CSSProperties = {
  borderRadius: "25px",
  backgroundColor: "#212529",
  color: "#ffffff",
  border: "none",
  padding: "12px 40px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "2rem",
  transition: "background 0.3s",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const pageIndicatorStyle: React.CSSProperties = {
  marginTop: "1rem",
  fontSize: "0.95rem",
  color: "#212529"
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  color: "var(--baby-pink, #ff99c8)",
  letterSpacing: "-0.02em"
};

const subtitleStyle: React.CSSProperties = {
  margin: "0.5rem 0",
  fontSize: "1rem",
  color: "var(--icy-blue, #a9def9)"
};

const LevelPage: React.FC = () => {
  const { levelId = "1" } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLessonStarted, setIsLessonStarted] = useState(false);
  const [hoveringStart, setHoveringStart] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const levelData = APP_DATA.find(l => l.levelId === levelId);
  const items = levelData?.items || [];
  const currentItem = items[currentIdx] as LevelItem & { type?: 'kanji' | 'hiragana' | 'katakana' | 'vocab' | 'grammar' };

  useEffect(() => {
    initSession(levelId);
  }, [levelId]);

  const startLesson = () => {
    setCurrentIdx(0);
    setIsLessonStarted(true);
    setShowHint(true);
  };

  const handleNext = () => {
    // advance index but never go past last element
    setCurrentIdx(prev => {
      const next = prev + 1;
      return next < items.length ? next : prev;
    });
  };

  const renderFlashcard = () => {
    if (!currentItem) return null;

    // Prefer explicit item type, otherwise infer from levelId
    const type = currentItem.type
      || (levelData?.levelId.includes('hiragana') ? 'hiragana'
        : levelData?.levelId.includes('katakana') ? 'katakana'
        : levelData?.levelId.includes('kanji') ? 'kanji'
        : (currentItem.meaning ? 'vocab' : 'grammar'));

    return (
      <Flashcard
        character={currentItem.character}
        meaning={currentItem.meaning}
        romaji={currentItem.romaji}
        example={currentItem.example}
        kunyomi={(currentItem as any).kunyomi}
        onyomi={(currentItem as any).onyomi}
        type={type}
        cardIndex={currentIdx}
        level={levelId}
      />
    );
  };

  return (
    <div className="level-container" style={isLessonStarted ? containerStyle : preLessonContainerStyle}>
      <h1>{levelId}</h1>

      {!isLessonStarted ? (
        levelId && (
          <div
            style={{
              ...startCardStyle,
              transform: hoveringStart ? "translateY(-6px)" : "translateY(0)",
              boxShadow: hoveringStart
                ? "0 18px 40px rgba(0,0,0,0.08)"
                : "0 10px 30px rgba(0,0,0,0.05)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease"
            }}
            onMouseEnter={() => setHoveringStart(true)}
            onMouseLeave={() => setHoveringStart(false)}
          >
            <h2 style={titleStyle}>Ready for {levelId}?</h2>
            <p style={subtitleStyle}>{items.length} Items</p>
            <button
              style={{
                ...startButtonStyle,
                transform: hoveringStart ? "scale(1.05)" : "scale(1)",
                boxShadow: hoveringStart
                  ? "0 14px 34px rgba(0,122,255,0.24)"
                  : "0 8px 20px rgba(0,0,0,0.08)"
              }}
              onMouseEnter={() => setHoveringStart(true)}
              onMouseLeave={() => setHoveringStart(false)}
              onClick={startLesson}
            >
              Start Lesson
            </button>
          </div>
        )
      ) : (
        <div style={lessonContainerStyle}>
          {renderFlashcard()}
          {showHint && (
            <div className="lesson-hint" role="status">
              <div className="lesson-hint__title">Tip</div>
              <div className="lesson-hint__body">Click the card to flip and reveal details.</div>
              <button className="lesson-hint__btn" onClick={() => setShowHint(false)}>Got it</button>
            </div>
          )}
          {currentIdx === items.length - 1 ? (
            <>
              <button
                style={buttonStyle}
                onClick={() => navigate(`/quiz/${levelId}`)}
              >
                Start Quiz
              </button>
              <div style={pageIndicatorStyle}>
                {currentIdx + 1} / {items.length}
              </div>
            </>
          ) : (
            <>
              <button style={buttonStyle} onClick={handleNext}>
                Next
              </button>
              <div style={pageIndicatorStyle}>
                {currentIdx + 1} / {items.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LevelPage;
