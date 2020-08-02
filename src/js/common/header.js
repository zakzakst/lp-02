$(function() {
  const el = $('#js-header__navbar');
  if(!el) {return;}
  const menu = $('#js-header__navbar-menu');
  const navItem = $('.navbar-item');
  const speed = 400;

  addEventToggleMenu();
  addEventRisizeReset();
  addEventPageScroll();
  addObserverHederBg();
  addObserverActiveNav();

  function addEventToggleMenu() {
    $('#js-header__navbar-button').on('click', (e) => {
      e.preventDefault();
      if(el.hasClass('is-open')) {
        menuClose();
      } else {
        menuOpen();
      }
    });
  }

  function addEventRisizeReset() {
    $(window).resize(() => {
      menuClear();
    });
  }

  function addEventPageScroll() {
    const headerHight = el.height();
    $('.navbar-item').on('click', (e) => {
      e.preventDefault();
      let href = $(e.currentTarget).attr('href');
      let target = $(href == '#' || href == '' ? 'html' : href);
      let position = target.offset().top - headerHight;
      $('html, body').animate({scrollTop:position}, speed);
      menuClear();
      document.activeElement.blur();
    });
  }

  function menuOpen() {
    menu.slideDown(speed);
    el.addClass('is-open');
  }

  function menuClose() {
    menu.slideUp(speed, () => {
      el.removeClass('is-open');
    });
  }

  function menuClear() {
    menu.css('display', '');
    el.removeClass('is-open');
  }

  function addObserverHederBg() {
    const options = {
      root: null,
      rootMargin: '2% 0px -102%',
      threshold: 0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.addClass('is-show-bg');
        } else {
          el.removeClass('is-show-bg');
        }
      });
    }, options);
    observer.observe(document.body);
  }

  function addObserverActiveNav() {
    const sections = document.querySelectorAll('section[id^="section-"');
    const options = {
      root: null,
      rootMargin: '-30% 0px -70%',
      threshold: 0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeNavChange(entry.target.id);
        }
      });
    }, options);
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  function activeNavChange(currentSection) {
    navItem.removeClass('is-active');
    let target = navItem.filter('[href="#' + currentSection + '"]');
    target.addClass('is-active');
  }
});
