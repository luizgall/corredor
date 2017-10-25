var physics = (function(){

    var gravity = 10;
    this.update = function(){
    for (var i=0; i<allGameObjects.length; i++){
        if(!allGameObjects[i].grounded){
        allGameObjects[i].vy += gravity;}

        allGameObjects[i].x += allGameObjects[i].vx;
        allGameObjects[i].y += allGameObjects[i].vy;
        if(allGameObjects[i].grounded){
        allGameObjects[i].vy = 0;
        } 
    }
    }
    
        this.checkCollision = function(){
            cont = 0;
        for (var i=0; i<allGameObjects.length; i++){
            for (var j=0; j<allGameObjects.length; i++){
                cont++;
                if(allGameObjects[i]!== allGameObjects[j]){
                    if(allGameObjects[i].bottom< allGameObjects[j].top ||allGameObjects[i].top > allGameObjects[j].bottom ||
                      allGameObjects[i].right< allGameObjects[j].left || allGameObjects[i].left< allGameObjects[j].right){
                        console.log([allGameObjects[i].left, allGameObjects[j].left, cont]);
                        return false;
                    }
                    return true;
                }
                 
                }
                }
            
        }

    return{
        update:this.update,
        checkCollision:this.checkCollision
    };
})();

function Collider(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = function(){
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
    }
}