$(function() {
  const el = $('.js-gallery');
  if(!el) {return;}
  const speed = 400;
  const galleryItem = $('.gallery__item');
  const galleryModal = $('#js-gallery__modal');
  const galleryImage = $('#js-gallery__image');
  const rootEl = document.documentElement;
  galleryModalInit();

  function galleryModalInit() {
    galleryItem.on('click', (e) => {
      e.preventDefault();
      let link = $(e.currentTarget).attr('href');
      galleryModalOpen(link);
    });
    $('.js-gallery__modal-close').on('click', () => {
      galleryModalClose();
    });
  }

  function galleryModalOpen(link) {
    galleryImage.attr('src', link);
    galleryModal.fadeIn(speed).css('display','flex');;
    rootEl.classList.add('is-clipped');
  }

  function galleryModalClose() {
    rootEl.classList.remove('is-clipped');
    galleryModal.fadeOut(speed);
    galleryImage.attr('src', '');
  }
});
