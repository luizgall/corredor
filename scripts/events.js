

$(document).ready(function(){
    
       $(document).on('keydown', function(e){
            if(((e.keyCode == "32")) &&(player.state == "walk")){
                player.grounded= false;
                player.state = "jump";
                player.animator.state = "jump";
                player.velocity.y -=1000;

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
