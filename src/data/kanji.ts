interface KanjiChar {
  char: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  example: string;
}

export const kanji: KanjiChar[] = [
  { char: '日', meaning: 'day/sun', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, -び, -か', example: '今日は良い日です (kyou wa yoi hi desu)' },
  { char: '一', meaning: 'one', onyomi: 'イチ, イツ', kunyomi: 'ひと-, ひとつ', example: '一つください (hitotsu kudasai)' },
  { char: '国', meaning: 'country', onyomi: 'コク', kunyomi: 'くに', example: '日本は美しい国です (nihon wa utsukushii kuni desu)' },
  { char: '人', meaning: 'person', onyomi: 'ジン, ニン', kunyomi: 'ひと', example: '三人います (san nin imasu)' },
  { char: '年', meaning: 'year', onyomi: 'ネン', kunyomi: 'とし', example: '一年が過ぎました (ichinen ga sugimashita)' },
  { char: '大', meaning: 'big', onyomi: 'ダイ, タイ', kunyomi: 'おお-, おおきい, おおいに', example: '大きな家 (ookina ie)' },
  { char: '十', meaning: 'ten', onyomi: 'ジュウ, ジッ, ジュッ', kunyomi: 'とお, と', example: '十人 (juu nin)' },
  { char: '二', meaning: 'two', onyomi: 'ニ', kunyomi: 'ふた, ふたつ', example: '二つあります (futatsu arimasu)' },
  { char: '本', meaning: 'book/origin', onyomi: 'ホン', kunyomi: 'もと', example: '本を読む (hon o yomu)' },
  { char: '中', meaning: 'middle', onyomi: 'チュウ', kunyomi: 'なか, うち, あたる', example: '部屋の中 (heya no naka)' },
  { char: '長', meaning: 'long', onyomi: 'チョウ', kunyomi: 'ながい, おさ', example: '長い道 (nagai michi)' },
  { char: '出', meaning: 'exit', onyomi: 'シュツ, スイ', kunyomi: 'でる, だす, いでる, いだす', example: '出口 (deguchi)' },
  { char: '三', meaning: 'three', onyomi: 'サン', kunyomi: 'み, みつ, みっつ', example: '三本 (san bon)' },
  { char: '時', meaning: 'time/hour', onyomi: 'ジ', kunyomi: 'とき, -どき', example: '五時です (go ji desu)' },
  { char: '行', meaning: 'go', onyomi: 'コウ, ギョウ, アン', kunyomi: 'いく, ゆく, おこなう', example: '学校へ行く (gakkou e iku)' },
  { char: '見', meaning: 'see', onyomi: 'ケン', kunyomi: 'みる, みえる, みせる', example: '映画を見る (eiga o miru)' },
  { char: '月', meaning: 'month/moon', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', example: '月がきれいです (tsuki ga kirei desu)' },
  { char: '後', meaning: 'after', onyomi: 'ゴ, コウ', kunyomi: 'のち, うしろ, あと, おくれる', example: '後で会いましょう (ato de aimashou)' },
  { char: '前', meaning: 'before', onyomi: 'ゼン', kunyomi: 'まえ', example: '前に進む (mae ni susumu)' },
  { char: '生', meaning: 'life', onyomi: 'セイ, ショウ', kunyomi: 'いきる, うまれる, はえる, なま, き, いける', example: '生きる意味 (ikiru imi)' },
  { char: '五', meaning: 'five', onyomi: 'ゴ', kunyomi: 'いつ, いつつ', example: '五人 (go nin)' },
  { char: '間', meaning: 'interval', onyomi: 'カン, ケン', kunyomi: 'あいだ, ま, あい', example: '時間 (jikan)' },
  { char: '上', meaning: 'up', onyomi: 'ジョウ, ショウ, シャン', kunyomi: 'うえ, うわ, かみ, あげる, のぼる, のぼす, よす', example: '上に行く (ue ni iku)' },
  { char: '東', meaning: 'east', onyomi: 'トウ', kunyomi: 'ひがし', example: '東の空 (higashi no sora)' },
  { char: '四', meaning: 'four', onyomi: 'シ', kunyomi: 'よ, よつ, よっつ, よん', example: '四つ (yottsu)' }
];
