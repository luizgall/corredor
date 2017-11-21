
var startJump;
var buttons = [];
var upDown;
var el = document.getElementsByTagName("canvas")[0];
el.addEventListener("touchstart", startTouch);
el.addEventListener("touchmove", touchMove);
el.addEventListener("touchend", touchEnd);
el.addEventListener("click", clickHandler);

function clickHandler(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    for(i=0; i<buttons.length; i++){
        text = buttons[i];        
        if((mouseX>=text.position.x-35)&&(mouseX<=text.position.x+text.width)&&(mouseY>=text.position.y-50)&&(mouseY<=text.position.y+text.height+30)){
            text.clicked = true;
        }
    }
   
}
function startTouch(e){
      var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
        starty = parseInt(touchobj.clientY) // get x position of touch point relative to left edge of browser        e.preventDefault()
}
function touchMove(e) {
    if(e.touches) {
       var touchobj = e.changedTouches[0] // reference first touch point for this event
     dist = parseInt(touchobj.clientY) - starty
        e.preventDefault()
    }
}

function touchEnd(e){
    if(dist<0){
        jump();
    }
    if (dist>0){
        roll();
    }
}
$(document).ready(function(){
    // jump = 250;
       $(document).on('keydown', function(e){
            if(e.keyCode == "32"){
                console.log("jump");
            jump();
            }
           
        if((e.keyCode == "40")){
            roll();
        }
          if((e.keyCode == "40")){ 
          fall();
          }
       });
    
       $(document).on('keyup', function(e){
           upDown = false;
       });
    
    });

function jump(){
      if(((player.state == "walk")||(player.state == "roll"))){
                startJump = true;
                player.grounded= false;
                player.state = "jump";
                player.animator.state = "jump";
                player.acceleration.y -=80;
                player.acceleration.x = 5;
      }
}

function roll(){
            if (player.state=="walk")
        {    player.state = "roll";
            player.animator.state ="roll";}
}

function fall(){
    if(player.state=="fall"){
                 player.velocity.y+= 300; 
    }
}