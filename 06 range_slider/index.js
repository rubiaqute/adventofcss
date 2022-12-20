const progress = document.getElementById("range");
progress.style.borderRadius = '10px'
const priceBlock = document.getElementById("price");

progress.addEventListener("change", handleChangePrice);
progress.addEventListener("input", handleChangePrice);

const price = priceBlock.innerText.split('$')[1];
setProgressPercentColor(+price);

function handleChangePrice() {
    priceBlock.innerText= `$${this.value}`
    setProgressPercentColor(this.value);  
}

function setProgressPercentColor(value) {
    const percent = (value/progress.max)*100
    progress.style.background = `linear-gradient(to right, #EA346F 0%, #EA346F ${percent}%, #4D4C53 ${percent}%, #4D4C53 100%)`;
}