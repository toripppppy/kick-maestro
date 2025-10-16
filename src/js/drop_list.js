import { HARDSTYLE_QUESTION_LIST } from "./question_lists/hardstyle.js";
import { TECHNO_QUESTION_LIST } from "./question_lists/techno.js";

const container = document.getElementById("container");

function redirectToDrop(e) {
  // ドロップを登録
  localStorage.setItem("dropName", e.target.dataset.name)
  localStorage.setItem("dropTime", e.target.dataset.drop)
  
  // リダイレクト
  localStorage.setItem("isRedirected", true)
  window.location.href = "../index.html";
}

// 曲名・ドロップ一覧リストを作成
const ul = document.createElement("ul");
const QUESTION_LIST = HARDSTYLE_QUESTION_LIST.concat(TECHNO_QUESTION_LIST);
QUESTION_LIST.forEach(item => {
  const li = document.createElement("li");

  // 曲名の表示
  const anchor = document.createElement("a");
  anchor.text = item.name;
  li.appendChild(anchor);
  
  // ドロップ一覧の作成
  const drops = document.createElement("div");
  drops.setAttribute("class", "drops");
  item.drop.forEach(d => {
    const drop = document.createElement("a")
    drop.text = `${d}`;
    // メタデータの登録
    drop.dataset.name = item.name;
    drop.dataset.drop = d;
    drop.href = "javascript:void(0);";
    drop.onclick = redirectToDrop;
    drops.appendChild(drop);
  })
  li.appendChild(drops);

  ul.appendChild(li);
});

container.appendChild(ul);