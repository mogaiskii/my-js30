document.addEventListener('DOMContentLoaded', ready);

function ready() {
  // alert()
  const canvas = document.getElementById('draw');

  const ctx = canvas.getContext('2d'); //  (type, options)
  // => canvas rendering context
  // 2d/webgl/webgl2{experemental}/
  //   /bitmaprenderer{only ImageBitmapRenderingContext}
  // ctx. getImageData => image

  canvas.width = window.innerWidth; // ???
  // don't really understand why.
  // it makes canvas full-window size
  // but
  // why is it also set's it's render attributes??
  canvas.height = window.innerHeight;

  ctx.strokeStyle = '#BADA55'; // ???
  // style for stroke
  ctx.lineJoin = 'round'; // ???
  // round / bevel(cutting) / miter(angle)
  ctx.lineCap = 'round'; // ???
  // end of line
  // butt{flat} / round / square(adds square)
  ctx.lineWidth = 20;

  ctx.globalCompositeOperation = 'hue'; // very optional

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let lineWidth = 20;
  let lineWidthDelta = 0.3;

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
      hue = 0;
    }
    lineWidth += lineWidthDelta;
    if (lineWidth >= 60) {
      lineWidthDelta = -0.3;
    } else if (lineWidth <= 10) {
      lineWidthDelta = 0.3;
    }
  }
  // 
}
