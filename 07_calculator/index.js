function changeTipsPercent(e) {
  percentChips.forEach(chip => chip.classList.remove('selected'))
  const selectedChip = e.target;
  selectedChip.classList.add('selected');
  selectedPercent = +selectedChip.innerText.split("%")[0];
}

function changeBillAmount() {
  billAmount = Math.abs(+billAmountInput.value);
}

function changePeopleNumber() {
  if (+peopleNumberInput.value !== 0 && +peopleNumberInput.value % 1 === 0) {
    peopleNumber = +peopleNumberInput.value;
  } else {
    peopleNumber = 1;
    peopleNumberInput.value = 1;
  }
}

function calculateTips() {
  const tipsAmount = Math.round((billAmount * selectedPercent)) / 100
  const tipsBlock = document.getElementById('tipsBlock')
  tipsBlock.innerText = tipsAmount

  const tipsPerPersonBlock = document.getElementById("tipsPerPersonBlock");
  tipsPerPersonBlock.innerText = Math.round((tipsAmount * 100 )/ peopleNumber) / 100;
}

let selectedPercent = +document
  .querySelector(".choice-item.selected")
  .innerText.split("%")[0];

const percentChips = document.querySelectorAll(".choice-item");
percentChips.forEach((chip) =>
  chip.addEventListener("click", changeTipsPercent)
);

const billAmountInput = document.getElementById('billAmount')
let billAmount = +billAmountInput.value;

const peopleNumberInput = document.getElementById("peopleNumber");
let peopleNumber = +peopleNumberInput.value;

billAmountInput.addEventListener('change', changeBillAmount)
peopleNumberInput.addEventListener("change", changePeopleNumber);

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', calculateTips)

calculateTips();



