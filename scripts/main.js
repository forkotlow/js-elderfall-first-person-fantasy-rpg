import { Renderer } from "./core/renderer.js" 
import { fr } from "./utils/framerate-utility.js" 
import {testArea} from "./data/maps/map01.js" 


//INSTANCES
const renderer = new Renderer('canvas',400,400);

//HTML ELEMENT REFERENCES
const fpsToggleButton = document.getElementById('debug-fps-toggle');
const log = document.getElementById("text-log");
const upBtn = document.getElementById("arrow-up");
const downBtn = document.getElementById("arrow-down");
const leftBtn = document.getElementById("look-left");
const rightBtn = document.getElementById("look-right");
const stopBtn = document.getElementById("player-stop");


//GLOBAL VARS
const FPS = 60;
let INTERVAL = Math.floor( (1000/FPS) );
const PI = Math.PI;
const PI_SQUARE = Math.PI * 2;

let lastPassedTime = 0;
let deltaTime = 0; //Time passed since last frame;
let fpsDisplayText = "";

//MAP VARS - test 
const MAP_HEIGHT = 20;
const MAP_WIDTH  = 20;
let MAP_SCALE = 16;
let MAP_SPEED_RATE = Math.floor(MAP_SCALE/2)/10;

//PLAYER VARS - test 
let playerScale = Math.floor(MAP_SCALE*0.4);
//Player Coordinates
let playerX = 2 * MAP_SCALE; 
let playerY = 2 * MAP_SCALE;
let playerLookAngle = PI / 2;

let playerMoveX = 0;
let playerMoveY = 0;
let playerMoveAngle = 0;
let playerSpeed = 2 * MAP_SPEED_RATE ;


function renderMap(map){
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      let flatIndex = (y * MAP_WIDTH) + x;
      
        // Should print 0
      if(map[flatIndex] == 1){
        renderer.drawRect(
        (x*MAP_SCALE),
        (y*MAP_SCALE),
        MAP_SCALE,MAP_SCALE,"gray");
      }
      if(map[flatIndex] == 0){
        renderer.drawRect(
        (x*MAP_SCALE),
        (y*MAP_SCALE),
        MAP_SCALE,MAP_SCALE,"lightgrey");
      }
    }
  }

};

//calculates deltaTime
function getDeltaTime(){
  let currentTime = Date.now();
  let deltaTime = currentTime -lastPassedTime;
  lastPassedTime = currentTime;
  return deltaTime;
}

//Hide/show Fps UI on click
fpsToggleButton.addEventListener('click', ()=>{ fr.toggleFpsRate(); } );

//player movement keys
if(true){
  //button down events
  upBtn.addEventListener('pointerdown',()=>{ playerMoveX = 1; playerMoveY = 1; 
  } );
  downBtn.addEventListener('pointerdown',()=>{ playerMoveX = -1; playerMoveY = -1; 
  } );
  leftBtn.addEventListener('pointerdown',()=>{ playerMoveAngle = 1; 
  } );
  rightBtn.addEventListener('pointerdown',()=>{ playerMoveAngle = -1; 
  } );
  //button up events
  upBtn.addEventListener('pointerup',()=>{ playerMoveX = 0; playerMoveY = 0; 
  } );
  downBtn.addEventListener('pointerup',()=>{ playerMoveX = 0; playerMoveY = 0; 
  } );
  leftBtn.addEventListener('pointerup',()=>{ playerMoveAngle = 0; 
  } );
  rightBtn.addEventListener('pointerup',()=>{ playerMoveAngle = 0; 
  } );
  //button leave events
  upBtn.addEventListener('pointerleave',()=>{ playerMoveX = 0; playerMoveY = 0; 
  } );
  downBtn.addEventListener('pointerleave',()=>{ playerMoveX = 0; playerMoveY = 0; 
  } );
  leftBtn.addEventListener('pointerleave',()=>{ playerMoveAngle = 0; 
  } );
  rightBtn.addEventListener('pointerleave',()=>{ playerMoveAngle = 0; 
  } );
}

//Runs every frame
function Update(){
  deltaTime = getDeltaTime();
  fpsDisplayText = fr.getFpsRate(deltaTime, FPS);
  
  //Clears previous draw
  renderer.clearAll();

  //Collision check
  let mapTargetX = 
    Math.floor(playerY /MAP_SCALE) 
    * MAP_WIDTH 
    + Math.floor(
      (playerX + 
      (Math.sin(playerLookAngle)*playerScale)
      * playerMoveX) /MAP_SCALE);

  let mapTargetY = 
    Math.floor(
      (playerY +
      (Math.cos(playerLookAngle)*playerScale)
      * playerMoveX) /MAP_SCALE)
    * MAP_WIDTH 
    + Math.floor(playerX /MAP_SCALE);

  console.log(mapTargetX,mapTargetY);

  if(playerMoveX && testArea[mapTargetX] == 0) { 
    playerX += Math.sin(playerLookAngle) * (playerMoveX * playerSpeed); 
  }
  if(playerMoveY && testArea[mapTargetY] == 0) { 
    playerY += Math.cos(playerLookAngle) * (playerMoveY * playerSpeed);
  }
  if(playerMoveAngle) { 
    playerLookAngle += playerMoveAngle * 0.03
  }
  
  //draw map 
  renderMap(testArea);

  //draw player 
  renderer.drawCircle(
    playerX,
    playerY,
    playerScale,
    0,PI_SQUARE);

  renderer.castRay(
    playerX,
    playerY,
    playerX + Math.sin(playerLookAngle)*16,
    playerY + Math.cos(playerLookAngle)*16,
    "blue"
  )
  

  //test log messages of player data
  let px = Math.floor(playerX);
  let py = Math.floor(playerY);
  
  let dx = (playerX + Math.sin(playerLookAngle)*2) - playerX;
  let dy = (playerY + Math.cos(playerLookAngle)*2) - playerY;
  let plangle = Math.atan2(dy,dx) * (180/PI);
  let degree = plangle < 0 ? Math.floor(plangle)+360 : Math.floor(plangle);

  let m1 = "player ("+px+', '+py+")"
  let m2 = " and looking at "+ degree;
  log.textContent = m1 + m2;

  //Render fps-rate UI on canvas
  fr.renderFPS(renderer, fpsDisplayText, 20, 20, 16);

  //infinite gameloop
  setTimeout(Update, INTERVAL);
}


window.onload = ()=>{ 
  Update(); 
};

