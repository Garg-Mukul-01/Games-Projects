let music = new Audio("./music/music.mp3");
let turn_sound = new Audio("./music/ting.mp3");
let gameover = new Audio("./music/gameover.mp3");
let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset");
let mainHeading = document.getElementById("main-heading");
resetBtn.style.display = "none";
let turn = "X";
let isgameover = false;
let isSound = true;

// function to change the turn
const changeTurn = () => {
  return turn === "X" ? 0 : "X";
};

// function to check for win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      mainHeading.innerText = "!! Congratulations !!";
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerText + " " + "Won";
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      if (isSound) {
        gameover.play();
      }
      isgameover = true;
      document.querySelector(".line").style.width = "21vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
    }
  });
};

// Game Logic
function Start() {
  alert("Game Start");
  startBtn.style.display = "none";
  resetBtn.style.display = "initial";
  mainHeading.innerText = "!! Let's See the Winner !!";
  document.getElementsByClassName("info")[0].innerText = turn + " -" + "Turn ";
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
      if (boxtext.innerText === "" && isgameover == false) {
        boxtext.innerText = turn;
        if (isSound) {
          turn_sound.play();
        }
        turn = changeTurn();
        checkWin();
        if (!isgameover) {
          document.getElementsByClassName("info")[0].innerText =
            turn + " -" + "Turn ";
        }
      }
    });
  });
}
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  mainHeading.innerText = "!! Let's See the Winner !!";
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = turn + " -" + "Turn ";
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});
