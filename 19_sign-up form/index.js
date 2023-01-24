const button = document.getElementById('button')
const form = document.getElementById('form')

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById('passwordInput')
const confirmPasswordInput = document.getElementById("confirmPasswordInput");


const passwordCheckmark = document.getElementById("passwordCheckmark");
const confirmPasswordCheckmark = document.getElementById(
  "confirmPasswordCheckmark"
);
const nameCheckmark = document.getElementById("nameCheckmark");
const emailCheckmark = document.getElementById("emailCheckmark");

const passwordEye = document.getElementById("passwordEye");
const confirmPasswordEye = document.getElementById("confirmPasswordEye");

passwordEye.addEventListener("click", (e) => showPassword(passwordInput, e));
confirmPasswordEye.addEventListener("click", (e) =>
  showPassword(confirmPasswordInput, e)
);

function showPassword(inputField, e){
    e.target.classList.toggle('crossed')
    inputField.type = inputField.type === "text" ? "password" : "text";
}

passwordInput.addEventListener("input", (e) =>
  validateInput(passwordCheckmark, e)
);
confirmPasswordInput.addEventListener("input", (e) =>
  validateInput(confirmPasswordCheckmark, e)
);
nameInput.addEventListener("input", (e) => validateInput(nameCheckmark, e));
emailInput.addEventListener("input", (e) => validateInput(emailCheckmark, e));

function validateInput(checkmark, e) {
  checkmark.classList.remove("error");
  checkmark.classList.remove("touched");

  if (e.target.value.trim()) {
    checkmark.classList.add("touched");
  }

  if (!e.target.checkValidity()) {
    checkmark.classList.add("error");
  }

  if (e.target === confirmPasswordInput && !arePasswordsFieldsEqual()) {
    checkmark.classList.add("error");
  }

  checkButtonState();
}

function arePasswordsFieldsEqual() {
    return (
      passwordInput.value &&
      confirmPasswordInput.value &&
      passwordInput.value === confirmPasswordInput.value
    );
}

function checkButtonState() {
    const checkmarks = Array.from(document.querySelectorAll(".checkmark"))
    button.disabled = checkmarks.some((el)=> el.classList.contains('error')) || checkmarks.some((el)=> !el.classList.contains('touched')) 
}

form.onsubmit = function () {
  console.log("Form is ready to send");
  return false;
};

checkButtonState()