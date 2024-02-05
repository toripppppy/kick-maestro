/* 出題リスト

指定の形式で音源ファイルと問題を登録すると出題リストに追加されます。
問題を追加する際は以下の形式に従ってください。

音源ファイルを assets/audio に格納してください。ただし対応しているファイル形式は wav, mp3 のみです。
音源ファイルの作成は、 https://ytmp3.nu/CNtD/ などの YouTube -> mp3 変換サイトが便利です。

音源を格納したら、以下の形式に従ってQUESTION_LISTに要素を追加してください。

{
  "name": String
  - "コンポーザー名 - 曲名" の形式で入力してください。
  - 答えとして表示されるものです。

  "drop": Array[Number]
  - 出題する始点となる秒数を指定できます。キックが鳴り始める瞬間を指定してください。
  - 必ず秒数で計算して記載してください。（1m15sなら75, 3m38sなら218のように）
  - 値を複数指定すると、出題時にランダムで一つ選択され出題されます。
  - 曲中の音色の異なるキックを全て登録するとバリエーションが生まれて難易度が上がり面白いです。^^
  - キック以外を含むパートを登録してしまうと難易度が下がります。(-o-)

  "url": String
  - 音源ファイルへのパスまたはリンクを記載してください。
  - 相対パス・絶対パス・URLに対応していますが、相対パスを推奨します。
  - 対応しているファイル形式は wav, mp3 のみです。
}

他の問題と同様に登録できていれば大丈夫です。
リロードしてゲームをお楽しみください。
*/ 

export const QUESTION_LIST = [
  {
    "name": "TOZA & Stratisphere - WARZONE",
    "drop": [34, 52, 139, 153],
    "url": "src/assets/audio/WARZONE.mp3"
  },
  {
    "name": "Malice - MF KING",
    "drop": [30, 42, 48],
    "url": "src/assets/audio/Malice - MF KING (Official Video).mp3"
  },
  {
    "name": "Rebelion - In Control",
    "drop": [70, 82, 184],
    "url": "src/assets/audio/Rebelion - In Control (Official Video).mp3"
  },
  {
    "name": "Riot Shift - PIECES",
    "drop": [81, 93],
    "url": "src/assets/audio/Riot Shift - PIECES (Official Video).mp3"
  },
  {
    "name": "Malice - MY THERAPY",
    "drop": [40, 52, 64, 136],
    "url": "src/assets/audio/Malice - MY THERAPY (Official Video).mp3"
  },
  {
    "name": "BATTLE NO.1 (DJ Myosuke Remix)",
    "drop": [67, 117],
    "url": "src/assets/audio/TANOC Sound Team - BATTLE NO.1 (DJ Myosuke Remix).mp3"
  },
  {
    "name": "DJ Myosuke - Megaton Keeper",
    "drop": [39, 160],
    "url": "src/assets/audio/DJ Myosuke - Megaton Keeper.mp3"
  },
  {
    "name": "Malice - Stronger",
    "drop": [63, 75, 153],
    "url": "src/assets/audio/Malice - Stronger (Official Videoclip).mp3"
  },
  {
    "name": "RoughSketch - Ill",
    "drop": [44, 57],
    "url": "src/assets/audio/RoughSketch - Ill.mp3"
  },
  {
    "name": "Riot Shift - SAME AGAIN",
    "drop": [87, 99],
    "url": "src/assets/audio/Riot Shift - SAME AGAIN (Official Music Video).mp3"
  },
  {
    "name": "Yuta Imai - UNKNOWN LEVELS(Extended Mix)",
    "drop": [27, 45, 80, 194],
    "url": "src/assets/audio/Yuta Imai - UNKNOWN LEVELS (Extended Mix).mp3"
  },
  {
    "name": "Hard Driver - Blood Sugar",
    "drop": [66, 78, 84, 135, 141, 147, 153],
    "url": "src/assets/audio/Hard Driver - Blood Sugar (Official Hardstyle Video).mp3"
  },
  {
    "name": "Sub Zero Project & Villain - The Solution",
    "drop": [69],
    "url": "src/assets/audio/Sub Zero Project & Villain - The Solution (Official Video).mp3"
  },
  {
    "name": "Neroz & Irradiate - Forged In Fury",
    "drop": [31, 41, 63, 152, 165, 223],
    "url": "src/assets/audio/Neroz & Irradiate - Forged In Fury (Official Videoclip).mp3"
  },
  {
    "name": "Bloodlust & Regain - GET UP",
    "drop": [35, 51, 128, 147, 159],
    "url": "src/assets/audio/Bloodlust & Regain - GET UP (Official Video).mp3"
  },
  {
    "name": "Warface - Taste The Blade",
    "drop": [60, 78, 168],
    "url": "src/assets/audio/Warface - Taste The Blade (Official Video).mp3"
  },
  {
    "name": "Warface & Code Black - Here Forever",
    "drop": [70, 85, 91, 160, 172],
    "url": "src/assets/audio/Warface & Code Black - Here Forever (Official Video).mp3"
  },
  {
    "name": "BCM - #BassHouse",
    "drop": [75, 105, 175],
    "url": "src/assets/audio/BCM - BassHouse.mp3"
  },
  {
    "name": "Headhunterz & Vertile ft. Sian Evans - Lost Without You",
    "drop": [117, 229],
    "url": "src/assets/audio/Headhunterz & Vertile ft. Sian Evans - Lost Without You (Defqon.1 2023 Closing Theme).mp3"
  },
  {
    "name": "Sefa - 1527",
    "drop": [136, 146],
    "url": "src/assets/audio/Sefa - 1527 (Official Video).mp3"
  },
  {
    "name": "Headhunterz & Vertile - Before I Wake",
    "drop": [44, 57, 69],
    "url": "src/assets/audio/Headhunterz & Vertile - Before I Wake (Official Videoclip).mp3"
  },
  {
    "name": "DJ Mad Dog - Reset",
    "drop": [19, 28, 33, 52, 62, 136, 146, 156, 165],
    "url": "src/assets/audio/DJ Mad Dog - Reset.mp3"
  },
  {
    "name": "The Purge & Adjuzt ft. RXBY  - Summer Secrets",
    "drop": [71, 89, 155, 167],
    "url": "src/assets/audio/The Purge & Adjuzt ft. RXBY  - Summer Secrets  Q-dance Records.mp3"
  },
  {
    "name": "MINUS MILITIA - GAS D'R OP",
    "drop": [21, 61, 102],
    "url": "src/assets/audio/MINUS MILITIA - GAS D'R OP (Official Video).mp3"
  },
  {
    "name": "The Prophet - Wanna Play?",
    "drop": [47, 59, 195, 205],
    "url": "src/assets/audio/The Prophet - Wanna Play？ (Official Videoclip).mp3"
  },
]
