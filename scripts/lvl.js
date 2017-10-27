
var level = {
    "maxGap":250,
    "gap":0,
    "maxLength": 1000,
    "length": 300
}
var length = 700;
var lastGap = 250;

function spawnPlatform(){
    obj = new GameObject("obj", "ground", arr[arr.length-1].position.x+arr[arr.length-1].width+200, 500, 200, 1000, "");
    obj.grounded = true;
    obj.collider = new Collider(obj.position.x, obj.position.y+200, obj.width, 50);
    obj.velocity = new Vector(-10,0);
    arr.push(obj);
}
score = 0;
arr = [];

function levelUpdate(){

    length -= 10;
    if(length<100){
        length = 200;
        spawnPlatform();
    }
    for(i=0;i<arr.length;i++){
        if(arr[i]){
            arr[i].collider.update(arr[i].position.x, arr[i].position.y);
                arr[i].draw();
                ctx.beginPath();
                ctx.fillStyle = "black";
                    ctx.fillRect(arr[i].collider.position.x, arr[i].collider.position.y , 200 , 100);
                    ctx.stroke();
                //ctx.drawImage(arr[i].sheet.image, arr[i].position.x, arr[i].position.y);
                //arr[i].collider.draw();
                
                 if (arr[i].position.x <= -500){
                     delete arr[i];
        }
        }

   
    }
}