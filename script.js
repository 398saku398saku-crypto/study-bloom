// =============================
// 🌸 Study Bloom v2
// =============================

// 今日の日付
const today = new Date();

const todayDate = document.getElementById("todayDate");

if (todayDate) {
  todayDate.textContent = today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
}

// 共通テストまで
const examDate = new Date("2027-01-17");

const diff = Math.max(
  0,
  Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))
);

const countdown = document.getElementById("countdown");

if (countdown) {
  countdown.textContent = `あと ${diff} 日`;
}

// 応援メッセージ
const messages = [
  "🌸 今日も一歩前進！",
  "📚 完璧じゃなくても続けよう！",
  "💖 努力は必ず力になる！",
  "🌷 焦らなくても大丈夫！",
  "✨ 今日の1時間が未来を変える！",
  "☕ 休憩も勉強のうち！",
  "🎓 合格まで一緒に頑張ろう！"
];

const dailyMessage = document.getElementById("dailyMessage");

if (dailyMessage) {
  dailyMessage.textContent =
    messages[Math.floor(Math.random() * messages.length)];
}

// =============================
// ページ切り替え
// =============================

const navButtons = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    navButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    pages.forEach(page =>
      page.classList.remove("active")
    );

    button.classList.add("active");

    const target = button.dataset.page;

    document
      .getElementById(target)
      .classList.add("active");

  });

});

// =============================
// メモ保存
// =============================

function autoSave(id){

  const element = document.getElementById(id);

  if(!element) return;

  element.value =
    localStorage.getItem(id) || "";

  element.addEventListener("input",()=>{

    localStorage.setItem(
      id,
      element.value
    );

  });

}

autoSave("goal");
autoSave("memo");
autoSave("dreamMemo");
autoSave("dreamSchool");
autoSave("targetScore");
// =============================
// 今日やること保存
// =============================

const tasks = [
  "task1",
  "task2",
  "task3",
  "task4"
];

tasks.forEach(id => {

  const check = document.getElementById(id);

  if(!check) return;

  check.checked =
    localStorage.getItem(id) === "true";

  check.addEventListener("change",()=>{

    localStorage.setItem(
      id,
      check.checked
    );

    updateFlower();

  });

});

// =============================
// 花を育てる
// =============================

function updateFlower(){

  let count = 0;

  tasks.forEach(id=>{

    const item =
      document.getElementById(id);

    if(item && item.checked){

      count++;

    }

  });

  const flower =
    document.getElementById("flower");

  if(!flower) return;

  const stages = [
    "🌱",
    "🌿",
    "🌷",
    "🌸",
    "🌺"
  ];

  flower.textContent =
    stages[Math.min(count,4)];

}

updateFlower();

// =============================
// 勉強時間保存
// =============================

const hour =
document.getElementById("hour");

const minute =
document.getElementById("minute");

const todayTotal =
document.getElementById("todayTotal");

const todayStudy =
document.getElementById("todayStudy");

function updateStudy(){

  const h =
    Number(hour?.value)||0;

  const m =
    Number(minute?.value)||0;

  localStorage.setItem(
    "studyHour",
    h
  );

  localStorage.setItem(
    "studyMinute",
    m
  );

  if(todayTotal){

    todayTotal.textContent =
    `今日の合計：${h}時間${m}分`;

  }

  if(todayStudy){

    todayStudy.textContent =
    `${h}時間${m}分`;

  }

}

if(hour){

  hour.value =
    localStorage.getItem("studyHour") || "";

  hour.addEventListener(
    "input",
    updateStudy
  );

}

if(minute){

  minute.value =
    localStorage.getItem("studyMinute") || "";

  minute.addEventListener(
    "input",
    updateStudy
  );

}

updateStudy();

// =============================
// 気分保存
// =============================

const mood =
document.getElementById("mood");

const todayMood =
document.getElementById("todayMood");

if(mood){

  mood.value =
    localStorage.getItem("mood")
    || "🙂 普通";

  if(todayMood){

    todayMood.textContent =
      mood.value.split(" ")[0];

  }

  mood.addEventListener("change",()=>{

    localStorage.setItem(
      "mood",
      mood.value
    );

    if(todayMood){

      todayMood.textContent =
      mood.value.split(" ")[0];

    }

  });

}

// =============================
// 連続記録（簡易版）
// =============================

const streak =
document.getElementById("streak");

const statStreak =
document.getElementById("statStreak");

let streakValue =
Number(
localStorage.getItem("streak")
)||0;

if(streak){

  streak.textContent =
  `${streakValue}日`;

}

if(statStreak){

  statStreak.textContent =
  `${streakValue}日`;

}
// =============================
// カレンダー
// =============================

const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");

let currentDate = new Date();

