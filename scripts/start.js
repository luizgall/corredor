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



var player;
function initPlayer(){
    player = new GameObject("player", "player",150, 50, 150, 200, "img/spritesheet.png");
    player.vx = 0;
    player.vy = 10;
    player.collider = new Collider(player.x+30, player.y+30, player.width-50, player.height-30);
    player.state = "jump";
    player.grounded="false";
    player.sheet = new SpriteSheet("img/spritesheet.png", 200,200);
    player.walk = new Animation(player.sheet, 4, 0, 13);
    player.jump = new Animation(player.sheet, 5, 14, 19);
    player.roll = new Animation(player.sheet, 4, 20, 26); 
    player.walk.update();
    player.walk.draw(100,100);
}
function ground(){
    plat = new GameObject("ground", "ground", 0, 500 , 1000, 300, " ");
    plat.collider = new Collider(plat.x,plat.y,plat.width,plat.height);
    plat.grounded = true;
    plat.draw = function(){
        ctx.fillRect(plat.x,plat.y,plat.width,plat.height);
    }

}
function check(){
        if(player.bottom() > plat.top()){
                player.grounded=true;
                player.vy = 0;
                player.y = plat.top()-player.height-1;
                return true;        
    }
         return false;
}

function startGame(){
    console.log("game started");
    initPlayer();
    ground();
    background.reset();
    update();
}

function update(){
    requestAnimFrame(update)
    console.log(player.y);
    if(check()){
        console.log("collision");
    }
    physics.update();
    background.draw();
    player.collider.update(player.x+30, player.y+30);
    plat.draw();
    if(player.state == "walk"){
        player.walk.update();
        player.walk.draw(player.x,player.y);
    }
    
 if (player.state=="jump"){

     if(player.jump.update()){
         player.state = "walk";
         player.jump.reset();
     }
        player.jump.draw(player.x,player.y);
    }
    
    if(player.state=="roll"){
        if(player.roll.update()){
            player.state =  "walk";
            player.roll.reset();
        }
        player.roll.draw(player.x,player.y);
    }

}