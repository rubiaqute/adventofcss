const container = document.getElementById('container')

const stars = new Array(5).fill(0).map((el)=> {
    const starCell = document.createElement('img')
    starCell.className = 'star'
    starCell.src = './images/star_empty.svg'
    return starCell
})

stars.forEach((star, starIndex)=> {
    container.appendChild(star)
    star.addEventListener('mouseenter', () => rateStars(starIndex))
    star.addEventListener('mouseleave', unRateStars)
})

function rateStars(starIndex) {
    stars.forEach((star, index)=> {
        if (index <= starIndex) {
            star.src = './images/star_full.svg'
        }
    })
}

function unRateStars() {
    stars.forEach((star)=> {
            star.src = './images/star_empty.svg'
    })
}