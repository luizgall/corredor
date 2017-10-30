
var level = {
    "maxGap":250,
    "gap":0,
    "maxLength": 1000,
    "length": 300
}
var length = 700;
var lastGap = 250;

function random(max, min){
    return Math.floor((Math.random()*max)+min);
}
function spawnPlatform(){
    score +=1;
    width = random(500, 200);
    lastY = arr[arr.length-1].position.y;
    gap = random (300, 100);
    if(lastY <= 400){

        lastY += random (200, 0);
    }
    else{        
        lastY -= random(200, 0);
    }
    var obj;
    obj = new GameObject("obj"+arr.length, "ground", arr[arr.length-1].position.x+arr[arr.length-1].width+gap, lastY, width, 1000, "");
    obj.grounded = true;
    obj.collider = new Collider(obj.position.x, obj.position.y+200, obj.width, 2000);
    obj.velocity = new Vector(-10,0);
    arr.push(obj);
}
score = 0;
arr = [];

function levelUpdate(){
    console.log(score);
    length -= 10;
    if((length<=0)&&(!player.died)){
        length = 800;
        spawnPlatform();
    }
    for(i=0;i<arr.length;i++){
        if(arr[i]){
            arr[i].collider.update(arr[i].position.x, arr[i].position.y);
                arr[i].draw();
                ctx.beginPath();
                ctx.fillStyle = "black";
                    ctx.fillRect(arr[i].collider.position.x, arr[i].collider.position.y , arr[i].width , 2000);
                    ctx.stroke();
                //ctx.drawImage(arr[i].sheet.image, arr[i].position.x, arr[i].position.y);
                //arr[i].collider.draw();
                
                 if (arr[i].position.x <= -2000){
                     delete arr[i];
        }
        }

   
    }
}