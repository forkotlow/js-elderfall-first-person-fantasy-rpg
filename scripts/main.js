let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

ctx.font = "12px Arial";
canvas.width = 300;
canvas.height = 300;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;


const _fps = 60;
let showFpsRate = true; // flag to hide/show fps-rate in canvas
let frameDelay = Math.floor(1000/_fps);
let cycleCount = 0;
let oldCycleTime = 0;
let frameRate = "29";

//calculate fps rate
function calculateFps(){
  cycleCount++;
  if(cycleCount >= _fps) { cycleCount = 0; }
  let startTime = Date.now();
  let cycleTime = startTime - oldCycleTime;
  oldCycleTime = startTime;
  if(cycleCount % _fps == 0) { 
    frameRate = Math.floor(1000/cycleTime);
  }
  return frameRate;
}


function updatef(){
  //Clears previous draw
  ctx.clearRect(0,0,canvas.width, canvas.height);


  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  if(showFpsRate){
    let fpsRate = calculateFps();
    ctx.fillStyle = "red";
    ctx.fillText("FPS:"+fpsRate,5,10);
  }

  //infinite gameloop
  setTimeout(updatef, frameDelay);
}

window.onload = function(){
  updatef();
}

