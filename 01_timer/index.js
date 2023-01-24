const buttonStart = document.getElementById("start");
buttonStart?.addEventListener("click", startTimer);

const buttonStop = document.getElementById("stop");
buttonStop?.addEventListener("click", stopTimer);

const buttonSettings = document.getElementById("settings");
buttonSettings?.addEventListener("click", changeTimer);

const buttonConfirm = document.getElementById("confirm");
buttonConfirm?.addEventListener("click", confirmTimer);

const modal = document.getElementById("modal");
modal?.addEventListener("click", closeModal);

const modalButton = document.getElementById("modal-button");
modalButton?.addEventListener("click", closeModal);

const timeInput = document.getElementById("timer");
const maskOptions = {
    mask: "{0}0{:}#0",
    definitions: {
        "#": /[0-5]/,
    },
    placeHolder: "00:00",
};

var timeInputMask = IMask(timeInput, maskOptions);

timeInputMask.value = "00:05";
let initialTimerValue = timeInput.value;
let timer = getSeconds(initialTimerValue);

const circle = document.querySelector("circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

let interval;

function getSeconds(input) {
    const durationArray = input.split(":");
    return +durationArray[0] * 60 + +durationArray[1];
}

function setCircleProgressBar(percent) {
    const offset = percent * circumference;
    circle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (timeInputMask.value==="00:00" || timer <= 0) {
        circle.style.strokeDashoffset = `${circumference}`;
        timer = getSeconds(initialTimerValue);
        timeInputMask.value = initialTimerValue;
    }

    document.getElementById("gradient-primary").setAttribute("stop-color", "#09A65A");

    switchTimerButtons(true);
    buttonSettings.classList.remove("active");

    interval = setInterval(function () {
        let minutes = Math.floor(parseInt(timer / 60));
        let seconds = Math.floor(parseInt(timer % 60));
        setCircleProgressBar(timer / getSeconds(initialTimerValue));

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timeInputMask.value = minutes + ":" + seconds;

        if (timeInputMask.value === "00:00") {
            stopTimer();
            document
            .getElementById("gradient-primary")
            .setAttribute("stop-color", "#910A0A");
            modal.classList.add('show')
        }

        timer--;
    }, 1000);
}

function stopTimer() {
    switchTimerButtons(false);

    if (timeInputMask.value === initialTimerValue || timeInputMask.value === "00:00") {
        buttonSettings.classList.add("active");
    }

    clearInterval(interval);
}

function switchTimerButtons(isEnableTimer) {
    if (isEnableTimer) {
        buttonStart.classList.remove("active");
        buttonStop.classList.add("active");
    } else {
        buttonStop.classList.remove("active");
        buttonStart.classList.add("active");
    }
}

function switchEditButtons(isEditModeDisabled) {
    if (isEditModeDisabled) {
        buttonSettings.classList.remove("active");
        buttonConfirm.classList.add("active");
    } else {
        buttonConfirm.classList.remove("active");
        buttonSettings.classList.add("active");
    }
}

function changeTimer() {
    switchEditButtons(true);
    buttonStart.classList.remove("active");
    timeInput.disabled = false;
    timeInput.focus();
}

function confirmTimer() {
    const input = timeInputMask.value;
    if (!input) timeInputMask.value='00:00'
    if (input.length < 5) {
        const [minutes, seconds] = input.split(":");
        timeInputMask.value = `${minutes.padEnd(2, "0")}:${seconds?.padEnd(2, "0")|| '00'}}`
    }
    
    initialTimerValue = timeInputMask.value;
    timer = getSeconds(initialTimerValue);

    switchEditButtons(false);
    timeInput.disabled = true;
    buttonStart.classList.add("active");
}

function closeModal(e) {
    if (e.target === e.currentTarget) {
        modal.classList.remove("show");
    }
}
