
var startJump;
var upDown;
$(document).ready(function(){
    // jump = 250;
       $(document).on('keydown', function(e){
           
           if(e.keyCode=="38"){
               upDown = true;
           }
           console.log(e.which);
            if(((e.keyCode == "32")) &&(player.state == "walk")){
                console.log("jump");
                startJump = true;
                player.grounded= false;
                player.state = "jump";
                player.animator.state = "jump";
                if(upDown){
                                    player.acceleration.y -=90;
                                                        player.velocity.x = 200;

                }
                else{
                                    player.acceleration.y -=80;
                                    player.acceleration.x = 5;
                }


            }
           
       /* if(((e.keyCode == "40") || (e.keyCode=="40"))&&(player.state=="walk")){
            console.log("roll");
            player.state = "roll";
            player.animator.state ="roll";
        }*/
          if(((e.keyCode == "40")) &&(player.state == "fall")){  
              console.log("oi");
          
          player.velocity.y+= 100;
          
          }
       });
    
       $(document).on('keyup', function(e){
           upDown = false;
       });
    
    });
