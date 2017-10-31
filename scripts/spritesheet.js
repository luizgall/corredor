function SpriteSheet(path, frameWidth, frameHeight){
    this.image= new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    var self = this;
    this.image.onload =  function(){
      self.framesPerRow = Math.floor(self.image.width/self.frameWidth);  
    };
    this.image.src  = path;
}

function Animation(name, sheet, frameSpeed, startFrame, endFrame){
    var animationSequence =[];
    var currentFrame = 0;
    var cont = 0;
    for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
        animationSequence.push(frameNumber);
    }
    this.name = name;
    this.reset = function(){
        currentFrame = 0;
        cont=0;
    }
    this.update = function(){
        if (cont == (frameSpeed -1))
            currentFrame = (currentFrame+1)%animationSequence.length;
        cont = (cont+1)%frameSpeed;
        if(currentFrame == animationSequence.length-1){
            return true;
        }
        return false;
    };
    this.draw = function(x,y){
    var row = Math.floor(animationSequence[currentFrame] / sheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % sheet.framesPerRow);
    ctx.drawImage(
      sheet.image,
      col * sheet.frameWidth, row * sheet.frameHeight,
      sheet.frameWidth, sheet.frameHeight,
      x, y,
      sheet.frameWidth, sheet.frameHeight);
};
}


function Animator (obj){
    this.dad = obj;
    this.animations = [];
    this.pause = false;
    this.defaultAnimation = null;
    this.finished = false;
    this.state = "walk";
    this.cycle = [];
    this.default = function(animation){
        this.defaultAnimation = animation;
    }

    this.add = function(animation){
        this.animations.push(animation);
    }

    this.getAnimation = function(){
        var anim;
        this.state = this.dad.state;
        for (var i = 0; i< this.animations.length;i++){
            if(this.animations[i].name == this.state){
                anim = this.animations[i];
            }
        }
        return anim;
    }
    this.play = function ()
     {
        animation = this.getAnimation();
        if(!this.pause){
            if(animation.update()){
                this.finished = true;
            }
        }
        animation.draw(this.dad.position.x, this.dad.position.y);
        if(animation.name == "walk"){
            this.finished = false;
            return;
        }
        if(this.finished){
            animation.reset();
        }
    }
}