var physics = (function(){

    var gravity = new Vector(0,10);
    this.update = function(){
    for (var i=0; i<allGameObjects.length; i++){
        if(!allGameObjects[i].grounded){
            allGameObjects[i].velocity = allGameObjects[i].velocity.add(gravity); 
        }
        allGameObjects[i].position = allGameObjects[i].position.add(allGameObjects[i].velocity);

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
    this.update= function(x,y){
        this.x = x;
        this.y = y;
    }
    this.draw = function(){
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
    }
}