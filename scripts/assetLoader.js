var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var assets = (function(){
    this.imgs ={
        "bg1":"img/bg1.png",
        "bg2":"img/bg2.png",
        "bg3":"img/bg3.png",
        "sky":"img/sky.png",
        "spritesheet":"img/spritesheet.png"
    }
    var assetsDownloaded = 0;
    var imgsN = Object.keys(this.imgs).length;
    this.assetsN = imgsN;
    
    function loaded (){
        assetsDownloaded++;
        if(assetsDownloaded === imgsN){
            startGame();
        }
        
    }
    this.downloadAll = function(){
        var src;
        for (var img in this.imgs){

            if (this.imgs.hasOwnProperty(img)) {
            src = this.imgs[img];
            this.imgs[img] = new Image();
            this.imgs[img].status= "loading";
            this.imgs[img].name = img;
            this.imgs[img].onload = function(img){
               loaded.call(img) ;
            };
            this.imgs[img].src = src;
             }
        }
        
    }
    this.finished = function(){
        startGame();
    }
    return{
        imgs: this.imgs,
        assetsN: this.assetsN,
        downloadAll:  this.downloadAll,
        finished: this.finished
    }
    })();
assets.downloadAll();
