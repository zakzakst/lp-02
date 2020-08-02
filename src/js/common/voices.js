$(function() {
  const el = $('.js-voices');
  if(!el) {return;}
  carouselInit();

  function carouselInit() {
    el.slick({
      // autoplay: true,
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ],
    });
  }
});
