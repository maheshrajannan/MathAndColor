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

          this.numericContentCoordinateGroup;
          this.textContentCoordinateGroup;

          this.setId = function(id) {
            this.id = id;
          }
          
          this.setNumericContent = function(a, b, operator) {
            //TODO: use inheritance for font size
            this.numericContentCoordinateGroup
             = new NumericContentCoordinateGroup(a,b,operator,this.fontSize,this.coordinate);
          }
          this.setTextContent = function(textContent) {
            this.textContentCoordinateGroup=new TextContentCoordinateGroup(
              textContent,this.fontSize,this.coordinate);
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

          this.adjust = function(canvas, padding) {
            if (this.isNumeric()) {
              this.numericContentCoordinateGroup.numericAdjust(canvas, padding);
            } else {
              this.textContentCoordinateGroup.textAdjust(canvas, padding);
            }
          }

          this.initializeCoordinates = function() {
            if (this.isNumeric()) {
              this.numericContentCoordinateGroup.initializeNumericCoordinates();
            } else {
              this.textContentCoordinateGroup.initializeTextCoordinates();
            }
          }

          this.getLength = function() {
            if(this.isNumeric()) {
              return this.numericContentCoordinateGroup.getLineLength();
            }else {
              return this.textContentCoordinateGroup.textContent.length;
            }
          }


          this.getMinX = function(padding) {
            if (this.isNumeric()) {
              return this.numericContentCoordinateGroup.getNumericMinX(padding);
            } else {
              return this.textContentCoordinateGroup.getTextMinX(padding);
            }
          }

          this.getMaxX = function(padding) {
            if (this.isNumeric()) {
              return this.numericContentCoordinateGroup.getNumericMaxX(padding);
            } else {
              return this.textContentCoordinateGroup.getTextMaxX(padding);
            }
          }
          this.getMinY = function(padding) {
            return Math.round(Number(this.coordinate.y) - Number(padding));
          }
          this.getMaxY = function(padding) {
            if (this.isNumeric()) {
              return this.numericContentCoordinateGroup.getNumericMaxY(padding);
            } else {
              return this.textContentCoordinateGroup.getTextMaxY(padding);
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
              this.textContentCoordinateGroup.textCoordinate.draw(canvas, "left");
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
              return this.textContentCoordinateGroup.printValue();
            }
          }
}