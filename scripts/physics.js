var physics = (function(){

    var gravity = new Vector(0,30);
    this.update = function(){
    for (var i=0; i<allGameObjects.length; i++){
        if(!allGameObjects[i].grounded){
            allGameObjects[i].velocity = allGameObjects[i].velocity.add(gravity).multiply(allGameObjects[i].speed); 
        }
        allGameObjects[i].position = allGameObjects[i].position.add(allGameObjects[i].velocity);

        }
    }
    function rangeIntersect(min0, max0, min1,max1){
    return Math.max(min0,max0)>= Math.min(min1,max1) && Math.min(min0,max0)<=Math.max(min1,max1);
}

    function collision(r0,r1){
            if((r0 == undefined)|| (r1 == undefined)){
                return;
            }
            return rangeIntersect(r0.position.x, r0.position.x+r0.width,r1.position.x, r1.position.x+r1.width) && rangeIntersect(r0.position.y, r0.position.y+r0.height, r1.position.y, r1.position.y+r1.height);
        }

    this.checkCollision = function(){
        for (var i=0; i<allGameObjects.length; i++){
            for (var j=0; j<allGameObjects.length; j++){
                if(allGameObjects[i]!== allGameObjects[j]){
                    if(collision(allGameObjects[i], allGameObjects[j])){
                        return true, resolveCollision({ "col1" : allGameObjects[i],
                               "col2" : allGameObjects[j]}) ;
                    }
                }     
             }         
        }
        player.grounded= false;
    };
    function resolveCollision(data){
        if(startJump){
            startJump = false;
            return;
        }
        if ((data.col1.type == "player")|| (data.col2.type =="player")){
           if((data.col1.type == "ground")||(data.col2.type == "ground")){
               if(!data.col1.grounded){
                    data.col1.velocity.y = 0;
                   data.col1.grounded = true;
                   if(rangeIntersect(data.col1.position.x, data.col1.position.x+ data.col1.width, data.col2.position.x, data.col2.position.x + data.col2.width)){
                       if(data.col1.type!= "ground"){
                                  data.col1.position.y = data.col2.position.y - data.col1.height;
                       }
                        
                   }
               } else{
                    data.col2.velocity.y = 0;
                   data.col2.grounded = true;
                   if(rangeIntersect(data.col1.position.x, data.col1.position.x+ data.col1.width, data.col2.position.x, data.col2.position.x + data.col2.width)){
                       if(data.col2.type !="ground"){
                          data.col2.position.y = data.col1.position.y - data.col2.height;
                       }
                   }
               }
           }
        }
    };
            
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