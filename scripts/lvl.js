
var level = {
    "state":"intro",
    "lv": 0,
    "difficults" : [
    {"obsN": 0,
    "speed": new Vector(-10,0),
    "maxWidth": 1000,
    "minWidth": 800, 
    "deltaHeight":50,
    "minGap":50,
    "maxGap":100,
    },
    {"obsN": 0,
    "speed": new Vector(-12,0),
    "maxWidth": 800,
    "minWidth": 500, 
    "deltaHeight":100,
    "minGap":100,
    "maxGap":150,
    },
    {"obsN": 0,
    "speed": new Vector(-14,0),
    "maxWidth": 800,
    "minWidth": 200, 
    "deltaHeight":200,
    "minGap":150,
    "maxGap":200,
    },
    ], 
    "allGameObjects" : [],
    "maxGap":250,
    "gap":0,
    "maxLength": 1000,
    "length": 300,
    "spawnPlatform" : function(){
        score +=1;
        width = random(level.difficults[level.lv].maxWidth, level.difficults[level.lv].minWidth);
        lastY = arr[arr.length-1].position.y;
        gap = random (level.difficults[level.lv].maxGap, level.difficults[level.lv].minGap);
        if(lastY <= 400){
    
            lastY += random (level.difficults[level.lv].deltaHeight, 0);
        }
        else{        
            lastY -= random(level.difficults[level.lv].deltaHeight, 0);
        }
        var obj;
        obj = new GameObject("obj"+arr.length, "ground", arr[arr.length-1].position.x+arr[arr.length-1].width+gap, lastY, width, 1000, "");
        obj.grounded = true;
        obj.collider = new Collider(obj.position.x, obj.position.y+200, obj.width, 2000);
        obj.velocity = level.difficults[level.lv].speed;
        arr.push(obj);
        x = random (arr[arr.length-1].width - 100, arr[arr.length-1].position.x)+100;
        y = arr[arr.length-1].position.y - 240;
        var taculos;
        if(arr[arr.length-1].width >= 400){
            taculos = new GameObject("obstaculo", "ground", x, y, 50, 150, ""); 
            taculos.collider = new Collider(taculos.position.x, taculos.position.y, taculos.width, taculos.height);
            taculos.velocity = level.difficults[level.lv].speed;
            taculos.grounded = true;
            obs.push(taculos);
        }
    },
    "updateColliders": function(){
        plat.collider.update(plat.position.x, plat.position.y);
        if(player.state == "roll"){
            player.collider.height = 95;
            player.collider.update(player.position.x+50, player.position.y+100);
            
        }else{
            player.collider.height = player.height-50;
            
            player.collider.update(player.position.x+50, player.position.y+50);
            
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
                
                if (arr[i].position.x <= -4000){
                    arr.splice(i,0);
                }
            }
        }
            for(i=0;i<obs.length;i++){
            if(obs[i]){
                obs[i].collider.update(obs[i].position.x, obs[i].position.y-30);
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                       ctx.fillRect(obs[i].collider.position.x, obs[i].collider.position.y , obs[i].width , obs[i].height);
                        ctx.stroke();
                    
                     if (obs[i].position.x <= -4000){
                         obs.splice(i,0);
            }
            }
        }

    },
    "updateAnimations" : function(){
        background.draw();
        plat.draw();
        player.animator.play();
        if((player.animator.finished) && (player.state=="jump")){
            player.state = "fall";
            startJump = false;
        }
            if((player.animator.finished) && (player.state=="roll")){
            player.state = "walk";
        }
        if(player.position.y > 1000){
            player.died = true;
        }
    },
    "update":function(){

    },
    "updateVelocity":function(){
        for(i=0; i < level.allGameObjects.length; i++){
            if(level.allGameObjects[i]!== player){
                level.allGameObjects[i].velocity = level.difficults[level.lv].speed;
            }
        }
    },
    "start": function(){
        scenes.intro.start();
    }
}
var length = 700;
var lastGap = 250;
arr = [];
obs = [];

