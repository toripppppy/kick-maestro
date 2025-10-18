import { WaveViewer } from "./libs/waveViewer.js";
import { Question, QuestionListController } from "./libs/question.js";

import { HARDSTYLE_QUESTION_LIST } from "./question_lists/hardstyle.js";
import { TECHNO_QUESTION_LIST } from "./question_lists/techno.js";

const genreSelector = document.getElementById("genre");
const display = document.getElementById("display")
const button = document.getElementById("button")
const onemore = document.getElementById("onemore")
const waveform = document.getElementById("waveform")

const waveViewer = new WaveViewer();

let state = "first";
let question = new Question("", 0, "");
let questionMemory = [];
let redirected = false;
let controller = null;

// 表示非表示を設定する
// target: element
const setHidden = (target, flag) => {
  if (flag) {
    target.style.visibility = "hidden";
  } else {
    target.style.visibility = "visible";
  }
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
  controller = new QuestionListController(getSelectedList());
  setQuestion(controller.makeQuestion(questionMemory));
  // ジャンルセレクターを非表示
  setHidden(genreSelector, true);
}

const waitForQuestion = () => {
  // カウントダウン中はボタンは押せない
  button.disabled = true;
  setButtonText("来るぞ・・・");
  countdown(3, guessStart);
}

const guessStart = () => {
  button.disabled = false;
  // 波形を表示
  setHidden(waveform, false);
  waveViewer.play(question.dropTime);
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
  // ドロップの５秒前から流して答え合わせ
  // 出題開始地点にマーカーを設置
  waveViewer.placeMarker("Question", question.dropTime);
  waveViewer.play(question.dropTime - 5);
  setDisplayText(`${question.name}`);
  setButtonText("当然です");
}

const goToNextQuestion = () => {
  // 次の問題へ
  waveViewer.pause();
  setHidden(onemore, true);
  setHidden(waveform, true);
  setDisplayText("準備はいいか");
  setButtonText("待ち遠しいです");
  
  // 問題を作成し設定
  controller = new QuestionListController(getSelectedList());
  setQuestion(controller.makeQuestion(questionMemory));
}

onemore.onclick = () => {
  if (state === "answered") {
    // 問題をもう一度聞く
    setHidden(onemore, true);
    state = "guessing";
    waitForQuestion();
  }
  else if (state === "checkingAnswer") {
    // 答えをもう一度聞く
    waveViewer.pause();
    showAnswer();
  }
}

const onclick = () => {
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
    // 問題終了
    if (redirected) {
      // question_list に戻る
      localStorage.removeItem("isRedirected")
      window.location.href = "pages/drop_list.html";
    } else {
      // 次の問題へ
      state = "waitForQuestion"
      goToNextQuestion();
    }
  }
}

// スペースキーもボタンとして使用可能
button.onclick = onclick;
document.addEventListener('keydown', (e) => {
  if (e.code === "Space" && !button.disabled) {
    onclick();
  }
});

window.addEventListener('DOMContentLoaded', function() {
  // 初回描画
  setHidden(waveform, true);
  setHidden(onemore, true);
  redirected = (localStorage.getItem("isRedirected") === "true");

  if (redirected) {
    // drop_listからリダイレクトされてきた場合
    setHidden(genreSelector, true);
    redirected_init();
  } else {
    // タイトルコール
    const controller = new QuestionListController(HARDSTYLE_QUESTION_LIST.concat(TECHNO_QUESTION_LIST));
    setDisplayText(`キックマエストロ（現在${controller.question_list.length}曲・${controller.sumOfPatterns()}パターン収録）`);
  }
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

function redirected_init() {
  const dropName = localStorage.getItem("dropName");
  const dropTime = localStorage.getItem("dropTime");
  const controller = new QuestionListController(HARDSTYLE_QUESTION_LIST.concat(TECHNO_QUESTION_LIST));

  const new_question = new Question(
    dropName,
    Number(dropTime),
    controller.getURLByName(dropName),
  )

  setQuestion(new_question);
  // カウントダウンまでスキップ
  state = "waitForQuestion"
  onclick()
}

function setQuestion(new_question) {
  // 問題を作成し、wavesurferに登録する
  question = new_question;
  waveViewer.load(question.url);
}

function getSelectedList() {
  if (genreSelector.value === "hardstyle") {
    return HARDSTYLE_QUESTION_LIST;
  } else if (genreSelector.value === "techno") {
    return TECHNO_QUESTION_LIST;
  };
}