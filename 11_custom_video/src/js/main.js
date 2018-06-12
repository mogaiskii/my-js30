const videoUtils = require('./video.js');

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const player = document.querySelector('.player');

  const video = document.querySelector('.viewer');

  const controlBar = document.querySelector('.control-bar');

  const progress = document.querySelector('.progress');
  const progressFilled = document.querySelector('.progress_filled');

  const toggle = document.querySelector('.toggle');
  const volume = document.querySelector('.volume');

  const rate = document.querySelector('.rate');

  //

  let checkTime = setInterval(function() {
    let currentTime = video.currentTime;
    let duration = video.duration;
    let played = ~~(currentTime/duration *100);
    console.log(played);
  }, 1000);

  video.addEventListener('click', videoUtils.togglePlay);
  toggle.addEventListener(
    'click', () => video.dispatchEvent(new MouseEvent('click'))
  );

  const updateButton = (e) => videoUtils.updateButton(e, toggle);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);

  player.addEventListener('mouseover', () => controlBar.classList.add('open'));
  player.addEventListener(
    'mouseout', () => controlBar.classList.remove('open')
  );


}
