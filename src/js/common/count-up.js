$(function() {
  const el = document.getElementById('js-count-up');
  if(!el) {return;}
  addEventCountUp();

  function addEventCountUp() {
    const options = {
      root: null,
      rootMargin: '-30% 0px',
      threshold: 0
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp();
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(el);
  }

  function countUp() {
    const countUpList = document.querySelectorAll('#js-count-up .count-up__number');
    Array.from(countUpList).forEach((item) => {
      let number = item.dataset.countUp;
      countUpLoop(item, number);
    });
  }

  function countUpLoop(el, targetNumber) {
    const countTime = 1000;
    const countInterval = 50;
    let currentNumber = 0;
    let currentTime = 0;

    const timer = setInterval(() => {
      el.textContent = currentNumber;

      currentTime += countInterval;
      currentNumber = Math.floor(targetNumber / countTime * currentTime);
      if(currentTime === countTime){
        clearInterval(timer);
        el.textContent = targetNumber;
      }
    }, countInterval);
  }
});
