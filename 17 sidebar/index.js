const button = document.querySelector(".button");
const scrollContainer = () => {
  return document.documentElement || document.body;
};

const showButton = () => {
  if (scrollContainer().scrollTop > 500) {
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
  }
};

const goToTop = () => {
  document.body.scrollIntoView();
};

document.addEventListener("scroll", showButton);
button.addEventListener("click", goToTop);
