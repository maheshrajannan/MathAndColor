function TextContentCoordinateGroup(textContent,fontSize,coordinate) {
    this.textContent = textContent;
    this.fontSize=fontSize;
    this.coordinate=coordinate;
    this.textCoordinate;

    this.textAdjust = function(canvas, padding) {
        console.log("text adjust");
        //left, top, right, bottom, x, y, width, height
        var canvasBounds = canvas.getBoundingClientRect();

        console.log("canvasBounds.x:" + canvasBounds.x);
        console.log("canvasBounds.left:" + canvasBounds.left);
        console.log("canvasBounds.right:" + canvasBounds.right);
        console.log("canvasBounds.top:" + canvasBounds.top);
        console.log("canvasBounds.bottom:" + canvasBounds.bottom);
        console.log("canvasBounds.y:" + canvasBounds.y);
        console.log("coordinate coordinate:" + this.coordinate.printValue());
        if ((Number(this.coordinate.x) + Number(padding) +
            canvasBounds.left) +
            Number(this.textContent.length) * 0.71 * Number(fontSize) >
            canvasBounds.right) {
            console.log("readjusted x for right bounds from x :" + this.coordinate.x);
            console.log("Number(canvasBounds.right)" +
            "- Number(padding)" +
            "- Number(canvasBounds.left)" +
            "- Number(this.textContent.length)*0.71*Number(fontSize)");
            console.log(Number(canvasBounds.right) +
            "-" + Number(padding) +
            "-" + Number(canvasBounds.left) +
            "-" + Number(this.textContent.length) * 0.71 * Number(fontSize));
            this.coordinate.x = Math.round(
            Number(canvasBounds.right) -
            Number(padding) -
            Number(canvasBounds.left) -
            Number(this.textContent.length) * 0.71 * Number(fontSize)
            );
            console.log("to :" + this.coordinate.x);
        }
        //INFO: align to left margin.
        //TODO: works correctly for large numbers, but for single digits too much spacing.                
        if (
            Number(this.coordinate.x) <
            (Number(padding))
        ) {
            console.log("readjusted x for left bounds from x :" + x);
            this.coordinate.x = Number(padding);
            console.log("to :" + this.coordinate.x);
        }
        
        console.log("( Number(y) + Number(canvasBounds.top) + Number(this.fontSize) ) > canvasBounds.bottom");
        console.log((Number(this.coordinate.y) + Number(canvasBounds.top) + Number(this.fontSize)) + " > " + canvasBounds.bottom);
        if ((Number(this.coordinate.y) + Number(canvasBounds.top) + Number(this.fontSize)) > canvasBounds.bottom) {
            console.log("readjusted y for bottom from y :" + y);
            this.coordinate.y = Math.round(
            canvasBounds.bottom - Number(canvasBounds.top) - Number(this.fontSize));
            console.log("to :" + this.coordinate.y);
        }
        //INFO: the numbers are starting somewhere in the middle, so ensuring 1 font size gap at top
        console.log("Number(y) < Number(this.fontSize)");
        if (Number(this.coordinate.y) < Number(this.fontSize)) {
            console.log("readjusted y for top from y :" + this.coordinate.y);
            this.coordinate.y = Number(this.fontSize);
            console.log("to :" + this.coordinate.y);
        }
        this.initializeTextCoordinates();
    }

    this.initializeTextCoordinates = function() {
        this.textCoordinate = new ContentCoordinate(this.coordinate.x,
            this.coordinate.y, this.textContent, this.fontSize);
        console.log("textCoordinate:" + this.textCoordinate.printValue());
    }
          
    this.getTextMinX = function(padding) {
        console.log("Number(this.coordinate.x) - Number(padding)");
        console.log(Number(this.coordinate.x) + "-" + Number(padding));
        console.log(Number(this.coordinate.x) - Number(padding));
        return Math.round(
              Number(this.coordinate.x) - Number(padding)
            );
    }
          
    this.getTextMaxX = function(padding) {
        console.log("Math.round(Number(this.coordinate.x)" +
        "Number(padding)+" +
        "Number(fontSize)*this.textContent.length*0.71");
        console.log(Number(this.coordinate.x) +
        "+" + Number(padding) +
        "+" + Number(fontSize) * this.textContent.length * 0.71);
        return Math.round(Number(this.coordinate.x) +
            Number(padding) +
            Number(fontSize) * this.textContent.length * 0.71
            );
    }
    
    this.getTextMaxY = function(padding) {
        return Math.round(Number(this.coordinate.y)
         + Number(padding) + Number(this.fontSize));
    }

    this.printValue = function() {
        return "ContentCoordinateGroup [id=" +
         this.id + "," + this.coordinate.printValue() + "," + this.textContent + "]";
    }

}