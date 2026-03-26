import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import "./LevelPage.css";
import { initSession } from "../utils/session";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";

const LevelPage: React.FC = () => {
  const { levelId = "1" } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLessonStarted, setIsLessonStarted] = useState(false);
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
    setCurrentIdx(prev => {
      const next = prev + 1;
      return next < items.length ? next : prev;
    });
  };

  const renderFlashcard = () => {
    if (!currentItem) return null;

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
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pb-16 pt-24"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      {/* FOOLPROOF BACKGROUND LAYER */}
      <div 
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      {/* PAGE TITLE HUD */}
      <div className="absolute top-28 bg-[#f9e4c8] border-4 border-[#4a3018] px-8 py-3 shadow-[6px_6px_0_#2d1a0b] z-10">
        <h1 className="text-xl md:text-2xl text-[#4a3018] drop-shadow-sm tracking-wider uppercase m-0">
          {levelId}
        </h1>
      </div>

      {!isLessonStarted ? (
        /* PRE-LESSON SCREEN: The "Ready for Quest" Box */
        <div className="bg-[#fdf1d9] border-4 border-[#4a3018] rounded-xl p-10 max-w-md w-full flex flex-col items-center shadow-[12px_12px_0_rgba(0,0,0,0.5)] z-10 mt-12">
          <h2 className="text-2xl text-[#4a3018] font-bold uppercase mb-4 text-center leading-relaxed">
            Ready for <br/> {levelId}?
          </h2>
          <p className="text-[#4a3018] opacity-80 mb-8 uppercase tracking-widest text-sm">
            {items.length} Items
          </p>

          {/* Gamified Start Button */}
          <button
            className="flex items-center gap-3 bg-[#ffe8a3] border-4 border-[#4a3018] px-8 py-4 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer group"
            onClick={startLesson}
          >
            <img src="/smallw-removebg-preview.png" className="h-10 -ml-2 drop-shadow-md group-hover:animate-bounce" alt="Wizard" />
            <span className="text-[#4a3018] text-lg font-bold uppercase tracking-wider whitespace-nowrap">
              Start Lesson
            </span>
          </button>
        </div>
      ) : (
        /* ACTIVE LESSON SCREEN */
        <div className="flex flex-col items-center w-full max-w-2xl mt-16 z-10">
          
          {/* Renders your existing Flashcard component inside the retro layout */}
          <div className="w-full flex justify-center mb-8">
            {renderFlashcard()}
          </div>

          {/* Controls Area (Next / Start Quiz) */}
          <div className="flex flex-col items-center mt-4">
            {currentIdx === items.length - 1 ? (
              <button
                className="flex items-center gap-3 bg-[#4ade80] border-4 border-[#4a3018] px-8 py-4 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer group"
                onClick={() => navigate(`/quiz/${levelId}`)}
              >
                <img src="/smallw-removebg-preview.png" className="h-8 drop-shadow-md group-hover:animate-bounce" alt="Wizard" />
                <span className="text-[#4a3018] text-base font-bold uppercase tracking-wider whitespace-nowrap">
                  Start Quiz
                </span>
              </button>
            ) : (
              <button 
                className="bg-[#f9e4c8] border-4 border-[#4a3018] px-10 py-3 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer text-[#4a3018] font-bold uppercase tracking-widest text-sm"
                onClick={handleNext}
              >
                Next Item
              </button>
            )}

            {/* Retro Progress Indicator */}
            <div className="mt-6 bg-[#2a303c] border-2 border-[#4a3018] px-4 py-2 rounded-sm shadow-[4px_4px_0_#2d1a0b]">
              <span className="text-cyan-300 text-xs tracking-widest">
                PROGRESS: {currentIdx + 1}/{items.length}
              </span>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default LevelPage;