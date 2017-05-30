//INFO:Class ContentCoordinateGroup, group text starting at a particular coordinate.
//Say, starting at x,y display 33+40=__. 
//Functions:
//1. Any time it exceeds coordinates of canvas re-adjust.
//2. Any time this falls with in range of another co-ordinate,
//do not return the instance.
//3. Given x,y , calculate appropriately for A,B,operator and ___ text.
function NumericContentCoordinateGroup(a, b, operator,fontSize,coordinate) {
    this.a = a;
    this.b = b;
    this.operator = operator;
    //TODO: use inheritance for fontsize,coordinate
    this.fontSize=fontSize;
    this.coordinate=coordinate;

	this.aCoordinate;
    this.bCoordinate;
    this.line1Coordinate;
    this.line2Coordinate;
    this.operatorCoordinate;
    
    this.setA = function(a) {
        this.a = a;
    }
    
    this.setB = function(b) {
        this.b = b;
    }
    
    this.setOperator = function(operator) {
        this.operator = operator;
    }

    this.setNumericContent = function(a, b, operator) {
        this.setA(a);
        this.setB(b);
        this.setOperator(operator);
    }

    this.numericAdjust = function(canvas, padding) {
        console.log("Numeric adjust");
        //INFO: Calculate space taken by 40 px character.
        var delta = Number(Number(this.fontSize) * (Math.max(this.a.length, this.b.length)));
        var max = Number(Math.max(this.a.length, this.b.length));
        //left, top, right, bottom, x, y, width, height
        var canvasBounds = canvas.getBoundingClientRect();
        var lineLength = Number(this.fontSize) * Number(this.getLineLength());

        console.log("canvasBounds.x:" + canvasBounds.x);
        console.log("canvasBounds.left:" + canvasBounds.left);
        console.log("canvasBounds.right:" + canvasBounds.right);
        console.log("delta: " + fontSize + "*(Math.max(a.length,b.length)):" +
          delta);
        console.log("lineLength:" + lineLength);
        console.log("canvasBounds.top:" + canvasBounds.top);
        console.log("canvasBounds.bottom:" + canvasBounds.bottom);
        console.log("canvasBounds.y:" + canvasBounds.y);
        console.log("coordinate coordinate:" + this.coordinate.printValue());

        //INFO: Where i click is where the coordinate of the last digit gets written.
        /**
        33%
        44
        --
        __
    	this.getNumericMaxX = function(padding) {
    	    return Math.round(Number(this.coordinate.x) +
            Number(padding) + Number(fontSize));
        }              
        **/
        
        //INFO: align to right margin.
        if ((Number(this.coordinate.x) + Number(padding) +
            Number(fontSize) + canvasBounds.left) > canvasBounds.right) {
            
            console.log("readjusted x for right bounds from x :" + this.coordinate.x);
            console.log("Number(canvasBounds.right)" +
                "- Number(padding) -" +
                "- (Number(fontSize)/1.5) - canvasBounds.left");
            console.log(Number(canvasBounds.right) +
                "-" + Number(padding) + "-" +
                (Number(fontSize) / 1.5) + "-" + canvasBounds.left);
            this.coordinate.x = Math.round(
                Number(canvasBounds.right) -
                Number(padding) -
                (Number(fontSize) / 1.5) - Number(canvasBounds.left));
              console.log("to :" + this.coordinate.x);
        }
            //INFO: align to left margin.
            //TODO: works correctly for large numbers, but for single digits too much spacing.  
            /**
            this.getNumericMinX = function(padding) {
            	var lineLength = Number(fontSize) * Number(this.getLineLength());
            	return Math.round(
              	Number(this.coordinate.x) - Number(padding) - (Number(lineLength) * 0.70)
            	);
            }
            **/              
        if (
            Number(this.coordinate.x) <
            (Number(padding) + Number(lineLength) * 0.70 )
        ) {
            console.log("readjusted x for left bounds from x :" + x);
            this.coordinate.x = Number(padding) + Number(lineLength) * 0.70;
            console.log("to :" + this.coordinate.x);
        }
        
        //INFO:Basically adjusting for
        // 32
        //+44
        //=76
        //3 font sizes,3*40=120
        
        console.log(
        	"( Number(y) + Number(canvasBounds.top) + (3*Number(this.fontSize)) ) > canvasBounds.bottom");
        console.log(
        	(Number(this.coordinate.y) + Number(canvasBounds.top) + (3 * Number(this.fontSize))) + " > " + canvasBounds.bottom);
        if ((Number(this.coordinate.y) + Number(canvasBounds.top) + (3 * Number(this.fontSize))) > canvasBounds.bottom) {
        	console.log("readjusted y for bottom from y :" + y);
            this.coordinate.y = canvasBounds.bottom - Number(canvasBounds.top) - (3 * Number(this.fontSize));
            console.log("to :" + this.coordinate.y);
        }
            
        //INFO: the numbers are starting somewhere in the middle, so ensuring 1 font size gap at top
        console.log("( Number(y) + Number(canvasBounds.top) - Number(this.fontSize) ) < canvasBounds.top");
        console.log((Number(this.coordinate.y) + Number(canvasBounds.top) - Number(this.fontSize)) + " < " + canvasBounds.top);
        if ((Number(this.coordinate.y) + Number(canvasBounds.top) - Number(this.fontSize)) < canvasBounds.top) {
            console.log("readjusted y for top from y :" + this.coordinate.y);
            this.coordinate.y = canvasBounds.top - Number(canvasBounds.top) + Number(this.fontSize);
            console.log("to :" + this.coordinate.y);
        }
        this.initializeNumericCoordinates();
    }
          
    this.initializeNumericCoordinates = function() {
        this.aCoordinate = new ContentCoordinate(this.coordinate.x,
        this.coordinate.y, this.a, this.fontSize);
        console.log("aCoordinate:" + this.aCoordinate.printValue());

        this.bCoordinate = new ContentCoordinate(this.coordinate.x,
        	(Number(this.coordinate.y) + Number(this.fontSize)), this.b, this.fontSize);
        console.log("bCoordinate:" + this.bCoordinate.printValue());

        this.line1Coordinate = new ContentCoordinate(
        this.coordinate.x,
        (Number(this.coordinate.y) + (Number(1.25) * Number(this.fontSize))),
        this.getLine(), this.fontSize
        );
            
        console.log("line1Coordinate:" + this.line1Coordinate.printValue());

        this.line2Coordinate = new ContentCoordinate(
        	this.coordinate.x,
            (Number(this.coordinate.y) + (Number(2.5) * Number(this.fontSize))),
            this.getLine(), this.fontSize
        );
            
        console.log("line2Coordinate:" + this.line2Coordinate.printValue());

        var x1 = Number(this.coordinate.x) + Number(this.fontSize);
        var y1 = Number(this.coordinate.y) + Number(this.fontSize) / 2;
        
        this.operatorCoordinate = new ContentCoordinate(
        	x1, y1,
            this.operator, this.fontSize
        );
        
        console.log("operatorCoordinate:" + this.operatorCoordinate.printValue());
    }
	
	this.getLineLength = function() {
        var lineLength = Math.max(this.a.length, this.b.length);
        console.log("Line Length a or b:" + lineLength);
        return lineLength;
    }

    this.getLine = function() {
        //TODO: Note, you may have to bind "this" to correct object instance.
        //to avoid confusion with in js.
        var lineLength = this.getLineLength();
        var line = "";
        while (lineLength > 0) {
            line = line + "_";
            lineLength = lineLength - 1;
        }
        return line;
    }
    
    this.getNumericMinX = function(padding) {
        var lineLength = Number(fontSize) * Number(this.getLineLength());
        return Math.round(
          Number(this.coordinate.x) - Number(padding) - (Number(lineLength) * 0.70)
        );
    }
	
	this.getNumericMaxX = function(padding) {
        return Math.round(Number(this.coordinate.x) +
          Number(padding) + (Number(fontSize) / 1.5));
    }
    
    this.getNumericMaxY = function(padding) {
        var verticalHeight = Number(this.fontSize) * Number(3.5);
        return Math.round(Number(this.coordinate.y) + Number(padding) + Number(verticalHeight));
    }
    
    this.printValue = function() {
        return "ContentCoordinateGroup [id=" +
        this.id + "," + this.coordinate.printValue() +
        "," + this.aCoordinate.content +
        this.operatorCoordinate.content +
        this.bCoordinate.content + "=?]";
    }
}