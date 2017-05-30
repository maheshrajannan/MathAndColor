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

          this.textContent = "";
          this.textCoordinate;

          this.numericContentCoordinateGroup;

          this.setId = function(id) {
            this.id = id;
          }
          
          this.setNumericContent = function(a, b, operator) {
            //TODO: use inheritance for font size
            this.numericContentCoordinateGroup
             = new NumericContentCoordinateGroup(a,b,operator,this.fontSize,this.coordinate);
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

          this.setTextContent = function(textContent) {
            this.textContent = textContent;
          }
          this.adjust = function(canvas, padding) {
            if (this.isNumeric()) {
              this.numericContentCoordinateGroup.numericAdjust(canvas, padding);
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

          this.initializeCoordinates = function() {
            if (this.isNumeric()) {
              this.numericContentCoordinateGroup.initializeNumericCoordinates();
            } else {
              this.initializeTextCoordinates();
            }
          }
          this.initializeTextCoordinates = function() {
            this.textCoordinate = new ContentCoordinate(this.coordinate.x,
              this.coordinate.y, this.textContent, this.fontSize);
            console.log("textCoordinate:" + this.textCoordinate.printValue());
          }
          this.getLength = function() {
            if(this.isNumeric()) {
              return this.numericContentCoordinateGroup.getLineLength();
            }else {
              return this.textContent.length;
            }
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
              return this.numericContentCoordinateGroup.getNumericMinX(padding);
            } else {
              return this.getTextMinX(padding);
            }
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
          this.getMaxX = function(padding) {
            if (this.isNumeric()) {
              return this.numericContentCoordinateGroup.getNumericMaxX(padding);
            } else {
              return this.getTextMaxX(padding);
            }
          }
          this.getMinY = function(padding) {
            return Math.round(Number(this.coordinate.y) - Number(padding));
          }
          this.getTextMaxY = function(padding) {
            return Math.round(Number(this.coordinate.y)
             + Number(padding) + Number(this.fontSize));
          }
          this.getMaxY = function(padding) {
            if (this.isNumeric()) {
              return this.numericContentCoordinateGroup.getNumericMaxY(padding);
            } else {
              return this.getTextMaxY(padding);
            }
          }
          this.draw = function(canvas) {
            console.log("contentCoordinateGroup:" + this.printValue());
            if (this.isNumeric()) {
              console.log("Drawing numeric"
                +this.numericContentCoordinateGroup.printValue());
              this.numericContentCoordinateGroup.aCoordinate.draw(canvas);
              this.numericContentCoordinateGroup.bCoordinate.draw(canvas);
              this.numericContentCoordinateGroup.operatorCoordinate.draw(canvas);
              this.numericContentCoordinateGroup.line1Coordinate.draw(canvas);
              this.numericContentCoordinateGroup.line2Coordinate.draw(canvas);
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
            console.log(this.printValue() + " has contentRectangle: "
             + contentRectangle.printValue());
            return contentRectangle;
          }
          this.isAnyWithinLimits = function(contentCoordinateGroupHistory) {
            var contentCoordinateGroupWithinLimits = null;
            if ((contentCoordinateGroupHistory)
             && contentCoordinateGroupHistory.length > 0) {
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
              return this.numericContentCoordinateGroup.printValue();
            } else {
              return "ContentCoordinateGroup [id=" +
                this.id + "," + this.coordinate.printValue() + "," + this.textContent + "]";
            }
          }
        }