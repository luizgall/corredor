var allGameObjects = [];

function GameObject(name, type, x,y, width, height, sheet){
    this.name = name;
    this.type = type;
    this.x = x;
    this.y = y;
    this.vx  = 0;
    this.vy = 0;
    this.width = width;
    this.height = height;
    this.left = function(){
        return this.x;};
    this.top = function(){
        return this.y;};
    this.right = function(){
        return this.x + this.width;};
    this.bottom = function(){
        return this.y + this.height;}
    this.sheet = new SpriteSheet(sheet, width, height);
    this.state = "disabled";
    this.animations ={};
    allGameObjects.push(this);
}