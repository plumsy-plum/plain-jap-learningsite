import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { kanji } from "../data/kanji";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";

// Build a unique vocab list so padding duplicates do not repeat.
const vocab: LevelItem[] = (() => {
  const seen = new Map<string, LevelItem>();
  APP_DATA.forEach(level => {
    level.items.forEach(item => {
      if (item.type !== "vocab" || !item.romaji || !item.meaning) return;
      const baseCharacter = item.character.replace(/\s*\(\d+\)$/, "");
      if (!seen.has(baseCharacter)) {
        seen.set(baseCharacter, { ...item, character: baseCharacter });
      }
    });
  });
  return Array.from(seen.values());
})();

function getData(type: string) {
  switch (type) {
    case "hiragana": return hiragana;
    case "katakana": return katakana;
    case "kanji": return kanji;
    case "vocab": return vocab;
    default: return [];
  }
}

const CategoryTable: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const items = getData(type || "hiragana");
  
  const title = type ? type.toUpperCase() : "CATEGORY";

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center px-4 pb-16 pt-24"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      {/* 1. THE FOOLPROOF BACKGROUND LAYER */}
      <div 
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      {/* 2. PAGE TITLE */}
      <div className="mb-8 bg-[#f9e4c8] border-4 border-[#4a3018] px-8 py-4 shadow-[6px_6px_0_#2d1a0b] z-10">
        <h1 className="text-2xl md:text-3xl text-[#4a3018] text-center drop-shadow-sm tracking-wider">
          {title} INVENTORY
        </h1>
      </div>

      {/* 3. GAMIFIED PRACTICE BUTTON */}
      <button
        className="mb-12 flex items-center gap-3 bg-[#ffe8a3] border-4 border-[#4a3018] px-8 py-4 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer z-20 group"
        onClick={() => navigate(`/quiz/${type || "hiragana"}`)}
      >
        <img src="/smallw-removebg-preview.png" className="h-10 -ml-2 drop-shadow-md group-hover:animate-bounce" alt="Wizard" />
        <span className="text-[#4a3018] text-lg font-bold uppercase tracking-wider whitespace-nowrap">
          Practice {title}
        </span>
      </button>

      {/* 4. THE 3D FLIP CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl w-full mx-auto z-10">
        {items.map((item: LevelItem, idx: number) => (
          <GamifiedFlipCard key={idx} item={item} type={type || "hiragana"} />
        ))}
      </div>
    </div>
  );
};

// THE NEW GAMIFIED FLIP CARD COMPONENT
const GamifiedFlipCard: React.FC<{ item: LevelItem; type: string }> = ({ item, type }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="group h-80 w-64 cursor-pointer mx-auto"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div 
        className="relative h-full w-full transition-transform duration-500 ease-out"
        style={{ 
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* FRONT OF CARD (The Character) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pt-4 drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* LAYER 1 (BOTTOM): The Parchment Paper */}
          <div className="absolute top-[12%] bottom-[12%] left-[12%] right-[12%] bg-[#e1c699] rounded-xl -z-20 shadow-[inset_0_0_20px_rgba(90,50,20,0.4)]" />

          {/* LAYER 2 (MIDDLE): The Wooden Frame sitting ON TOP of the paper's edges */}
          <img 
            src="/frmae-removebg-preview.png" 
            alt="Wooden Frame" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none -z-10" 
          />

          {/* LAYER 3 (TOP): The Text */}
          <h2 className="text-6xl text-[#4a3018] drop-shadow-sm group-hover:animate-bounce z-10">
            {item?.char || item?.character}
          </h2>
          <div className="mt-8 text-[10px] text-[#4a3018] opacity-70 animate-pulse z-10">
            Click to Flip
          </div>
        </div>

        {/* BACK OF CARD (The Info) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* LAYER 1 (BOTTOM): The Parchment Paper */}
          <div className="absolute top-[12%] bottom-[12%] left-[12%] right-[12%] bg-[#e1c699] rounded-xl -z-20 shadow-[inset_0_0_20px_rgba(90,50,20,0.4)]" />

          {/* LAYER 2 (MIDDLE): The Wooden Frame */}
          <img 
            src="/frmae-removebg-preview.png" 
            alt="Wooden Frame" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none -z-10" 
          />

          {/* LAYER 3 (TOP): The Text Content */}
          <div className="z-10 flex flex-col items-center w-full">
            {type === "kanji" ? (
              <>
                <p className="text-[#4a3018] font-bold text-xs uppercase tracking-wider mb-2 leading-relaxed">{item?.meaning}</p>
                <div className="w-12 h-1 bg-[#4a3018] opacity-30 mb-3" />
                <p className="text-[9px] text-[#4a3018] mb-1"><span className="font-bold">KUN:</span> {item?.kunyomi}</p>
                <p className="text-[9px] text-[#4a3018] mb-1"><span className="font-bold">ON:</span> {item?.onyomi}</p>
              </>
            ) : type === "hiragana" || type === "katakana" ? (
              <>
                <h2 className="text-3xl text-[#4a3018] mb-3">{item?.romaji}</h2>
                <div className="w-12 h-1 bg-[#4a3018] opacity-30 mb-3" />
                <p className="text-[10px] text-[#4a3018] uppercase">Romaji</p>
              </>
            ) : (
              <>
                <p className="text-[#4a3018] font-bold text-xs uppercase tracking-wider mb-2 leading-relaxed">{item?.meaning}</p>
                {item?.example && (
                  <p className="text-[8px] text-[#4a3018] opacity-80 leading-tight mt-2">{item.example}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;