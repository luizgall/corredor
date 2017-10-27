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


var level  = new Level();
var player;


function initPlayer(){
    player = new GameObject("player", "player",150, 200, 150, 192, "img/spritesheet.png");
    player.animator = new Animator(player);
    player.animator.default("walk");
    player.animator.add(new Animation("walk", player.sheet, 4, 0, 13));
    player.animator.add(new Animation("jump", player.sheet, 7, 14, 19));
    player.animator.add(new Animation("roll", player.sheet, 6, 20, 26));
    player.velocity = new Vector(0,0);
    player.state = "walk";
    player.fixed = false;
    player.speed = 0.25;
    player.defaultState = "walk";
    player.grounded=true;
    player.falling = "false";
    player.sheet = new SpriteSheet("img/spritesheet.png", 200,200);
    player.collider = new Collider(player.position.x+150, player.position.y+50, player.width-100, player.height-50);
    player.animator.play();

    
    
}
function ground(){
    plat = new GameObject("ground", "ground", 0, 500 , 1000, 300, " ");
    plat.grounded = true;
    plat.collider = new Collider(plat.position.x, plat.position.y, plat.width, plat.height);
    plat.draw = function(){
        ctx.fillRect(plat.position.x,plat.position.y,plat.width,plat.height);
    }
    plat.velocity = new Vector(-10,0);
}

function startGame(){
    console.log("game started");
    initPlayer();
    ground();
    background.reset();
    update();
}

function update(){
    console.log(player.collider.position.y);
    requestAnimFrame(update)
    if(physics.checkCollision()){
        console.log("collision");
    }
    physics.update();
    background.draw();
    plat.draw();
    levelUpdate();
    
    plat.collider.update(plat.position.x, plat.position.y);
    player.collider.update(player.position.x+150, player.position.y+50);
    player.collider.draw();
    player.animator.play();

}