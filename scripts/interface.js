var GUI = {
    "area": new Vector(0, 0),
    "color": "black",
    "width": 800,
    "height": 50
}
var score; 
score = 0;
function drawGUI(){
    ctx.fillStyle = GUI.color;
    ctx.fillRect(GUI.area.x, GUI.area.y, GUI.width, GUI.height);
    ctx.font = "20px Georgia";
    ctx.fillStyle  = "white";
    text = "Distância: " + Math.floor(score) + " m"; 
    ctx.fillText(text,500,25);    
}

function Text(text, textColor, fontSize, position){
    this.text = text;
    this.color = textColor;
    this.font = fontSize; 
    this.position = position; 
    this.width = 300;
    this.height = 50;
    this.update = function(text){
        this.text =  text; 
    }
    this.write = function(dad){
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text,this.position.x, this.position.y);

    }
}

function Button(text, position, width, height){
    this.position = text.position;
    this.clicked = false; 
    this.width = width;
    this.height = height;
    this.text = text;
    this.click = function(){};
    this.position = position;
    buttons.push(this);
    this.write = function(){
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x-35, this.position.y-50, this.width, this.height+30);
        this.text.write();
    }
}
