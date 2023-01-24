const marks = document.querySelectorAll('.circle');
marks.forEach((mark)=> mark.addEventListener('click', toggleModal))

const cross = document.getElementById('cross')
cross.addEventListener('click', toggleModal)

function toggleModal() {
    const modal = document.getElementById("modal")
    modal.classList.toggle('show')
}