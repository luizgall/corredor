 function rangeIntersect(min0, max0, min1,max1){
    return Math.max(min0,max0)>= Math.min(min1,max1) && Math.min(min0,max0)<=Math.max(min1,max1);
}

    function collision(r0,r1){
            if((r0 == undefined)|| (r1 == undefined)){
                console.log("undefined");
                return;
            }
            return rangeIntersect(r0.position.x, r0.position.x+r0.width,r1.position.x, r1.position.x+r1.width) && rangeIntersect(r0.position.y, r0.position.y+r0.height, r1.position.y, r1.position.y+r1.height);
        }

var physics = (function(){

    var gravity = new Vector(0,25);
    this.update = function(){
        if((player.position.x > 150)&&(player.grounded)){
            player.position.x -=3;
        }
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
                console.log("undefined");
                return;
            }
            return rangeIntersect(r0.position.x, r0.position.x+r0.width,r1.position.x, r1.position.x+r1.width) && rangeIntersect(r0.position.y, r0.position.y+r0.height, r1.position.y, r1.position.y+r1.height);
        }

    this.checkCollision = function(){
        for (var i=0; i<allGameObjects.length; i++){
            for (var j=0; j<allGameObjects.length; j++){
                if(allGameObjects[i]!== allGameObjects[j]){
                    if(collision(allGameObjects[i].collider, allGameObjects[j].collider)){
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
            return;
        }
        if ((data.col1.type == "player")|| (data.col2.type =="player")){
            //console.log(data.col1.name, data.col1.top(), data.col2.name, data.col2.top());
           if((data.col1.type == "ground")||(data.col2.type == "ground")){
               if(!data.col1.grounded){
                   if(rangeIntersect(data.col1.position.x, data.col1.position.x+ data.col1.width, data.col2.position.x, data.col2.position.x + data.col2.width)){
                       if((data.col1.type!= "ground")&&(data.col1.collider.bottom()-10<= data.col2.collider.top())){
                            data.col1.velocity.y = 0;
                            data.col1.state = "walk";
                            data.col1.grounded = true;
                            data.col1.position.y = data.col2.collider.position.y - data.col1.height;
                            console.log("collision");
                       }
                       else if ((data.col1.type !="ground")&&(data.col1.collider.bottom()-10 >= data.col2.collider.top())) {
                           console.log("almostcollision");
                          data.col1.velocity.x = -100;
                       }
                        
                   }
               } else{
                   if(rangeIntersect(data.col1.position.x, data.col1.position.x+ data.col1.width, data.col2.position.x, data.col2.position.x + data.col2.width)){
                       if((data.col2.type !="ground")&&(data.col2.collider.bottom()-10 <= data.col1.collider.top())){
                        data.col2.velocity.y = 0;
                        data.col1.state = "walk";
                        data.col2.grounded = true;
                          data.col2.position.y = data.col1.collider.position.y - data.col2.height;
                          console.log("collision");
                       }
                       else if ((data.col2.type !="ground")&&(data.col2.collider.bottom()-10 >= data.col1.collider.top())) {
                            console.log("almostcollision");
                           player.velocity.x = -100;
                       }
                   }
               }
           }
        }
    };
    return{
        update:this.update,
        checkCollision:this.checkCollision
    };
})();

function Collider(x, y, width, height){
    this.position = new Vector(x,y);
    this.width = width;
    this.height = height;
    this.left = function(){
        return this.position.x;};
    this.top = function(){
        return this.position.y;};
    this.right = function(){
        return this.position.x + this.width;};
    this.bottom = function(){
        return this.position.y + this.height;}
    this.update= function(x,y){
        this.position.x = x;
        this.position.y = y;
    }
    this.draw = function(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        ctx.stroke();
    }
}