import { WaveViewer } from "./libs/waveViewer.js";

import { HARDSTYLE_QUESTION_LIST } from "./question_lists/hardstyle.js";
import { TECHNO_QUESTION_LIST } from "./question_lists/techno.js";

const genreSelector = document.getElementById("genre");
const display = document.getElementById("display")
const button = document.getElementById("button")
const onemore = document.getElementById("onemore")
const waveform = document.getElementById("waveform")

const waveViewer = new WaveViewer();

let state = "first";
let question = null;
let questionMemory = [];
let canClick = true;
let redirected = false;

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

  // 問題を作成し設定
  setQuestion(makeQuestion());
  // ジャンルセレクターを非表示
  setHidden(genreSelector, true);
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
  waveViewer.play(question["drop"]);
  setDisplayText("答えよ");
  setButtonText("理解りました");
}

const answer = () => {
  waveViewer.pause();
  setDisplayText("名は何という");
  setButtonText("答えを見る");
  // もう一回聞くボタンを表示
  setHidden(onemore, false);
}

const showAnswer = () => {
  // 出題開始地点にマーカーを設置
  waveViewer.placeMarker("Question", question["drop"]);
  // ドロップの５秒前から流して答え合わせ
  waveViewer.play(question["drop"] - 5);
  setDisplayText(`${question["name"]}`);
  setButtonText("当然です");
}

const goToNextQuestion = () => {
  // もう一回聞くボタンを非表示
  setHidden(onemore, true);
  // 再生停止して初期化
  waveViewer.pause();
  init();
  setDisplayText("準備はいいか");
  setButtonText("待ち遠しいです");
}

const redirectToQuestions = () => {
  window.location.href = "pages/drop_list.html";
}

const oneMore = () => {
  if (state === "answered") {
    setHidden(onemore, true);
    state = "guessing";
    waitForQuestion();
  }
  else if (state === "checkingAnswer") {
    waveViewer.pause();
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
    // 問題を作成し設定
    setQuestion(makeQuestion());
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

window.addEventListener('DOMContentLoaded', function() {
  // リダイレクトしてきたかどうかを確認
  redirected = (localStorage.getItem("isRedirected") === "true")
  if (redirected) {
    localStorage.removeItem("isRedirected")
    console.log("isRedirected")
  }
  // 初期化
  init();
});

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
  const QUESTION_LIST = getSelectedList();

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
  const QUESTION_LIST = getSelectedList();
  return QUESTION_LIST.reduce((sum, q) => sum + q["drop"].length, 0);
}

function getURLByName(name) {
  const QUESTION_LIST = getSelectedList();
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
    // タイトルコール
    const QUESTION_LIST = getSelectedList();
    setDisplayText(`キックマエストロ（現在${QUESTION_LIST.length}曲・${sumOfPatterns(QUESTION_LIST)}パターン収録）`);
  }
}

function setQuestion(new_question) {
  // 問題を作成し、wavesurferに登録する
  question = new_question;
  waveViewer.load(question["url"]);
}

function getSelectedList() {
  if (genreSelector.value === "hardstyle") {
    return HARDSTYLE_QUESTION_LIST;
  } else if (genreSelector.value === "techno") {
    return TECHNO_QUESTION_LIST;
  };
}

function getSelectedList() {
  if (genreSelector.value === "hardstyle") {
    return HARDSTYLE_QUESTION_LIST;
  } else if (genreSelector.value === "techno") {
    return TECHNO_QUESTION_LIST;
  };
}