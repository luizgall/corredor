
var startJump;
var upDown;
$(document).ready(function(){
    // jump = 250;
       $(document).on('keydown', function(e){
            if(((e.keyCode == "32")) &&((player.state == "walk")||(player.state == "roll"))){
                console.log("jump");
                startJump = true;
                player.grounded= false;
                player.state = "jump";
                player.animator.state = "jump";
                player.acceleration.y -=80;
                player.acceleration.x = 5;
            }
           
        if((e.keyCode == "40") && (player.state == "walk")){
            console.log("roll");
            player.state = "roll";
            player.animator.state ="roll";
        }
          if(((e.keyCode == "40")) &&(player.state == "fall")){ 
          
          player.velocity.y+= 300;
          
          }
       });
    
       $(document).on('keyup', function(e){
           upDown = false;
       });
    
    });
