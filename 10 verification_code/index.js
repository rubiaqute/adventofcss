const inputs = document.querySelectorAll('.input')
inputs.forEach((el, index)=> {
    const numMask =
      IMask(el,
      {
        mask: Number,
        min: 0,
        max: 9,
      });
      el.addEventListener('input', () => {
        if (el.value.length > 0 && index !== (inputs.length - 1)) {
            inputs[index + 1].focus()
        }
      })
})