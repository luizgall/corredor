

$(document).ready(function(){
    
       $(document).on('keydown', function(e){
            if((e.keyCode == "32")&&(player.state=="walk")){
                player.state = "jump";
                player.animator.state = "jump";
                player.velocity = player.velocity.add(new Vector (0, -70));
                player.grounded= false;
            }
       });
       $(document).on('keydown', function(e){
        if(((e.keyCode == "40") || (e.keyCode=="40"))&&(player.state=="walk")){
            player.state = "roll";
            alert("hello");
        }
       });
    
    });
