import $ from 'jquery';

export function pageLoaderFunc() {
  const el = $('#js-page-loader');
  if(!el) {return;}
  const speed = 400;
  const delay = 400;

  $(window).on('load', () => {
    el.delay(delay).fadeOut(speed);
  });
}
