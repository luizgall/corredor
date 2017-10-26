function Vector(x,y){
    this.x = x;
    this.y = y;    
    this.setX = function(val){
        this.x = val;
    }
    this.setY = function(val){
        this.y = val;
    }
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.setAngle = function(angle){
        var length = this.getLength();
        this.x = Math.cos(angle)*length;
        this.y = Math.sin(angle)*length;
    }
    this.getAngle = function(length){
        return Math.atan2(this.y, this.x);
    }
    this.setLength = function(){
        var angle = this.getAngle();
        this.x = Math.cos(angle)*length;
        this.y = Math.sin(angle)*length;
    }
    this.getLength = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    
    this.add = function (v2){
        return new Vector(this.x+v2.x, this.y+v2.y);
    }
    this.subtract = function (v2){
        return new Vector(this.x-v2.x, this.y-v2.y);
    }
    this.multiply = function (val){
        return new Vector(this.x*val, this.y*val);
    }
    this.divide = function(val){
        return new Vector(this.x/val, this.y/val);
    }
}