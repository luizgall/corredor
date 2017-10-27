
var startJump;
$(document).ready(function(){
    // jump = 250;
       $(document).on('keydown', function(e){
            if(((e.keyCode == "32")) &&(player.state == "walk")){
                console.log("jump");
                startJump = true;
                player.grounded= false;
                player.state = "jump";
                player.animator.state = "jump";
                player.velocity.y -=700;

            }
       });
       $(document).on('keydown', function(e){
        if(((e.keyCode == "40") || (e.keyCode=="40"))&&(player.state=="walk")){
            console.log("roll");
            player.state = "roll";
            player.animator.state ="roll";
        }
       });
    
    });
