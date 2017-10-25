var background =(function(){
    var sky ={};
    var bg1 = {};
    var bg2 ={};
    var bg3 ={};
    
    this.draw = function(){
        sky.x -= sky.speed;
        bg1.x -= bg1.speed;
        bg2.x -= bg2.speed;
        bg3.x -= bg3.speed;
        ctx.drawImage(assets.imgs.sky, sky.x, sky.y);
        ctx.drawImage(assets.imgs.sky, sky.x + canvas.width, sky.y);
        ctx.drawImage(assets.imgs.bg3, bg3.x, bg3.y);
        ctx.drawImage(assets.imgs.bg3, bg3.x + canvas.width, bg3.y);
        ctx.drawImage(assets.imgs.bg2, bg2.x, bg2.y);
        ctx.drawImage(assets.imgs.bg2, bg2.x + canvas.width, bg2.y);
        ctx.drawImage(assets.imgs.bg1, bg1.x, bg1.y);
        ctx.drawImage(assets.imgs.bg1, bg1.x + canvas.width, bg1.y);
        if (sky.x + assets.imgs.sky.width <= 0)
          sky.x = 0;
        if (bg1.x + assets.imgs.bg1.width <= 0)
          bg1.x = 0;
        if (bg2.x + assets.imgs.bg2.width <= 0)
          bg2.x = 0;
        if (bg3.x + assets.imgs.bg3.width <= 0)
          bg3.x = 0;
    };
    
    this.reset = function(){
        sky.x=0;
        sky.y=0;
        sky.speed=0.2;
        bg1.x=0;
        bg1.y=0;
        bg1.speed=0.8;
        bg2.x=0;
        bg2.y=0;
        bg2.speed=0.4;
        bg3.x=0;
        bg3.y=0;
        bg3.speed=0.2;
        
    }
    
    return{
        draw: this.draw,
        reset: this.reset
    };
})();