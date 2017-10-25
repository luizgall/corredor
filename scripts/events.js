window.addEventListener('keydown',this.check,false);
function check(e) {
    if(((e.keyCode == "32") || (e.keyCode=="38"))&&(player.state=="walk")){
        player.state = "jump";
        player.vy-=80;
        player.grounded= false;
    }
    if(((e.keyCode == "40") || (e.keyCode=="40"))&&(player.state=="walk")){
        player.state = "roll";

    }
}