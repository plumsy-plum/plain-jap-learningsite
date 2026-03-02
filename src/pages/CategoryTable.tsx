import React, { useState } from "react";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { kanji } from "../data/kanji";
import { APP_DATA } from "../data/levels";
import type { LevelItem } from "../data/levels";
import "./CategoryTable.css";
import { useParams } from "react-router-dom";

// Build a unique vocab list so padding duplicates from ensure20 do not repeat.
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
  const items = getData(type || "hiragana");
  return (
    <div className="category-table-container">
      <h2 className="category-title">{type ? (type.charAt(0).toUpperCase() + type.slice(1)) : "Category"} Grid</h2>
      <div className="category-grid">
        {items.map((item: LevelItem, idx: number) => (
          <FlipCard key={idx} item={item} type={type || "hiragana"} />
        ))}
      </div>
    </div>
  );
};

const FlipCard: React.FC<{ item: LevelItem; type: string }> = ({ item, type }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <span className="card-char">{item.char || item.character}</span>
        </div>
        <div className="flip-card-back">
          {type === "kanji" ? (
            <>
              <span className="card-info"><strong>Meaning:</strong> {item.meaning}</span>
              <span className="card-info"><strong>Example:</strong> {item.example}</span>
              <span className="card-info"><strong>Kunyomi:</strong> {item.kunyomi}</span>
              <span className="card-info"><strong>Onyomi:</strong> {item.onyomi}</span>
            </>
          ) : type === "hiragana" || type === "katakana" ? (
            <span className="card-info"><strong>Romaji:</strong> {item.romaji}</span>
          ) : (
            <>
              <span className="card-info"><strong>Meaning:</strong> {item.meaning}</span>
              <span className="card-info"><strong>Example:</strong> {item.example}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
