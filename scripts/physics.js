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

    var gravity = new Vector(0,5);
    this.update = function(){
        if((player.position.x > 150)&&(player.grounded)){
            player.acceleration.x =0;
            player.velocity.x = 0;
            player.position.x-=5;
        }
        
    for (var i=0; i<allGameObjects.length; i++){
        if(!allGameObjects[i].grounded){
            allGameObjects[i].acceleration =  allGameObjects[i].acceleration.add(gravity);
            allGameObjects[i].velocity = allGameObjects[i].velocity.add(allGameObjects[i].acceleration).multiply(allGameObjects[i].speed); 

        }
        allGameObjects[i].position = allGameObjects[i].position.add(allGameObjects[i].velocity);

        }
        player.grounded= false;
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
                        console.log(allGameObjects[i].name, allGameObjects[j].name);
                        return true, resolveCollision({ "col1" : allGameObjects[i],
                               "col2" : allGameObjects[j]}) ;
                    }
                }     
             }         
        }
    };
    function resolveCollision(data){

        if(startJump){
            startJump = false;
            return;
        }
        if ((data.col1.type == "player")|| (data.col2.type =="player")){
            if(!data.col1.type == "player"){
                aux = data.col2;
                data.col2 = data.col1;
                data.col1 = aux;
            }
           if((data.col1.type == "ground")||(data.col2.type == "ground")){
                   if(rangeIntersect(data.col1.position.x, data.col1.position.x+ data.col1.width, data.col2.position.x, data.col2.position.x + data.col2.width)){
                       if((data.col1.type!= "ground")&&(data.col1.collider.bottom()-50  <= data.col2.collider.top())){
                            data.col1.acceleration.y = 0;
                           data.col1.velocity.y = 0;
                           if(data.col1.state == "fall"){
                               data.col1.state = "walk";
                           } 
                            data.col1.grounded = true;
                            data.col1.position.y = data.col2.collider.position.y - data.col1.height;

                       }
                       else   if(rangeIntersect(data.col1.collider.position.y, data.col1.position.y+data.col1.collider.height, data.col2.collider.position.y, data.col2.position.y+data.col2.collider.height)){
                           console.log("7777");
                        data.col1.velocity.x = -100;
                            data.col1.position.x = data.col2.collider.position.x - 100;

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