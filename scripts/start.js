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
    player = new GameObject("player", "player",150, 200, 200, 200, "img/spritesheet.png");
    player.animator = new Animator(player);
    player.animator.default("walk");
    player.animator.add(new Animation("walk", player.sheet, 4, 0, 13));
    player.animator.add(new Animation("jump", player.sheet, 5, 14, 19));
    player.animator.add(new Animation("roll", player.sheet, 4, 20, 26));
    player.velocity = new Vector(0,0);
    player.state = "walk";
    player.grounded="true";
    player.sheet = new SpriteSheet("img/spritesheet.png", 200,200);
    player.animator.play();
}
function ground(){
    plat = new GameObject("ground", "ground", 0, 500 , 1000, 300, " ");
    plat.grounded = true;
    plat.draw = function(){
        ctx.fillRect(plat.position.x,plat.position.y,plat.width,plat.height);
    }
    
    obj = new GameObject("obj", "obj", canvas.width, 300, 100, 100, "");
    obj.grounded = true;
    obj.draw = function(){
        ctx.fillRect(obj.position.x,obj.position.y,obj.width,obj.height);
    }
    obj.velocity = new Vector(-10,0);

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
    if(physics.checkCollision()){
        console.log("collision");
    }
    physics.update();
    background.draw();
    plat.draw();
    obj.draw();
    player.animator.play();

}