function createCalendar(){

  if(!calendarGrid || !calendarTitle) return;

  calendarGrid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  calendarTitle.textContent =
    `${year}年${month + 1}月`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let start = firstDay.getDay();
  start = start === 0 ? 6 : start - 1;

  for(let i = 0; i < start; i++){

    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);

  }

  for(let day = 1; day <= lastDay.getDate(); day++){

    const cell = document.createElement("div");

    cell.className = "calendarDay";
    cell.textContent = day;

    const key =
      `${year}-${month+1}-${day}`;

    if(localStorage.getItem("study-" + key)){

      cell.style.background =
      "#ffd7ea";

    }

    cell.addEventListener("click",()=>{

      const result = confirm(
        `${month+1}月${day}日を勉強した日にしますか？`
      );

      if(result){

        localStorage.setItem(
          "study-"+key,
          "true"
        );

        cell.style.background =
        "#ffd7ea";

      }

    });

    calendarGrid.appendChild(cell);

  }

}

createCalendar();

document
.getElementById("prevMonth")
?.addEventListener("click",()=>{

currentDate.setMonth(
currentDate.getMonth()-1
);

createCalendar();

});

document
.getElementById("nextMonth")
?.addEventListener("click",()=>{

currentDate.setMonth(
currentDate.getMonth()+1
);

createCalendar();

});

// =============================
// 参考書進捗
// =============================

const books = [

"blueChart",
"vintage",
"seminar",
"target"

];

books.forEach(id=>{

const progress =
document.getElementById(id);

const text =
document.getElementById(id+"Text");

if(!progress) return;

progress.value =
Number(
localStorage.getItem(id)
)||0;

if(text){

text.textContent =
progress.value + "%";

}

progress.addEventListener("click",()=>{

let value = prompt(
"進捗(0〜100)",
progress.value
);

if(value===null) return;

value = Number(value);

if(isNaN(value)) return;

value = Math.max(
0,
Math.min(100,value)
);

progress.value = value;

localStorage.setItem(
id,
value
);

if(text){

text.textContent =
value + "%";

}

});

});

// =============================
// レベル
// =============================

const level =
document.getElementById("level");

const statTime =
document.getElementById("statTime");

const monthTime =
document.getElementById("monthTime");

function updateStats(){

const h =
Number(
localStorage.getItem("studyHour")
)||0;

const total = h;

if(statTime){

statTime.textContent =
`${total}時間`;

}

if(monthTime){

monthTime.textContent =
`${total}時間`;

}

if(level){

level.textContent =
`Lv.${Math.max(1,Math.floor(total/10)+1)}`;

}

}

updateStats();
// =============================
// 🍅 ポモドーロタイマー
// =============================

const timerDisplay = document.getElementById("timerDisplay");
const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const resetTimer = document.getElementById("resetTimer");

let timer = 25 * 60;
let timerId = null;

function updateTimer() {

  if (!timerDisplay) return;

  const min = String(Math.floor(timer / 60)).padStart(2, "0");
  const sec = String(timer % 60).padStart(2, "0");

  timerDisplay.textContent = `${min}:${sec}`;

}

updateTimer();

startTimer?.addEventListener("click", () => {

  if (timerId) return;

  timerId = setInterval(() => {

    timer--;

    updateTimer();

    if (timer <= 0) {

      clearInterval(timerId);
      timerId = null;

      timer = 25 * 60;

      updateTimer();

      alert("🎉 お疲れさま！5分休憩しよう🌸");

    }

  }, 1000);

});

pauseTimer?.addEventListener("click", () => {

  clearInterval(timerId);
  timerId = null;

});

resetTimer?.addEventListener("click", () => {

  clearInterval(timerId);
  timerId = null;

  timer = 25 * 60;

  updateTimer();

});

// =============================
// 🌙 ダークモード
// =============================

const darkBtn =
document.getElementById("darkBtn");

darkBtn?.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );

});

if (localStorage.getItem("darkMode") === "true") {

  document.body.classList.add("dark");

}

// =============================
// 🎨 テーマ切り替え
// =============================

const themeBtn =
document.getElementById("themeBtn");

const themes = [

["#ffd9eb", "#dff5ff"],
["#fff1c7", "#ffe3ec"],
["#e1ffd9", "#dffbff"]

];

let theme = 0;

themeBtn?.addEventListener("click", () => {

  theme++;

  if (theme >= themes.length) {

    theme = 0;

  }

  document.body.style.background =
    `linear-gradient(135deg, ${themes[theme][0]}, ${themes[theme][1]})`;

});

// =============================
// 💾 バックアップ
// =============================

document
.getElementById("backupBtn")
?.addEventListener("click", () => {

  const data = JSON.stringify(localStorage);

  navigator.clipboard.writeText(data);

  alert("📋 バックアップデータをコピーしました！");

});

// =============================
// 🗑 データリセット
// =============================

document
.getElementById("resetBtn")
?.addEventListener("click", () => {

  const ok = confirm(
    "本当にすべてのデータを削除しますか？"
  );

  if (!ok) return;

  localStorage.clear();

  location.reload();

});

// =============================
// 🚀 起動
// =============================

console.log("🌸 Study Bloom 起動しました！");
