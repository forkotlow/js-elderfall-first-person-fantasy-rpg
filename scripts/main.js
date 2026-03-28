import { Renderer } from "./core/renderer.js"
import { fr } from "./utils/framerate-utility.js"

//INSTANCES
const renderer = new Renderer('canvas',400,400);

//HTML ELEMENT REFERENCES
const fpsToggleButton = document.getElementById('debug-fps-toggle');


//GLOBAL VARS
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

//hide/ show Fps UI on click
fpsToggleButton.addEventListener('click', ()=>{ fr.toggleFpsRate(); } );

//Runs every frame
function updatef(){
  deltaTime = getDeltaTime();
  fpsDisplayText = fr.getFpsRate(deltaTime, FPS);

  //Clears previous draw
  renderer.clearAll();


  renderer.drawRect(100,100,20,20,"red");
  
  //Render fps-rate UI on canvas
  fr.renderFPS(renderer, fpsDisplayText, 20, 20, 16);

  //infinite gameloop
  setTimeout(updatef, INTERVAL);
}


window.onload = function(){
  updatef();
}

