const cardTypes = {
  visa: "visa",
  mastercard: "mastercard",
  discover: "discover",
  american: "american",
};

const MAX_NAME_LENGTH = 25

const cardInput = document.getElementById('cardNumber')
const cvvInput = document.getElementById("cvv");
const nameInput = document.getElementById("name");
const monthSelect = document.getElementById("selectMonth");
const yearSelect = document.getElementById("selectYear");

const card = document.getElementById("card");

const filledCardNumber = document.getElementById("filledCardNumber");
const filledExpired = document.getElementById("filledExpired");
const filledName = document.getElementById("filledName");
const filledSignature = document.getElementById("filledSignature");
const filledCvv = document.getElementById("filledCvv");

const cardMaskOptions = {
  mask: "0000 0000 0000 0000",
};

const cardInputMask = IMask(cardInput, cardMaskOptions);

const cvvMaskOptions = {
  mask: "000",
};

const cvvInputMask = IMask(cvvInput, cvvMaskOptions);

cardInput.addEventListener('change', changeCardNumber)
nameInput.addEventListener("change", changeCardHolderName);
monthSelect.addEventListener("change", changeExpirationDate);
yearSelect.addEventListener("change", changeExpirationDate);
cvvInput.addEventListener("change", changeCvv);

function changeCardNumber() {
    const cardNumber = cardInput.value;

    if (cardNumber) {
        filledCardNumber.textContent = cardNumber;
        changeCardImage(cardNumber);
    }
}

function changeCardHolderName() {
    const name =
      nameInput.value.length > MAX_NAME_LENGTH
        ? `${nameInput.value.substring(0, MAX_NAME_LENGTH)}...`
        : nameInput.value;

    filledName.textContent = name;
    filledSignature.textContent = name;

}

function changeExpirationDate() {
    const expiration = `${monthSelect.value || "00"}/${
      yearSelect.value || "0000"
    }`;

    filledExpired.textContent = expiration
}

function changeCvv() {
    const cvv = cvvInput.value;
    if (cvv) {
        filledCvv.textContent = cvv
        card.classList.add('flip')
    } else {
        card.classList.remove("flip");
    }
}

function changeCardImage(cardNumber) {
    Object.values(cardTypes).forEach((classValue) => {
        card.classList.remove(classValue);
    })

    if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
        card.classList.add(cardTypes.american);
    }

    if (cardNumber.startsWith("5")) {
      card.classList.add(cardTypes.mastercard);
    }

    if (cardNumber.startsWith("6")) {
      card.classList.add(cardTypes.discover);
    }
}