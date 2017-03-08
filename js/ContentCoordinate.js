/**
A content(element) at a given coordinate.
**/
function ContentCoordinate(x,y,content,fontSize) {
    this.content = content;
    this.coordinate = new Coordinate(x,y);
    this.fontSize=fontSize;
    this.draw=function(canvas,align) {
        addletter(canvas, this.content,
        this.coordinate.x, this.coordinate.y,this.fontSize,align);
    }
    this.printValue = function() {
        return "ContentCoordinate["+this.coordinate.printValue()
            +",Content:"+this.content+" at Size:"+this.fontSize+"]";
    }
}