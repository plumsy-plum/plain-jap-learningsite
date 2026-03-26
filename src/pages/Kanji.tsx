import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <div 
      className="relative min-h-screen w-full flex flex-col items-center px-4 pb-16 pt-24"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      {/* THE FOOLPROOF BACKGROUND LAYER */}
      <div 
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      {/* PAGE TITLE */}
      <div className="mb-8 bg-[#f9e4c8] border-4 border-[#4a3018] px-8 py-4 shadow-[6px_6px_0_#2d1a0b] z-10">
        <h1 className="text-2xl md:text-3xl text-[#4a3018] text-center drop-shadow-sm uppercase tracking-wider">
          Kanji Inventory
        </h1>
      </div>

      {/* GAMIFIED START QUIZ BUTTON */}
      <button
        className="mb-12 flex items-center gap-3 bg-[#ffe8a3] border-4 border-[#4a3018] px-8 py-4 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer z-20 group"
        onClick={() => navigate("/quiz/kanji")}
      >
        <img src="/smallw-removebg-preview.png" className="h-10 -ml-2 drop-shadow-md group-hover:animate-bounce" alt="Wizard" />
        <span className="text-[#4a3018] text-lg font-bold uppercase tracking-wider whitespace-nowrap">Start Quest</span>
      </button>

      {/* THE FRAME GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl w-full mx-auto z-10">
        
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="relative flex flex-col items-center justify-center h-80 w-64 mx-auto bg-contain bg-center bg-no-repeat hover:-translate-y-3 hover:scale-105 transition-all duration-200 cursor-pointer group"
            style={{ backgroundImage: "url('/frmae-removebg-preview.png')" }}
          >
            <div className="flex flex-col items-center text-center px-8 pt-4">
              <h2 className="text-6xl text-[#4a3018] drop-shadow-sm mb-4 group-hover:animate-bounce">
                {item.character}
              </h2>
              <div className="w-16 h-1 bg-[#4a3018] opacity-30 mb-4" />
              <p className="text-[#4a3018] font-bold text-xs uppercase tracking-wider mb-2 leading-relaxed">
                {item.meaning}
              </p>
              <p className="text-[10px] text-[#4a3018] font-bold mb-1 opacity-90">
                {item.romaji}
              </p>
              {item.example && (
                <p className="text-[8px] text-[#4a3018] opacity-70 leading-tight mt-1 px-2">
                  {item.example}
                </p>
              )}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Kanji;