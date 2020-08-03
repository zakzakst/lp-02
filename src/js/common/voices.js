import $ from 'jquery';
import 'slick-carousel';

export function voicesFunc() {
  const el = $('.js-voices');
  if(!el) {return;}
  carouselInit(el);
}

function carouselInit(el) {
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
