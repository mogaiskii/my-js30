function functionFactory(fn, ...args) {
  return function() {
    return fn(...args);
  };
}

function togglePlay(event, cb) {
  const video = event.target;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton(event, button) {
  if (event.type == 'play') {
    button.innerHTML = '▶';
  } else {
    button.innerHTML = '▮▮';
  }
}

module.exports = {
  fnF: functionFactory,
  functionFactory,
  togglePlay,
  updateButton,
};
