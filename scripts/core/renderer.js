class Renderer{

  constructor(canvasID, width, height){
    this.name = "Renderer";
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = width;
    this.canvas.height = height;
    console.log("Init Renderer");
  }
  
  get width(){ return this.canvas.width; }
  get height(){ return this.canvas.height; }
  get context(){ return this.ctx; }

  drawRect(startX=0, startY=0, width=5, height=5,color = "black"){
    this.ctx.fillStyle = color;
    this.ctx.fillRect(startX,startY,width,height);
  }

  text(myText="Text", startX, startY, size="12px", color="black"){
    this.ctx.font = size+"px Arial" ;
    this.ctx.fillStyle = color;
    this.ctx.fillText(myText, startX, startY);
  }

  drawCircle(startX, startY, radius, startAngle,endAngle){
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(startX,startY,radius,startAngle,endAngle);
    this.ctx.fill();
  }

  castRay(startX,startY,endX,endY,color="red"){
    this.ctx.beginPath();
    this.ctx.moveTo(startX,startY);
    this.ctx.lineTo(endX,endY)
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  clearAll(){
    this.ctx.clearRect(0,0,this.width,this.height)
  }
  
};

export { Renderer };