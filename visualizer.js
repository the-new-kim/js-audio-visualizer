let requestId;

const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");

const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

const WIDTH = window.innerWidth * pixelRatio;
const HEIGHT = window.innerHeight * pixelRatio;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const audioElement = document.querySelector("audio");

const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;

const source = audioCtx.createMediaElementSource(audioElement);

source.connect(analyser);
source.connect(audioCtx.destination);
// analyser.connect(audioCtx.destination);

let data = new Uint8Array(analyser.frequencyBinCount);

console.log(data.length);

const xPosArray = Array.from(Array(data.length)).map((_) =>
  Math.floor(Math.random() * WIDTH)
);

const yPosArray = Array.from(Array(data.length)).map((_) =>
  Math.floor(Math.random() * HEIGHT)
);

function draw() {
  requestId = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(data);

  //   data = [...data];

  //   console.log(data);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  let space = WIDTH / data.length;

  data.forEach((value, index) => {
    canvasCtx.strokeStyle = "white";
    canvasCtx.beginPath();
    canvasCtx.moveTo(WIDTH / 2 + space * index, HEIGHT); //x,y
    canvasCtx.lineTo(WIDTH / 2 + space * index, HEIGHT - value * 5); //x,y
    canvasCtx.stroke();

    canvasCtx.strokeStyle = "white";
    canvasCtx.beginPath();
    canvasCtx.moveTo(WIDTH / 2 - space * index, HEIGHT); //x,y
    canvasCtx.lineTo(WIDTH / 2 - space * index, HEIGHT - value * 5); //x,y
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.arc(xPosArray[index], yPosArray[index], value, 0, Math.PI * 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.arc(WIDTH / 2, HEIGHT / 2, value * 5, 0, Math.PI * 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.arc(WIDTH, HEIGHT / 2, value * 3, 0, Math.PI * 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.arc(0, HEIGHT / 2, value * 3, 0, Math.PI * 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(WIDTH / 2 - space * index, 0); //x,y
    canvasCtx.lineTo(WIDTH / 2 - space * index, value * 5); //x,y
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(WIDTH / 2 + space * index, 0); //x,y
    canvasCtx.lineTo(WIDTH / 2 + space * index, value * 5); //x,y
    canvasCtx.stroke();
  });
}

// function loopingFunction() {
//   requestId = requestAnimationFrame(loopingFunction);
//   analyser.getByteFrequencyData(data);
//   draw(data);
// }

audioElement.onplay = () => {
  audioCtx.resume();
  console.log(requestId);

  //   loopingFunction();
  draw();
};

// audioElement.onpause = () => {};
