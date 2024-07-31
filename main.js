const header = document.querySelector("header");
const gameContainer = document.querySelector(".Game__container");
const resetBtn = document.querySelector(".resetBtn");
const boxes = Array.from(document.querySelectorAll(".box p"));

let player = "x";
let win = false;

const updateHeader = () => {
  header.innerHTML = `Player <span>${player}</span> Try`;
  header.children[0].style.color =
    player === "x" ? "var(--x-color)" : "var(--o-color)";
};

const headerWinMsg = () => {
  header.innerHTML = `🎉 Congratulations <span>${
    player === "x" ? "O" : "X"
  }</span> Wins 🎉`;
  header.children[0].style.color =
    player !== "x" ? "var(--x-color)" : "var(--o-color)";
};

const checkWin = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      win = true;
      headerWinMsg();
    }
  });
};

const checkDraw = () => {
  if (boxes.every((box) => box.textContent !== "")) {
    boxes.forEach((box) => {
      box.classList.add("draw");
      setTimeout(() => {
        box.classList.remove("draw");
        box.textContent = "";
        box.classList.remove("noClick");
      }, 1000);
    });
  }
};

const handleClick = (box) => {
  if (!box.classList.contains("noClick")) {
    box.textContent = player;
    box.classList.add("noClick");
    box.style.color = player === "x" ? "var(--x-color)" : "var(--o-color)";

    player = player === "x" ? "o" : "x";
    updateHeader();
    checkWin();

    if (win) {
      gameContainer.classList.add("noClick");
    } else {
      checkDraw();
    }
  }
};

resetBtn.onclick = () => window.location.reload();

boxes.forEach((box) => box.addEventListener("click", () => handleClick(box)));

updateHeader();
