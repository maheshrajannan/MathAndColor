function CurrentContentCoordinate() {
    //TODO: rename to CurrentCoordinate
    var mouseCoordinate;
    //Sets on DOM.
    //INFO: by pass all checks and modify x coordinate.
    this.modifyXCoordinate = function() {
        //TODO: use reader here.
        console.log("Changing mouse position");
        setNewMouseCoordinate(($('#xId').val()),($('#yId').val()));
        console.log("Changing mouse position" + mouseCoordinate.printValue());
    }

    //Sets on DOM.
    //INFO: by pass all checks and modify y coordinate.
    this.modifyYCoordinate = function() {
        console.log("Changing mouse position,y");
        this.setNewMouseCoordinate(($('#xId').val()),($('#yId').val()));
        console.log("Changing mouse position" + mouseCoordinate.printValue());
    }
    /**
    ContentCanvas
    http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    **/
    this.getMouseCoordinate = function(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - rect.left);
        var y = Math.round(evt.clientY - rect.top);
        var coordinate = new Coordinate(x,y);
        console.log("Returning mouseCoordinate"+coordinate.printValue());
        return coordinate;
    }
    this.getNewMouseCoordinate = function(x,y){
        var coordinate = new Coordinate(x,y);
        console.log("Returning mouseCoordinate"+coordinate.printValue());
        return coordinate;
    }
    this.setMouseCoordinate=function(canvas,evt){
        this.mouseCoordinate = this.getMouseCoordinate(canvas,evt);
    }
    this.setNewMouseCoordinate=function(x,y){
        console.log("Setting x="+x);
        console.log("Setting y="+y);
        this.mouseCoordinate = this.getNewMouseCoordinate(x,y);
    }
}