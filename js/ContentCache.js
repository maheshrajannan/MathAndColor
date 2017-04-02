function ContentCache() {
    //TODO:move to CCGCache.
    var contentCoordinateGroupHistory=[];

    this.addToHistory= function(contentCoordinateGroup,index){
    	if(index) {
        	contentCoordinateGroupHistory[index]=contentCoordinateGroup;
    	}else {
    		contentCoordinateGroup.setId(Number(contentCoordinateGroupHistory.length+1));
    		contentCoordinateGroupHistory.push(contentCoordinateGroup);    		
    	}
    }
    this.getNextCoordinate = function() {
        if( (contentCoordinateGroupHistory)
        && contentCoordinateGroupHistory.length > 0) {
            nextCoordinateNumber = Number(contentCoordinateGroupHistory.length) + 1;
        }else{
            nextCoordinateNumber = 1;
        }
        return nextCoordinateNumber;
    }
    this.draw = function(canvas) {
        console.log("total:"+contentCoordinateGroupHistory.length);
        for (var j = 0; j < contentCoordinateGroupHistory.length; j++){
            currentContentCoordinateGroup = contentCoordinateGroupHistory[j];
            currentContentCoordinateGroup.draw(canvas);
        }    	
    }
    this.isAnyWithinLimits = function(contentCoordinateGroup) {
        var contentCoordinateGroupWithinLimits
        = contentCoordinateGroup.isAnyWithinLimits(contentCoordinateGroupHistory);
        return contentCoordinateGroupWithinLimits;
    }
}

