import { hiragana } from "./hiragana";
import { katakana } from "./katakana";
import { kanji } from "./kanji";

export type LevelItemType = "hiragana" | "katakana" | "kanji" | "vocab" | "grammar";

export interface LevelItem {
  character: string;
  meaning?: string;
  romaji?: string;
  example?: string;
  kunyomi?: string;
  onyomi?: string;
  type: LevelItemType;
}

export interface AppLevel {
  levelId: string;
  items: LevelItem[];
}

const vocab: LevelItem[] = [
  { character: "ありがとう", meaning: "thank you", romaji: "arigatou", example: "ありがとう！", type: "vocab" },
  { character: "こんにちは", meaning: "hello", romaji: "konnichiwa", example: "こんにちは！", type: "vocab" },
  { character: "さようなら", meaning: "goodbye", romaji: "sayounara", example: "さようなら。", type: "vocab" },
  { character: "はい", meaning: "yes", romaji: "hai", example: "はい、そうです。", type: "vocab" },
  { character: "いいえ", meaning: "no", romaji: "iie", example: "いいえ、違います。", type: "vocab" },
  { character: "すみません", meaning: "excuse me", romaji: "sumimasen", example: "すみません！", type: "vocab" },
  { character: "お願いします", meaning: "please", romaji: "onegaishimasu", example: "お願いします。", type: "vocab" },
  { character: "おはよう", meaning: "good morning", romaji: "ohayou", example: "おはようございます。", type: "vocab" }
];

const grammar: LevelItem[] = [
  { character: "これは〜です", meaning: "This is ...", romaji: "kore wa ~ desu", example: "これは本です。", type: "grammar" },
  { character: "〜ません", meaning: "negative present tense", romaji: "~ masen", example: "行きません。", type: "grammar" },
  { character: "〜ますか", meaning: "question form", romaji: "~ masu ka", example: "行きますか。", type: "grammar" }
];

const ensure20 = (items: LevelItem[]): LevelItem[] => {
  if (items.length >= 20) return items.slice(0, 20);
  const last = items[items.length - 1];
  const padding = Array.from({ length: 20 - items.length }, (_, idx) => ({
    ...last,
    character: `${last.character} (${idx + 1})`
  }));
  return [...items, ...padding];
};

const hiraToItem = (h: { char: string; romaji: string }): LevelItem => ({
  character: h.char,
  romaji: h.romaji,
  type: "hiragana"
});

const kataToItem = (k: { char: string; romaji: string }): LevelItem => ({
  character: k.char,
  romaji: k.romaji,
  type: "katakana"
});

const kanjiToItem = (k: { char: string; meaning: string; kunyomi: string; onyomi: string; example: string }): LevelItem => ({
  character: k.char,
  meaning: k.meaning,
  kunyomi: k.kunyomi,
  onyomi: k.onyomi,
  example: k.example,
  type: "kanji"
});

