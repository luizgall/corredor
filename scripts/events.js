
var startJump;
var upDown;
var el = document.getElementsByTagName("canvas")[0];
el.addEventListener("touchstart", startTouch);
el.addEventListener("touchmove", touchMove);
el.addEventListener("touchend", touchEnd);
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
        // document.getElementsByTagName("body")[0].webkitRequestFullScreen();
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