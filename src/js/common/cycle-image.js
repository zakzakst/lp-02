import $ from 'jquery';
import 'slick-carousel';

export function cycleImageFunc() {
  const el = $('.js-cycle-image');
  if(!el) {return;}
  carouselInit();

  function carouselInit() {
    el.slick({
      // autoplay: true,
      infinite: true,
      dots: false,
      arrows: false,
      slidesToScroll: 1,
      speed: 500,
      // fade: true,
    });
  }
}
