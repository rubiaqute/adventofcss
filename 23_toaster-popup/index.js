const popup =document.getElementById('popup')

const closeButton = document.getElementById("close")
const cover = document
  .getElementById("cover")

  cover.addEventListener("click", togglePopup);
  closeButton.addEventListener('click', togglePopup)

  function togglePopup() {
    popup.classList.toggle('show')
  }