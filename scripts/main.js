import { Renderer } from "./core/renderer.js"
import { fr } from "./utils/framerate-utility.js"

const renderer = new Renderer('canvas',300,300);


const FPS = 60;
let INTERVAL = Math.floor( (1000/FPS) );
let lastPassedTime = 0;
let deltaTime = 0; //Time passed since last frame;
let fpsDisplayText = "29";

//calculates deltaTime
function getDeltaTime(){
  let currentTime = Date.now();
  let deltaTime = currentTime -lastPassedTime;
  lastPassedTime = currentTime;
  return deltaTime;
}


function updatef(){
  deltaTime = getDeltaTime();
  fpsDisplayText = fr.getFpsRate(deltaTime, FPS);

  //Clears previous draw
  renderer.clearAll();

  //ctx.fillStyle = "white";
  //ctx.fillRect(0,0,canvas.width,canvas.height);



  renderer.drawRect(100,100,20,20,"red");
  
  
  //Render fps-rate UI on canvas
  fr.renderFPS(renderer, fpsDisplayText, 20, 20, 16);

  //infinite gameloop
  setTimeout(updatef, INTERVAL);
}

window.onload = function(){
  updatef();
}

