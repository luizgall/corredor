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

function Animation(sheet, frameSpeed, startFrame, endFrame){
    var animationSequence =[];
    var currentFrame = 0;
    var cont = 0;
    for(var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
        animationSequence.push(frameNumber);
    }
    
    this.reset = function(){
        currentFrame = 0;
        cont=0;
    }
    this.update = function(){
        if (cont == (frameSpeed -1))
            currentFrame = (currentFrame+1)%animationSequence.length;
        cont = (cont+1)%frameSpeed;
        if(currentFrame == animationSequence.length-1){
            return true, animationSequence.length;
        }
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