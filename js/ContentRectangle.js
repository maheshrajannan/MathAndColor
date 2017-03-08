        function ContentRectangle(minX, minY, maxX, maxY) {
          //top left coordinate.
          this.min = new Coordinate(minX, minY);
          //bottom right coordinate.
          this.max = new Coordinate(maxX, maxY);
          this.isRectangleWithInXLimits = function(newRect) {
            var withinLimits = false;
            /**
            this.minx.x<=new.min.x<=this.max.x . New rectangle is to the right
            new.minx.x<=this.min.x<=new.max.x . New rectangle is to the left.
            INFO:Refer word document for explanation.
            **/
            if (
              ((this.min.x <= newRect.min.x) && (this.max.x >= newRect.min.x)) ||
              ((this.min.x <= newRect.max.x) && (this.min.x >= newRect.min.x))
            ) {
              console.log(this.printValue() + " is with in x limits of " + newRect.printValue());
              withinLimits = true;
            }
            return withinLimits;
          }
          this.isRectangleWithInYLimits = function(newRect) {
            var withinLimits = false;
            /**
            new.min.y <= this.min.y <= new.max.y. new rectangle is on top.
            this.min.y <= new.min.y <= this.max.y.new rectangle is on bottom.
            **/
            if (
              ((this.min.y >= newRect.min.y) && (this.min.y <= newRect.max.y)) ||
              ((this.min.y <= newRect.min.y) && (this.max.y >= newRect.min.y))
            ) {
              console.log(this.printValue() + " is with in y limits of " + newRect.printValue());
              withinLimits = true;
            }
            return withinLimits;
          }
          this.isRectangleWithInLimits = function(newRect) {
            var withinLimits = this.isRectangleWithInXLimits(newRect);
            if (withinLimits && withinLimits === true) {
              withinLimits = this.isRectangleWithInYLimits(newRect);
            }
            return withinLimits;
          }
          this.printValue = function() {
            return "ContentRectangle[Min=" + this.min.printValue() + ",Max=" + this.max.printValue() + "]";
          }
        }