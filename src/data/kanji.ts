interface KanjiChar {
  char: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
}

export const kanji: KanjiChar[] = [
  { char: '日', meaning: 'day/sun', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, -び, -か' },
  { char: '一', meaning: 'one', onyomi: 'イチ, イツ', kunyomi: 'ひと-, ひとつ' },
  { char: '国', meaning: 'country', onyomi: 'コク', kunyomi: 'くに' },
  { char: '人', meaning: 'person', onyomi: 'ジン, ニン', kunyomi: 'ひと' },
  { char: '年', meaning: 'year', onyomi: 'ネン', kunyomi: 'とし' },
  { char: '大', meaning: 'big', onyomi: 'ダイ, タイ', kunyomi: 'おお-, おおきい, おおいに' },
  { char: '十', meaning: 'ten', onyomi: 'ジュウ, ジッ, ジュッ', kunyomi: 'とお, と' },
  { char: '二', meaning: 'two', onyomi: 'ニ, ジ', kunyomi: 'ふた, ふたつ' },
  { char: '本', meaning: 'book/origin', onyomi: 'ホン', kunyomi: 'もと' },
  { char: '中', meaning: 'middle', onyomi: 'チュウ', kunyomi: 'なか, うち, あたる' },
  { char: '長', meaning: 'long', onyomi: 'チョウ', kunyomi: 'ながい, おさ' },
  { char: '出', meaning: 'exit', onyomi: 'シュツ, スイ', kunyomi: 'でる, だす, いでる, いだす' },
  { char: '三', meaning: 'three', onyomi: 'サン', kunyomi: 'み, みつ, みっつ' },
  { char: '時', meaning: 'time/hour', onyomi: 'ジ', kunyomi: 'とき, -どき' },
  { char: '行', meaning: 'go', onyomi: 'コウ, ギョウ, アン', kunyomi: 'いく, ゆく, おこなう' },
  { char: '見', meaning: 'see', onyomi: 'ケン', kunyomi: 'みる, みえる, みせる' },
  { char: '月', meaning: 'month/moon', onyomi: 'ゲツ, ガツ', kunyomi: 'つき' },
  { char: '後', meaning: 'after', onyomi: 'ゴ, コウ', kunyomi: 'のち, うしろ, あと, おくれる' },
  { char: '前', meaning: 'before', onyomi: 'ゼン', kunyomi: 'まえ' },
  { char: '生', meaning: 'life', onyomi: 'セイ, ショウ', kunyomi: 'いきる, うまれる, はえる, なま, き, いける' },
  { char: '五', meaning: 'five', onyomi: 'ゴ', kunyomi: 'いつ, いつつ' },
  { char: '間', meaning: 'interval', onyomi: 'カン, ケン', kunyomi: 'あいだ, ま, あい' },
  { char: '上', meaning: 'up', onyomi: 'ジョウ, ショウ, シャン', kunyomi: 'うえ, うわ, かみ, あげる, のぼる, のぼす, よす' },
  { char: '東', meaning: 'east', onyomi: 'トウ', kunyomi: 'ひがし' },
  { char: '四', meaning: 'four', onyomi: 'シ', kunyomi: 'よ, よつ, よっつ, よん' }
];