export const APP_DATA: AppLevel[] = [
  {
    levelId: "L1",
    items: ensure20([
      ...hiragana.slice(0, 12).map(hiraToItem),
      vocab[0],
      vocab[1],
      vocab[2]
    ])
  },
  {
    levelId: "L2",
    items: ensure20([
      ...hiragana.slice(12, 24).map(hiraToItem),
      vocab[3],
      vocab[4],
      vocab[5]
    ])
  },
  {
    levelId: "L3",
    items: ensure20([
      ...hiragana.slice(24, 36).map(hiraToItem),
      vocab[6],
      vocab[7],
      vocab[0]
    ])
  },
  {
    levelId: "L4",
    items: ensure20([
      ...hiragana.slice(36, 41).map(hiraToItem),
      ...katakana.slice(0, 5).map(kataToItem),
      vocab[0],
      vocab[1],
      vocab[2],
      vocab[3],
      vocab[4],
      kanjiToItem(kanji[0]),
      kanjiToItem(kanji[1])
    ])
  },
  {
    levelId: "L5",
    items: ensure20([
      ...hiragana.slice(41, 46).map(hiraToItem),
      ...katakana.slice(5, 10).map(kataToItem),
      vocab[5],
      vocab[6],
      vocab[7],
      vocab[0],
      vocab[1],
      kanjiToItem(kanji[2]),
      kanjiToItem(kanji[3])
    ])
  },
  {
    levelId: "L6",
    items: ensure20([
      ...hiragana.slice(0, 5).map(hiraToItem),
      ...katakana.slice(10, 15).map(kataToItem),
      vocab[2],
      vocab[3],
      vocab[4],
      vocab[5],
      vocab[6],
      vocab[7],
      kanjiToItem(kanji[4]),
      kanjiToItem(kanji[5])
    ])
  },
  {
    levelId: "L7",
    items: ensure20([
      grammar[0],
      kanjiToItem(kanji[6]),
      kanjiToItem(kanji[7]),
      kanjiToItem(kanji[8])
    ])
  },
  {
    levelId: "L8",
    items: ensure20([
      grammar[1],
      kanjiToItem(kanji[9]),
      kanjiToItem(kanji[10]),
      kanjiToItem(kanji[11])
    ])
  },
  {
    levelId: "L9",
    items: ensure20([
      grammar[2],
      kanjiToItem(kanji[12]),
      kanjiToItem(kanji[13]),
      kanjiToItem(kanji[14])
    ])
  },
  {
    levelId: "L10",
    items: ensure20([
      kanjiToItem(kanji[15]),
      kanjiToItem(kanji[16]),
      kanjiToItem(kanji[17]),
      kanjiToItem(kanji[18])
    ])
  },
  {
    levelId: "L11",
    items: ensure20([
      { character: "友達", meaning: "friend", romaji: "tomodachi", example: "友達に会う。", type: "vocab" },
      { character: "映画", meaning: "movie", romaji: "eiga", example: "映画を見る。", type: "vocab" },
      { character: "音楽", meaning: "music", romaji: "ongaku", example: "音楽を聴く。", type: "vocab" },
      { character: "料理", meaning: "cooking", romaji: "ryouri", example: "料理を作る。", type: "vocab" },
      { character: "買い物", meaning: "shopping", romaji: "kaimono", example: "買い物に行く。", type: "vocab" },
      { character: "勉強", meaning: "study", romaji: "benkyou", example: "日本語を勉強する。", type: "vocab" },
      { character: "仕事", meaning: "work", romaji: "shigoto", example: "仕事をする。", type: "vocab" },
      { character: "旅行", meaning: "travel", romaji: "ryokou", example: "旅行に行く。", type: "vocab" },
      { character: "公園", meaning: "park", romaji: "kouen", example: "公園で歩く。", type: "vocab" },
      { character: "駅", meaning: "station", romaji: "eki", example: "駅に着く。", type: "vocab" },
      { character: "電車", meaning: "train", romaji: "densha", example: "電車に乗る。", type: "vocab" },
      { character: "車", meaning: "car", romaji: "kuruma", example: "車を運転する。", type: "vocab" },
      { character: "自転車", meaning: "bicycle", romaji: "jitensha", example: "自転車で行く。", type: "vocab" },
      { character: "病院", meaning: "hospital", romaji: "byouin", example: "病院へ行く。", type: "vocab" },
      { character: "薬", meaning: "medicine", romaji: "kusuri", example: "薬を飲む。", type: "vocab" },
      { character: "天気", meaning: "weather", romaji: "tenki", example: "天気がいい。", type: "vocab" },
      { character: "雨", meaning: "rain", romaji: "ame", example: "雨が降る。", type: "vocab" },
      { character: "雪", meaning: "snow", romaji: "yuki", example: "雪が降る。", type: "vocab" },
      { character: "海", meaning: "sea", romaji: "umi", example: "海に行く。", type: "vocab" },
      { character: "川", meaning: "river", romaji: "kawa", example: "川で歩く。", type: "vocab" }
    ])
  },
  {
    levelId: "L12",
    items: ensure20([
      { character: "朝ごはん", meaning: "breakfast", romaji: "asagohan", example: "朝ごはんを食べる。", type: "vocab" },
      { character: "昼ごはん", meaning: "lunch", romaji: "hirugohan", example: "昼ごはんを食べる。", type: "vocab" },
      { character: "晩ごはん", meaning: "dinner", romaji: "bangohan", example: "晩ごはんを作る。", type: "vocab" },
      { character: "お茶", meaning: "tea", romaji: "ocha", example: "お茶を飲む。", type: "vocab" },
      { character: "牛乳", meaning: "milk", romaji: "gyuunyuu", example: "牛乳を飲む。", type: "vocab" },
      { character: "パン", meaning: "bread", romaji: "pan", example: "パンを焼く。", type: "vocab" },
      { character: "卵", meaning: "egg", romaji: "tamago", example: "卵を食べる。", type: "vocab" },
      { character: "魚", meaning: "fish", romaji: "sakana", example: "魚を料理する。", type: "vocab" },
      { character: "肉", meaning: "meat", romaji: "niku", example: "肉を買う。", type: "vocab" },
      { character: "野菜", meaning: "vegetables", romaji: "yasai", example: "野菜を切る。", type: "vocab" },
      { character: "果物", meaning: "fruit", romaji: "kudamono", example: "果物を食べる。", type: "vocab" },
      { character: "砂糖", meaning: "sugar", romaji: "satou", example: "砂糖を入れる。", type: "vocab" },
      { character: "塩", meaning: "salt", romaji: "shio", example: "塩を少し。", type: "vocab" },
      { character: "油", meaning: "oil", romaji: "abura", example: "油を使う。", type: "vocab" },
      { character: "皿", meaning: "plate", romaji: "sara", example: "皿を洗う。", type: "vocab" },
      { character: "箸", meaning: "chopsticks", romaji: "hashi", example: "箸を使う。", type: "vocab" },
      { character: "コップ", meaning: "cup", romaji: "koppu", example: "コップに水。", type: "vocab" },
      { character: "スプーン", meaning: "spoon", romaji: "supuun", example: "スプーンで食べる。", type: "vocab" },
      { character: "フォーク", meaning: "fork", romaji: "fooku", example: "フォークを使う。", type: "vocab" },
      { character: "ナイフ", meaning: "knife", romaji: "naifu", example: "ナイフで切る。", type: "vocab" }
    ])
  }
];
