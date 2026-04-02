let cycleCount = 0;
let fpsRate = "54";
let showUI = true;  //flag to hide/show UI

export const fr = {
  getFpsRate : function(deltaTime, fps){
    cycleCount++;
    if(cycleCount % fps == 0){
      fpsRate = Math.floor((1000/ deltaTime));
      cycleCount = 0;  
    }
    return ("FPS: " + fpsRate);
  },

  toggleFpsRate : function(){
    showUI = showUI == true ? false : true;
    //console.log("showing UI -> "+showFps);
  },

  renderFPS : function(renderer,fpsRateText="N",sX=0,sY=0,fontSize=10){

    if(renderer.constructor.name !== 'Renderer'){
      console.error("renderFPS() : Argument[0] requires Renderer Object"); return;
    }
    if(showUI){
      renderer.drawRect(
        sX-(fontSize/2),
        (sY+2)-fontSize,
        fontSize*(fpsRateText.length-2),
        fontSize+2,
        "green"
      ); //background rectangle
      renderer.text(fpsRateText,sX+1,sY+1 ,fontSize ,"black"); //shadow text
      renderer.text(fpsRateText,sX,sY,fontSize  ,"whitesmoke"); //main text
    }
  }
};