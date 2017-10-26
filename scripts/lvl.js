

function Level(level) {
    
    this.create = function(x, y){
    enemy = new GameObject("enemy", "enemy", x, y, 200, 200, "");
    enemy.velocity = new Vector(-100,0);
    enemy.state = "flying";
    player.speed = 0.35;
    enemy.draw = function(){
    ctx.fillRect(enemy.position.x,enemy.position.y,enemy.width,enemy.height);
    }
    }
    
}
