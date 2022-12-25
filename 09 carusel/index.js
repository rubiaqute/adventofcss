

const swiperThumb = new Swiper(".swiper_thumb", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 27,
  slidesPerView: 7,
});

const swiper = new Swiper(".swiper_main", {
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperThumb,
  },
});