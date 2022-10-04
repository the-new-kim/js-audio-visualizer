let requestId;

const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
const audioElement = document.querySelector("audio");

const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

const source = audioCtx.createMediaElementSource(audioElement);

source.connect(analyser);
source.connect(audioCtx.destination);
// analyser.connect(audioCtx.destination);

let data = new Uint8Array(analyser.frequencyBinCount);

function draw() {
  requestId = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(data);

  //   data = [...data];

  //   console.log(data);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  let space = canvas.width / data.length;

  data.forEach((value, index) => {
    canvasCtx.beginPath();
    canvasCtx.moveTo(space * index * 1.1, canvas.height); //x,y
    canvasCtx.lineTo(space * index * 1.1, canvas.height - value / 2); //x,y
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
