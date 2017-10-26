window.addEventListener('keydown',this.check,false);
function check(e) {
    if(((e.keyCode == "32") || (e.keyCode=="38"))&&(player.state=="walk")){
        player.state = "jump";
        player.velocity = player.velocity.add(new Vector (0, -70));
        player.grounded= false;
    }
    if(((e.keyCode == "40") || (e.keyCode=="40"))&&(player.state=="walk")){
        player.state = "roll";

    }
}