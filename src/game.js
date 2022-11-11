const selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

const generateGame = () => {
  const dimensions = selectors.board.getAttribute("data-dimension");

  if (dimensions % 2 !== 0) {
    throw new Error(
      "The dimension of the board must bean even number"
    );
  }

  const emojis = [
    "💖",
    "💜",
    "🍩",
    "🍨",
    "🍉",
    "☃️",
    "🌺",
    "🦄",
    "🐳",
    "🐹",
  ];

  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);
  const cards = `<div class="board" style="grid-template-columns: repeat(${dimensions}, auto)"> ${items
    .map(
      (item) =>
        `<div class="card"><div class="card-front"></div><div class="card-back">${items}</div></div>`
    )
    .join("")}</div>`;

  const parser = new DOMParser().parseFromString(cards, "text/html");
  selectors.board.replaceWith(parser.querySelector(".board"));
};

const pickRandom = (array, items) => {
  const clonedArray = [...array];
  const randomPicks = [];

  for (let index = 0; index < items; index++) {
    const randomIndex = Math.floor(
      Math.random() * clonedArray.length
    );

    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return randomPicks;
};

const shuffle = (array) => {
  const clonedArray = [...array];
  for (let index = clonedArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const original = clonedArray[index];

    clonedArray[index] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }
  return clonedArray;
};

const attachEventListeners = () => {
  document.addEventListener("click", (evt) => {
    const evtTarget = evt.target;
    const evtParent = evtTarget.parentElement;

    if (
      evtTarget.className.includes("card") &&
      !evtParent.className.includes("flipped")
    ) {
      flipCard(evtParent);
    } else if (
      evtTarget.nodeName === "BUTTON" &&
      !evtTarget.className.includes("disabled")
    ) {
      startGame();
    }
  });
};

generateGame();
attachEventListeners();
