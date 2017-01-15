        //INFO:Class ContentCoordinateGroup, group text starting at a particular coordinate.
        //Say, starting at x,y display 33+40=__. 
        //Functions:
        //1. Any time it exceeds coordinates of canvas re-adjust.
        //2. Any time this falls with in range of another co-ordinate,
        //do not return the instance.
        //3. Given x,y , calculate appropriately for A,B,operator and ___ text.
        function ContentCoordinateGroup(x, y, fontSize, contentType) {
          this.coordinate = new Coordinate(x, y);
          this.fontSize = fontSize;
          this.id = -1;
          this.editReason = "";
          this.contentType = contentType;

          this.a = -1;
          this.b = -1;
          this.operator = "";

          this.aCoordinate;
          this.bCoordinate;
          this.line1Coordinate;
          this.line2Coordinate;
          this.operatorCoordinate;

          this.contentText = "";
          this.textCoordinate;

          this.setId = function(id) {
            this.id = id;
          }
          this.setA = function(a) {
            this.a = a;
          }
          this.setB = function(b) {
            this.b = b;
          }
          this.setOperator = function(operator) {
            this.operator = operator;
          }
          this.isNumeric = function(contentType) {
            if (contentType) {
              return contentType === CONTENT_TYPE_NUMERIC;
            } else {
              return this.contentType === CONTENT_TYPE_NUMERIC;
            }
          }
          this.isText = function(contentType) {
            if (contentType) {
              return contentType === CONTENT_TYPE_TEXT;
            } else {
              return this.contentType === CONTENT_TYPE_TEXT;
            }
          }
          this.setNumericContent = function(a, b, operator) {
            this.setA(a);
            this.setB(b);
            this.setOperator(operator);
          }
          this.setContentText = function(contentText) {
            this.contentText = contentText;
          }
          this.adjust = function(canvas, padding) {
            if (this.isNumeric()) {
              this.numericAdjust(canvas, padding);
            } else {
              this.textAdjust(canvas, padding);
            }
          }
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
              Number(this.contentText.length) * 0.90 * Number(fontSize) >
              canvasBounds.right) {
              console.log("readjusted x for right bounds from x :" + this.coordinate.x);
              console.log("Number(canvasBounds.right)" +
                "- Number(padding)" +
                "- Number(canvasBounds.left)" +
                "- Number(this.contentText.length)*0.90*Number(fontSize)");
              console.log(Number(canvasBounds.right) +
                "-" + Number(padding) +
                "-" + Number(canvasBounds.left) +
                "-" + Number(this.contentText.length) * 0.90 * Number(fontSize));
              this.coordinate.x = Math.round(
                Number(canvasBounds.right) -
                Number(padding) -
                Number(canvasBounds.left) -
                Number(this.contentText.length) * 0.90 * Number(fontSize)
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
            this.initializeCoordinates();
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

            //INFO: Where i click is where the coordinate of the symbol gets written.
            /**
                            33%
                            44
                            --
                            __
                            this.getMaxX=function(padding){
                                return Math.round(Number(this.coordinate.x)
                                 + Number(padding)+ (Number(fontSize)/1.5));                
                            }                
            **/
            //INFO: align to right margin.
            if ((Number(this.coordinate.x) + Number(padding) +
                (Number(fontSize) / 1.5) + canvasBounds.left) > canvasBounds.right) {
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
            if (
              Number(this.coordinate.x) <
              (Number(padding) + Number(lineLength) * 0.70 + Number(fontSize))
            ) {
              console.log("readjusted x for left bounds from x :" + x);
              this.coordinate.x = Number(padding) + Number(lineLength) * 0.70 + Number(fontSize);
              console.log("to :" + this.coordinate.x);
            }
            //INFO:Basically adjusting for
            // 32
            //+44
            //=76
            //3 font sizes,3*40=120
            console.log("( Number(y) + Number(canvasBounds.top) + (3*Number(this.fontSize)) ) > canvasBounds.bottom");
            console.log((Number(this.coordinate.y) + Number(canvasBounds.top) + (3 * Number(this.fontSize))) + " > " + canvasBounds.bottom);
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
            this.initializeCoordinates();
          }
          this.initializeCoordinates = function() {
            if (this.isNumeric()) {
              this.initializeNumericCoordinates();
            } else {
              this.initializeTextCoordinates();
            }
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
          this.initializeTextCoordinates = function() {
            this.textCoordinate = new ContentCoordinate(this.coordinate.x,
              this.coordinate.y, this.contentText, this.fontSize);
            console.log("textCoordinate:" + this.textCoordinate.printValue());
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
            ///1.5 because modulus operator is bigger.
            return Math.round(
              Number(this.coordinate.x) - Number(padding) - (Number(lineLength) * 0.70) -
              Number(this.fontSize)
            );
          }
          this.getTextMinX = function(padding) {
            console.log("Number(this.coordinate.x) - Number(padding)");
            console.log(Number(this.coordinate.x) + "-" + Number(padding));
            console.log(Number(this.coordinate.x) - Number(padding));
            return Math.round(
              Number(this.coordinate.x) - Number(padding)
            );
          }
          this.getMinX = function(padding) {
            if (this.isNumeric()) {
              return this.getNumericMinX(padding);
            } else {
              return this.getTextMinX(padding);
            }
          }
          this.getNumericMaxX = function(padding) {
            return Math.round(Number(this.coordinate.x) +
              Number(padding) + (Number(fontSize) / 1.5));
          }
          this.getTextMaxX = function(padding) {
            console.log("Math.round(Number(this.coordinate.x)" +
              "Number(padding)+" +
              "Number(fontSize)*this.contentText.length*0.80");
            console.log(Number(this.coordinate.x) +
              "+" + Number(padding) +
              "+" + Number(fontSize) * this.contentText.length * 0.90);
            return Math.round(Number(this.coordinate.x) +
              Number(padding) +
              Number(fontSize) * this.contentText.length * 0.90
            );
          }
          this.getMaxX = function(padding) {
            if (this.isNumeric()) {
              return this.getNumericMaxX(padding);
            } else {
              return this.getTextMaxX(padding);
            }
          }
          this.getMinY = function(padding) {
            return Math.round(Number(this.coordinate.y) - Number(padding));
          }
          this.getNumericMaxY = function(padding) {
            var verticalHeight = Number(this.fontSize) * Number(3.5);
            return Math.round(Number(this.coordinate.y) + Number(padding) + Number(verticalHeight));
          }
          this.getTextMaxY = function(padding) {
            return Math.round(Number(this.coordinate.y) + Number(padding) + Number(this.fontSize));
          }
          this.getMaxY = function(padding) {
            if (this.isNumeric()) {
              return this.getNumericMaxY(padding);
            } else {
              return this.getTextMaxY(padding);
            }
          }
          this.draw = function(canvas) {
            console.log("contentCoordinateGroup:" + this.printValue());
            if (this.isNumeric()) {
              console.log("Drawing numeric");
              this.aCoordinate.draw(canvas);
              this.bCoordinate.draw(canvas);
              this.operatorCoordinate.draw(canvas);
              this.line1Coordinate.draw(canvas);
              this.line2Coordinate.draw(canvas);
            } else {
              console.log("Drawing text");
              this.textCoordinate.draw(canvas, "left");
            }
          }
          this.getContentRectangle = function(padding) {
            var contentRectangle = new ContentRectangle(
              this.getMinX(padding),
              this.getMinY(padding),
              this.getMaxX(padding),
              this.getMaxY(padding)
            );
            console.log(this.printValue() + " has contentRectangle: " + contentRectangle.printValue());
            return contentRectangle;
          }
          this.isAnyWithinLimits = function(contentCoordinateGroupHistory) {
            var contentCoordinateGroupWithinLimits = null;
            if ((contentCoordinateGroupHistory) && contentCoordinateGroupHistory.length > 0) {
              for (var j = 0; j < contentCoordinateGroupHistory.length; j++) {
                console.log("Checking " +
                  contentCoordinateGroupHistory[j].printValue() + " with " + this.printValue());
                //TODO: do whether the clicked coordinates are with in limits, on click, instead of
                //doing it on click of "Done" button
                withinLimits = contentCoordinateGroupHistory[j].isWithinLimits(this);
                if (withinLimits) {
                  console.log("With in limits:" + withinLimits);
                  contentCoordinateGroupWithinLimits = contentCoordinateGroupHistory[j];
                  j = contentCoordinateGroupHistory.length;
                }
              }
            }
            return contentCoordinateGroupWithinLimits;
          }
          //TODO:Bug, texts are too far spaced from each other.
          //TODO:Bug: When clicking on right most corner, it exceeds.            
          this.isWithinLimits = function(contentCoordinateGroup) {
            console.log("checking :" + this.printValue() +
              "against contentCoordinateGroup:" + contentCoordinateGroup.printValue());
            var withinLimits = false;
            var contentRectangle = this.getContentRectangle(Math.round(Number(this.fontSize) / 4));
            var newContentRectagle = contentCoordinateGroup.getContentRectangle(Math.round(Number(contentCoordinateGroup.fontSize) / 4));
            console.log("Comparing this" + contentRectangle.printValue() + "with" + newContentRectagle.printValue());
            withinLimits = contentRectangle.isRectangleWithInLimits(newContentRectagle);
            return withinLimits;
          }
          this.printValue = function() {
            if (this.isNumeric()) {
              return "ContentCoordinateGroup [id=" +
                this.id + "," + this.coordinate.printValue() +
                "," + this.aCoordinate.content + this.operatorCoordinate.content + this.bCoordinate.content + "=?]";
            } else {
              return "ContentCoordinateGroup [id=" +
                this.id + "," + this.coordinate.printValue() + "," + this.contentText + "]";
            }
          }
        }