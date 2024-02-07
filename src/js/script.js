import WaveSurfer from "https://unpkg.com/wavesurfer.js/dist/wavesurfer.esm.js"
import RegionsPlugin from "https://unpkg.com/wavesurfer.js/dist/plugins/regions.esm.js"

import { QUESTION_LIST } from "./question_list.js";

const display = document.getElementById("display")
const button = document.getElementById("button")
const onemore = document.getElementById("onemore")
const waveform = document.getElementById("waveform")

let state = "first";
let question = null;
let questionMemory = [];
let canClick = true;
let redirected = false;

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  // 表示幅
  minPxPerSec: 250,
  // スクロールバーを非表示
  hideScrollbar: true,
  // 触れても何も起きない
  interact: false,
  // ノーマライズ
  normalize: true,
})

const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create())

// 音源の読み込み完了後に呼び出される
wavesurfer.on('decode', () => {
  // リージョン（マーカー）を全てクリアする
  wsRegions.clearRegions()
})

// 表示非表示を設定する
// target: element
const setHidden = (target, flag) => {
  if (flag) {
    target.style.visibility = "hidden";
  } else {
    target.style.visibility = "visible";
  }
}

// ボタンを押せるかどうか
const setCanClick = (flag) => {
  canClick = flag;
}

/// WaveSurfer
const setTime = (time) => {
  wavesurfer.setTime(time)
}

const play = (time = null) => {
  if (time !== null) {
    setTime(time);
  } else {
    setTime(question["drop"])
  }
  wavesurfer.play()
}

const pause = () => {
  wavesurfer.pause()
}

/// テキスト更新
const setDisplayText = (text) => {
  display.innerText = text;
}

const setButtonText = (text) => {
  button.innerText = text;
}

/// ゲームの進行
const introduction = () => {
  setDisplayText("始めようか");
  setButtonText("待ち遠しいです");
}

const waitForQuestion = () => {
  // カウントダウン中はボタンは押せない
  setCanClick(false);
  setButtonText("来るぞ・・・");
  countdown(3, guessStart);
}

const guessStart = () => {
  setCanClick(true);
  // 波形を表示
  setHidden(waveform, false);
  play(question["drop"]);
  setDisplayText("答えよ");
  setButtonText("理解りました");
}

const answer = () => {
  pause();
  setDisplayText("名は何という");
  setButtonText("答えを見る");
  // もう一回聞くボタンを表示
  setHidden(onemore, false);
}

const showAnswer = () => {
  // 出題開始地点にマーカーを設置
  wsRegions.clearRegions()
  setMarker("Question", question["drop"]);
  // ドロップの５秒前から流して答え合わせ
  play(question["drop"] - 5);
  setDisplayText(`${question["name"]}`);
  setButtonText("当然です");
}

const goToNextQuestion = () => {
  // もう一回聞くボタンを非表示
  setHidden(onemore, true);
  // 再生停止して初期化
  pause();
  init();
  setDisplayText("準備はいいか");
  setButtonText("待ち遠しいです");
}

const redirectToQuestions = () => {
  window.location.href = "pages/questions.html";
}

const oneMore = () => {
  if (state === "answered") {
    setHidden(onemore, true);
    state = "guessing";
    waitForQuestion();
  }
  else if (state === "checkingAnswer") {
    pause();
    showAnswer();
  }
}

const onclick = () => {
  if (!canClick) return;
  
  if (state === "first") {
    state = "waitForQuestion";
    introduction();
  }
  else if (state === "waitForQuestion") {
    state = "guessing";
    waitForQuestion();
  }
  else if (state === "guessing") {
    state = "answered"
    answer();
  }
  else if (state === "answered") {
    state = "checkingAnswer"
    showAnswer();
  }
  else if (state === "checkingAnswer") {
    if (redirected) {
      // questionに戻る
      redirectToQuestions();
      return
    }
    state = "waitForQuestion"
    goToNextQuestion();
  }
}

button.onclick = onclick;
onemore.onclick = oneMore;

document.addEventListener('keydown', (e) => {
  // スペースキーもボタンとして使用可能
  if (e.code === "Space") {
    onclick();
  }
});

// リダイレクトしてきたかどうかを確認
redirected = (localStorage.getItem("isDropSpecified") === "true")
if (redirected) {
  localStorage.setItem("isDropSpecified", false)
}

init();

function countdown(count, callback) {
  let i = count;
  setDisplayText(i)
  i--;

  const interval = setInterval(() => {
    setDisplayText(i)
    i--;

    if (i < 0) {
      clearInterval(interval);
      callback()
    }
  }, 1000);
}

function makeQuestion() {
  // 出題リストからランダムな問題を取得
  const index = Math.floor(Math.random() * QUESTION_LIST.length);
  const new_question = QUESTION_LIST[index]

  // 直近5題の重複を防ぐ
  const maxMemory = 5;
  const key = `${new_question["name"]}_${new_question["drop"]}`;

  if (questionMemory.includes(key)) {
    // 再帰
    return makeQuestion();
  }
  // 直近5題を記憶
  questionMemory.push(key)
  if (questionMemory.length > maxMemory) {
    questionMemory.shift()
  }

  // debug
  console.log(new_question)
  
  // ランダムなドロップを選択
  const drop_index = Math.floor(Math.random() * new_question["drop"].length);

  // 問題にフォーマットして返す
  return {
    "name": new_question["name"],
    "drop": new_question["drop"][drop_index],
    "url": new_question["url"],
  }
}

// 登録されたdropの合計を返す
function sumOfPatterns() {
  return QUESTION_LIST.reduce((sum, q) => sum + q["drop"].length, 0);
}

function getURLByName(name) {
  for (const q of QUESTION_LIST) {
    if (q.name === name) {
      return q.url
    }
  }
}

function init() {
  // もろもろの非表示
  setHidden(waveform, true);
  setHidden(onemore, true);

  // 問題を作成し設定
  if (redirected) {
    // リダイレクトしてきた
    const dropName = localStorage.getItem("dropName");
    const dropTime = localStorage.getItem("dropTime");
  
    const new_question = {
      "name": dropName,
      "drop": Number(dropTime),
      "url": getURLByName(dropName),
    }
  
    setQuestion(new_question);
    // カウントダウンまでスキップ
    state = "waitForQuestion"
    onclick()
  } else {
    setQuestion(makeQuestion());
  }
  // タイトルコール
  setDisplayText(`キックマエストロ（現在${QUESTION_LIST.length}曲・${sumOfPatterns()}パターン収録）`);
}

function setQuestion(new_question) {
  // 問題を作成し、wavesurferに登録する
  question = new_question;
  wavesurfer.load(new_question["url"]);
}

function setMarker(text, time) {
  wsRegions.addRegion({
    start: time,
    content: text,
    color: "#cccccc",
  })
}