var scenes = {
  "intro": {
      "start":function(){
          background.reset();
          a = new Text("atrasado", "white", "60px Georgia", new Vector(280, 150));
          b = new Text("começar", "white", "40px Georgia", new Vector(320, 300));
          c = new Text("instruções", "white", "40px Georgia", new Vector(300, 400));
          instruTitle = new Text("controles:", "white", "40px Georgia", new Vector(320, 150));
          instruL1 = new Text("Espaço : pular", "white", "30px Georgia", new Vector(220, 250));
          instruL2 = new Text("Seta para baixo : cambalhota", "white", "30px Georgia", new Vector(220, 350));
          instruJogar = new Text("começar", "white", "60px Georgia", new Vector(300, 450));
            title = new Button(a, new Vector(280, 150), 300, 50);
            start = new Button(b, new Vector(280, 300), 300, 50);
            instru = new Button(c, new Vector(280, 400), 300, 50);
            jogar = new Button(instruJogar, instruJogar.position, 300, 50);
            
          title.write();
          scenes.intro.update();
      },
      "update":function(){
          background.draw();
          if(instru.clicked){
              instru.clicked = false; 
                scenes.intro.instru();
        } else{
            requestAnimFrame(scenes.intro.update);            
          title.write();
          start.write();
          instru.write();
          if (start.clicked){
              start.clicked = false;
              scenes.level1.start();

          }
        }
      },
      "instru":function(){
          background.draw();
        ctx.fillStyle="black";
        ctx.fillRect(100, 100, 600, 300);
        instruTitle.write();
        instruL1.write();
        instruL2.write();
        instruJogar.write();
        jogar.write();
        if(jogar.clicked){
            jogar.clicked = false;
            
            scenes.level1.start();
        } else{
            requestAnimFrame(scenes.intro.instru);            
        }
        
        }
  },
  "level1":{
         "start": function(){
            score = 0;
            level.lv = 0;
            buttons = [];
            arr = [];
            obs = [];
            taculos = [];
            abc = 0;
        initPlayer();
        ground();
        background.reset();
        level.spawnPlatform();
         scenes.level1.update();

        },
        "update": function(){
            if(player.died){
                abc += 1;
                console.log(abc);
            }
            if((player.died)&&abc>50){
                        scenes.gameOver.start();
            }else{
            requestAnimFrame(scenes.level1.update);}
            physics.update();
            background.draw();
            plat.draw();
            plat.collider.update(plat.position.x, plat.position.y);
            if(player.state == "roll"){
                player.collider.height = 95;
                player.collider.update(player.position.x+50, player.position.y+100);
                
            }else{
                player.collider.height = player.height-50;
                
                player.collider.update(player.position.x+50, player.position.y+50);
                
            }
            player.animator.play();
            if((player.animator.finished) && (player.state=="jump")){
                player.state = "fall";
                startJump = false;
            }
                if((player.animator.finished) && (player.state=="roll")){
                player.state = "walk";
            }
            if(player.position.y > 1000){
                player.died = true;
            }
            if(!player.died){
                score += 0.3;
            }    
            if((score>=150) && (score < 300)){
                level.lv =1;
                level.updateVelocity();
            }
            if((score>=300) && (score < 500)){
                level.lv =2;
                level.updateVelocity();
            }
            if((score>=550) && (score < 900)){
                level.lv =3;
                level.updateVelocity();
            }
            if((arr[arr.length-1].position.x <=800)&&(!player.died)){
                level.spawnPlatform();
            }


            level.updateColliders();
            drawGUI();

        }
  },
  "gameOver":{
      "start": function(){
      a = new Text("Fim do jogo", "white", "60px Georgia", new Vector(280, 150));
      b = new Text("jogar novamente", "white", "40px Georgia", new Vector(290, 450));
        title = new Button(a, new Vector(280, 150), 400, 50);
    nov = new Button(b, new Vector(210, 450), 500, 50);
      title.write();
      nov.write();
      scenes.gameOver.update();
  },
  "update": function(){
    physics.update();    
    background.draw(); 
    level.updateVelocity();    
    level.updateColliders();
    
    title.write();
    nov.write();   
    if(nov.clicked){
        nov.clicked = false;
        window.location.reload(false); 
        
    }else{
    requestAnimationFrame(scenes.gameOver.update);}
    
  }

}
}


abc = 0;