/**
A content(element) at a given coordinate.
**/
function DomReader() {

    this.readElementValue=function(elementId){
        return $('#'+elementId).val();
    }

    this.readNumericContent = function(contentCoordinateGroup) {
        var aValue=this.readElementValue("numberAId");
        var bValue=this.readElementValue("numberBId");
        var operatorValue=this.readElementValue("operatorId");
        contentCoordinateGroup.setNumericContent(
                aValue,bValue,operatorValue);   
        return contentCoordinateGroup; 
    }
    
    //read from DOM.
    this.readTextContent = function(contentCoordinateGroup) {
        var textContent = this.readElementValue("textId");
        contentCoordinateGroup.setTextContent(textContent);
        return contentCoordinateGroup;            
    }

    //Interacts with methods that reads from DOM.
    this.readContent = function(contentCoordinateGroup) {
        if(contentCoordinateGroup.isNumeric()) {
            contentCoordinateGroup = this.readNumericContent(
                contentCoordinateGroup);
        }else{
            contentCoordinateGroup = this.readTextContent(contentCoordinateGroup);
        }
        return contentCoordinateGroup;
    }

    //Reads From DOM.
    this.readContentCoordinateGroup = function(mouseCoordinate,inContentType) {
            var fontSize=this.readElementValue("fontSizeId");
            var contentType;

            if(inContentType) {
                console.log("inContentType:"+inContentType);
                contentType = inContentType;
            }else{
                contentType =this.readElementValue("contentTypeId");
            }
            console.log("contentType:"+contentType);

            var contentCoordinateGroup = new ContentCoordinateGroup(
                mouseCoordinate.x,mouseCoordinate.y,fontSize,contentType);
            return contentCoordinateGroup;
        }

}