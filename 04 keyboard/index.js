const keyboardData = {
    firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'DEL'],
    secondRow: ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    thirdRow: ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
    fourthRow: ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT']
}

const codesData = getCodesData();

let score = 0;
const scoreView = document.getElementById('score')
const keybord = document.getElementById('keyboard')
window.addEventListener("keydown", checkButton);

const keyboardButtons = Object.values(keyboardData).map((rowValues) => {
  const row = document.createElement("div");
  row.className = "row";

  const rowButtons = createButtons(rowValues);

  row.append(...rowButtons);

  return row;
});

keybord.append(...keyboardButtons);

const buttons = document.querySelectorAll(".keybord-button");
let activeButton;

const modal = document.getElementById("modal");

startJiggle();

function createButtons(arr) {
  return arr.map((value) => {
    const button = document.createElement("div");

    button.className = value.length > 1 ? "keybord-button long" : "keybord-button";
    button.innerText = value;

    return button;
  });
}

function startJiggle() {
    const buttonIndex = Math.floor(Math.random() * buttons.length);
    activeButton = buttons[buttonIndex];
    activeButton.classList.add("animated")
}

function checkButton(e) {
    e.preventDefault();
    const pressedButton = codesData.find((el)=> el.code === e.code)
    
    if (pressedButton && pressedButton.value === activeButton.innerText) {
        updateScore(true);
        activeButton.classList.remove("animated");
        activeButton = null;

        if (score === 100) {
            modal.classList.add('show')
        } else startJiggle();
    } else {
       updateScore(); 
    }
}

function updateScore(isRight) {
    if (isRight) {
        score ++
    } else {
        score = score > 0 ? score - 1 : 0;
    }

    scoreView.innerText = score;
    score === 0 ? scoreView.classList.add('nullable') : scoreView.classList.remove('nullable')
}

function getCodesData() {
  const values = Object.values(keyboardData).reduce((acc, buttonValues)=> [...acc, ...buttonValues], [])
  return values.map((btn, index)=> {
    let code = ''
    if (btn.match(/^[A-Z]{1}$/)) code = `Key${btn}`
    if (btn.match(/^[0-9]{1}$/)) code = `Digit${btn}`;
    if (btn === '`') code = "Backquote";
    if (btn === "-") code = "Minus";
    if (btn === "=") code = "Equal";
    if (btn === "DEL") code = "Backspace";
    if (btn === "TAB") code = "Tab";
    if (btn === "[") code = "BracketLeft";
    if (btn === "]") code = "BracketRight";
    if (btn === "\\") code = "Backslash";
    if (btn === "CAPS") code = "CapsLock";
    if (btn === "ENTER") code = "Enter";
    if (btn === "SHIFT" && index === values.findIndex(el => el === "SHIFT")) code = "ShiftLeft";
    if (btn === "SHIFT" && index !== values.findIndex((el) => el === "SHIFT")) code = "ShiftRight";
    if (btn === ";") code = "Semicolon";
    if (btn === "'") code = "Quote";
    if (btn === ",") code = "Comma";
    if (btn === ".") code = "Period";
    if (btn === "/") code = "Slash";

    return {value: btn, code }
  })
  }

  function restartGame() {
    modal.classList.remove('show')
    score = 0;
    updateScore();
    startJiggle()
  }
