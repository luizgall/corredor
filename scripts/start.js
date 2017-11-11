var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback, element){
           window.setTimeout(callback, 1000 / 60);
         };
})();
screen.orientation.lock("landscape");   screen.lockOrientation("landscape");
var player;

function initPlayer(){
    player = new GameObject("player", "player",150, 150, 150, 192, "img/spritesheet.png");
    player.animator = new Animator(player);
    player.animator.default("walk");
    player.animator.add(new Animation("walk", player.sheet, 4, 0, 13));
    player.animator.add(new Animation("jump", player.sheet, 6, 14, 16));
    player.animator.add(new Animation("roll", player.sheet, 4, 20, 26));
    player.animator.add(new Animation("fall", player.sheet, 4, 17, 17));
    player.velocity = new Vector(0,-10);
    player.state = "walk";
    player.fixed = false;
    player.speed = 0.25;
    player.defaultState = "walk";
    player.grounded=true;
    player.falling = "false";
    player.died = false;
    player.sheet = new SpriteSheet("img/spritesheet.png", 200,200);
    player.collider = new Collider(player.position.x+150, player.position.y+50, player.width-70, player.height-50);
    player.animator.play();

    
    
}
function ground(){
    plat = new GameObject("ground", "ground", 0, 450 , 1000, 300, " ");
    plat.grounded = true;
    plat.collider = new Collider(plat.position.x, plat.position.y, plat.width, plat.height);
    plat.draw = function(){
        ctx.fillStyle = "black";
        ctx.fillRect(plat.position.x,plat.position.y,plat.width,plat.height);
    }
    plat.velocity = level.difficults[level.lv].speed;
    arr.push(plat);
}

function startGame(){
    level.start(); 
}

function update(){

    requestAnimFrame(update)
    physics.update();
    background.draw();
    plat.draw();
 
    plat.collider.update(plat.position.x, plat.position.y);
    if(player.state == "roll"){
        player.collider.height = 95;
        player.collider.update(player.position.x+50, player.position.y+100);
        
    }else{
        player.collider.height = player.height-50;
        
        player.collider.update(player.position.x+50, player.position.y+50);
        
    }
    player.animator.play();
    if((player.animator.finished) && (player.state=="jump")){
        player.state = "fall";
        startJump = false;
    }
        if((player.animator.finished) && (player.state=="roll")){
        player.state = "walk";
    }
    if(player.position.y > 1000){
        player.died = true;
    }
    level.update();


}