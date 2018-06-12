document.addEventListener('DOMContentLoaded', ready);

function ready() {
  // const letters = document.querySelectorAll('.js_letter');
  // const letterCheckboxes = map(letters, (letter) => {
  //   return letter.getElementsByTagName('input')[0];
  // });

  const letterCheckboxes =
      document.querySelectorAll('.js_letter input[type=checkbox]');

  const letterCheckboxWrappers =
      document.querySelectorAll('.js_letter .letter_checkbox-wrapper');

  letterCheckboxWrappers.forEach( function(element, index) {
    element.addEventListener('click', function(e) {
      if (e.target == element) {
        e.preventDefault();
        let event = new MouseEvent('click', {shiftKey: e.shiftKey});
        letterCheckboxes[index].dispatchEvent(event);
      }
    });
  });

  let lastChecked = null;

  letterCheckboxes.forEach( function(element, index) {
    // Start of event listener
    element.addEventListener('click', (e) => {
      choose(e.target);

      if (e.shiftKey && e.target.checked && lastChecked) {
        console.log('go');
        let startCheck = false;

        // Because .forEach hasn't got break
        // (optimization)
        for (let i = 0; i < letterCheckboxes.length; i++) {
          if ( lastChecked == letterCheckboxes[i] ||
              e.target == letterCheckboxes[i] ) {
            if (!startCheck) {
              startCheck = true;
              continue;
            } else {
              break;
            }
          }
          if (startCheck && !letterCheckboxes[i].checked) {
            letterCheckboxes[i].checked = true;
            choose(letterCheckboxes[i]);
          }
        }
      }

      if (e.target.checked) {
        lastChecked = e.target;
      } else {
        lastChecked = null;
      }
    });
    //  End of event listener
  });
}


function choose(element) {
  let letter = findParentByClassName(element, 'js_letter');
  letter.classList.toggle('chosen');
}

function findParentByClassName(child, parentClassName) {
  let currentParent = child.parentElement;
  while ( !currentParent.classList.contains(parentClassName) ) {
    currentParent = currentParent.parentElement;
    if (currentParent.tagName === 'BODY') {
      return null;
    }
  }
  return currentParent;
}
