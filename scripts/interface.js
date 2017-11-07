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
    this.size = fontSize; 
    this.position = position; 
    this.update = function(text){
        this.text =  text; 
    }
    this.write = function(){
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, )

    }
}
