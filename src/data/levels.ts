import { hiragana } from "./hiragana";
import { katakana } from "./katakana";
import { kanji } from "./kanji";

/**
 * Basic shape of an item that can appear in a level.
 * Designed to match the JSON structure described in the paper:
 *  {
 *    character: string;
 *    meaning?: string;
 *    romaji?: string;
 *    example?: string;
 *    audio?: string;
 *  }
 */
export interface LevelItem {
  character: string;
  meaning?: string;
  romaji?: string;
  example?: string;
  audio?: string;
}

/**
 * A single level containing an arbitrary list of LevelItems.
 */
export interface AppLevel {
  levelId: string;
  items: LevelItem[];
}

// some vocabulary examples that are referenced across levels
const vocab: LevelItem[] = [
  { character: "猫", meaning: "cat", romaji: "neko", example: "猫です。", audio: "" },
  { character: "犬", meaning: "dog", romaji: "inu", example: "犬がいます。", audio: "" },
  { character: "本", meaning: "book", romaji: "hon", example: "本を読む。", audio: "" },
  { character: "水", meaning: "water", romaji: "mizu", example: "水を飲む。", audio: "" },
  { character: "火", meaning: "fire", romaji: "hi", example: "火を消す。", audio: "" },
  { character: "山", meaning: "mountain", romaji: "yama", example: "山に登る。", audio: "" },
  { character: "空", meaning: "sky", romaji: "sora", example: "空が青い。", audio: "" },
  { character: "学校", meaning: "school", romaji: "gakkou", example: "学校へ行く。", audio: "" }
];

// a few grammar patterns used in later levels
const grammar: LevelItem[] = [
  { character: "〜たい", meaning: "want to (verb)", example: "行きたいです。", audio: "" },
  { character: "〜ている", meaning: "progressive/continuous", example: "食べている。", audio: "" },
  { character: "〜でしょう", meaning: "probably/should be", example: "雨でしょう。", audio: "" }
];

// helper to convert hiragana/katakana/kanji entries to the LevelItem shape
const hiraToItem = (h: { char: string; romaji: string }): LevelItem => ({
  character: h.char,
  romaji: h.romaji
});

const kataToItem = (k: { char: string; romaji: string }): LevelItem => ({
  character: k.char,
  romaji: k.romaji
});

const kanjiToItem = (k: { char: string; meaning: string }): LevelItem => ({
  character: k.char,
  meaning: k.meaning
});

// build the ten levels according to the specification
export const APP_DATA: AppLevel[] = [
  {
    levelId: "L1",
    items: [
      ...hiragana.slice(0, 12).map(hiraToItem),
      vocab[0],
      vocab[1],
      vocab[2]
    ]
  },
  {
    levelId: "L2",
    items: [
      ...hiragana.slice(12, 24).map(hiraToItem),
      vocab[3],
      vocab[4],
      vocab[5]
    ]
  },
  {
    levelId: "L3",
    items: [
      ...hiragana.slice(24, 36).map(hiraToItem),
      vocab[6],
      vocab[7],
      vocab[0] // repeat for demonstration
    ]
  },
  {
    levelId: "L4",
    items: [
      ...hiragana.slice(36, 41).map(hiraToItem),
      ...katakana.slice(0, 5).map(kataToItem),
      vocab[0],
      vocab[1],
      vocab[2],
      vocab[3],
      vocab[4],
      kanji.slice(0, 2).map(kanjiToItem)[0],
      kanji.slice(0, 2).map(kanjiToItem)[1]
    ]
  },
  {
    levelId: "L5",
    items: [
      ...hiragana.slice(41, 46).map(hiraToItem),
      ...katakana.slice(5, 10).map(kataToItem),
      vocab[5],
      vocab[6],
      vocab[7],
      vocab[0],
      vocab[1],
      kanji.slice(2, 4).map(kanjiToItem)[0],
      kanji.slice(2, 4).map(kanjiToItem)[1]
    ]
  },
  {
    levelId: "L6",
    items: [
      ...hiragana.slice(0, 5).map(hiraToItem),
      ...katakana.slice(10, 15).map(kataToItem),
      vocab[2],
      vocab[3],
      vocab[4],
      vocab[5],
      vocab[6],
      vocab[7],
      kanji.slice(4, 6).map(kanjiToItem)[0],
      kanji.slice(4, 6).map(kanjiToItem)[1]
    ]
  },
  {
    levelId: "L7",
    items: [
      grammar[0],
      kanjiToItem(kanji[6]),
      kanjiToItem(kanji[7]),
      kanjiToItem(kanji[8])
    ]
  },
  {
    levelId: "L8",
    items: [
      grammar[1],
      kanjiToItem(kanji[9]),
      kanjiToItem(kanji[10]),
      kanjiToItem(kanji[11])
    ]
  },
  {
    levelId: "L9",
    items: [
      grammar[2],
      kanjiToItem(kanji[12]),
      kanjiToItem(kanji[13]),
      kanjiToItem(kanji[14])
    ]
  },
  {
    levelId: "L10",
    items: [
      kanjiToItem(kanji[15]),
      kanjiToItem(kanji[16]),
      kanjiToItem(kanji[17]),
      kanjiToItem(kanji[18])
    ]
  }
];
