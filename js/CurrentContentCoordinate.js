function CurrentContentCoordinate(x,y,content,fontSize) {
    //TODO: rename to CurrentCoordinate
    var mouseCoordinate;
    //Sets on DOM.
    //INFO: by pass all checks and modify x coordinate.
    this.modifyXCoordinate = function() {
        //TODO: use reader here.
        var newX=$('#xId').val();
        console.log("Changing mouse position"
            + mouseCoordinate.printValue() + " to "+newX);
        mouseCoordinate.setX(newX);
        console.log("Changing mouse position" + mouseCoordinate.printValue());
        $('#numberAId').val();
    }

    //Sets on DOM.
    //INFO: by pass all checks and modify y coordinate.
    this.modifyYCoordinate = function() {
        var newY=$('#yId').val();
        console.log("Changing mouse position" + mouseCoordinate.printValue());
        mouseCoordinate.setY(newY);
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
    this.setMouseCoordinate=function(canvas,evt){
        this.mouseCoordinate = this.getMouseCoordinate(canvas,evt);
    }
}