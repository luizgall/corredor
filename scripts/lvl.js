

function Level(level) {
    

    
}
var length = 700;
function spawnPlatform(){
    obj = new GameObject("obj", "ground", canvas.width+700, 300, length, 100, "img/plat.png");
    obj.grounded = true;
    obj.velocity = new Vector(-10,0);
    arr.push(obj);
}
score = 0;
arr = [];
function levelUpdate(){
    length -= 10;
    if(length<100){
        length = 700;
    }
    for(i=0;i<arr.length;i++){
        if(arr[i]){
                arr[i].draw();
                 if (arr[i].position.x <= -500){
                     delete arr[i];
        }
        }

   
    }
}