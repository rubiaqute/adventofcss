const numbers = '0123456789';
const letters = 'abcdefghijklmnopqrstuvwxyz';
const symbols = "@#$%";
const similarCharacters = "il1Lo0O";
let passwordLength = 12;

const symbolsCheckbox = document.getElementById("symbolsCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
const uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
const similarCheckbox = document.getElementById("similarCheckbox");

const passwordField = document.getElementById('password');

[
  symbolsCheckbox,
  numbersCheckbox,
  lowercaseCheckbox,
  uppercaseCheckbox,
  similarCheckbox,
].forEach((checkbox) => checkbox.addEventListener('change', generatePassword))

const range = document.getElementById('range')
const passwordLengthLabel = document.getElementById("passwordLength");
range.addEventListener("input", changePasswordLength);

const copyButton = document.getElementById("copyButton");
const copyLabel = document.getElementById("copyLabel");
copyButton.addEventListener('click', copyPassword)
copyLabel.addEventListener("animationend", removeAnimationClass);

function generatePassword() {
    let password

    do {
      password = getPassword();
    } while (!isPasswordAcceptable(password));

    passwordField.value = password;
}

function changePasswordLength() {
    passwordLength = +range.value;

    changePasswordLengthLabel()
    generatePassword()
}

function copyPassword() {
    copyLabel.classList.add("animated");
    navigator.clipboard.writeText(passwordField.value);
}

function removeAnimationClass() {
  copyLabel.classList.remove("animated");
}

function changePasswordLengthLabel(){
    passwordLengthLabel.textContent = `${passwordLength} characters`;
}

function isPasswordAcceptable(password) {

    if (
    !symbolsCheckbox.checked &&
    !numbersCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !uppercaseCheckbox.checked && 
    (!isPasswordIncludesGroupOfCharacters(password, symbols) || 
    !isPasswordIncludesGroupOfCharacters(password, numbers) ||
    !isPasswordIncludesGroupOfCharacters(password, letters) ||
    !isPasswordIncludesGroupOfCharacters(password, letters.toUpperCase()))
  ) {
        return false
    }

    if (symbolsCheckbox.checked && !isPasswordIncludesGroupOfCharacters(password, symbols)) return false

    if (numbersCheckbox.checked && !isPasswordIncludesGroupOfCharacters(password, numbers)) return false

    if (lowercaseCheckbox.checked && !isPasswordIncludesGroupOfCharacters(password, letters)) return false

    if (uppercaseCheckbox.checked && !isPasswordIncludesGroupOfCharacters(password, letters.toUpperCase())) return false;

    return true;
}

function isPasswordIncludesGroupOfCharacters(password, groupOfCharacters) {
    return groupOfCharacters.split('').some((el)=> password.includes(el))
}

function getPassword() {
  const stringForPassword = getStringForPassword();
  const password = new Array(passwordLength)
    .fill("char")
    .map(() =>
      stringForPassword.charAt(Math.random() * stringForPassword.length)
    )
    .join("");

    return password;
}

function getStringForPassword() {
  let stringForPasswordGeneration = "";

  if (symbolsCheckbox.checked) {
    stringForPasswordGeneration = stringForPasswordGeneration + symbols;
  }

  if (numbersCheckbox.checked) {
    stringForPasswordGeneration = stringForPasswordGeneration + numbers;
  }

  if (lowercaseCheckbox.checked) {
    stringForPasswordGeneration = stringForPasswordGeneration + letters;
  }

  if (uppercaseCheckbox.checked) {
    stringForPasswordGeneration =
      stringForPasswordGeneration + letters.toUpperCase();
  }

  if (
    !symbolsCheckbox.checked &&
    !numbersCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !uppercaseCheckbox.checked
  ) {
    stringForPasswordGeneration =
      symbols + numbers + letters + letters.toUpperCase();
  }

  if (similarCheckbox.checked) {
    stringForPasswordGeneration = stringForPasswordGeneration
      .split("")
      .filter((char) => !similarCharacters.includes(char))
      .join("");
  }

  return stringForPasswordGeneration;
}

changePasswordLength();
