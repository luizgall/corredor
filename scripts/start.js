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
    player = new GameObject("player", "player",150, 200, 150, 200, "img/spritesheet.png");
    console.log(player.position);
    player.velocity = new Vector(0,1000);
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

function rangeIntersect(min0, max0, min1,max1){
    return Math.max(min0,max0)>= Math.min(min1,max1) && Math.min(min0,max0)<=Math.max(min1,max1);
}

function collision(r0,r1){
    return rangeIntersect(r0.position.x, r0.position.x+r0.width,r1.position.x, r1.position.x+r1.width) && rangeIntersect(r0.position.y, r0.position.y+r0.height, r1.position.y, r1.position.y+r1.height);
}

function check(){
        if(collision(player, plat)){
                player.grounded=true;
                player.velocity.y = 0;
                player.position.y = plat.top()-player.height-1;
                return true;        
    }
        if(collision(player,obj)){
            console.log("Ai!");
        }
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
    if(check()){
        console.log("collision");
    }
    physics.update();
    background.draw();
    plat.draw();
    obj.draw();
    if(player.state == "walk"){
        player.walk.update();
        player.walk.draw(player.position.x,player.position.y);
    }
    
 if (player.state=="jump"){

     if(player.jump.update()){
         player.state = "walk";
         player.jump.reset();
     }
        player.jump.draw(player.position.x,player.position.y);
    }
    
    if(player.state=="roll"){
        if(player.roll.update()){
            player.state =  "walk";
            player.roll.reset();
        }
        player.roll.draw(player.position.x,player.position.y);
    }

}