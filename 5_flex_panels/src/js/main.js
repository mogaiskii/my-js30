'use strict';
document.addEventListener('DOMContentLoaded', ready);

function ready() {
  // alert()
  let panels = document.querySelectorAll('.panel');
  panels.forEach( (panel) => panel.addEventListener('click', toggleOpen) );
  panels.forEach(
    (panel) => panel.addEventListener('transitionend', toggleOpenActive)
  );

  function toggleOpenActive(e) {
    if ( e.propertyName == 'flex-grow') {
      if (this.classList.contains('open')) {
        this.classList.add('open-active');
      } else if (isHovered(this) && this.classList.contains('hover')) {
        this.classList.add('open-active');
      } else {
        this.classList.remove('open-active');
      }
    }
  }

  function toggleOpen() {
    let oldState = this.classList.contains('open');
    panels.forEach( (panel) => panel.classList.remove('hover', 'open') );
    if (oldState) {
      // newState = !oldState;
      panels.forEach( (panel) => panel.classList.add('hover') );
      this.classList.remove('hover');
      this.addEventListener('mouseleave', setHoverBack);
    } else {
      this.classList.add('open');
    }

    function setHoverBack() {
      this.classList.add('hover');
      this.removeEventListener('mouseleave', setHoverBack);
    }
    
  }
};

function isHovered(el) {
  return el.parentElement.querySelector(':hover') === el;
}
