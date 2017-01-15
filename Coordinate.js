function Coordinate(x,y) {
    //Will become an attribute of every instance of coordinate.
    this.x=Math.round(x);
    this.y=Math.round(y);
    this.printValue=function(){
        return "Coordinate=[x="+this.x+",y="+this.y+"]";
    }
    this.getNumberX= function() {
        return Number(x);
    }
    this.getNumberY= function() {
        return Number(y);
    }
    this.setX=function(x1) {
        this.x=Math.round(x1);
    }
    this.setY=function(y1) {
        this.y=Math.round(y1);
    }
}