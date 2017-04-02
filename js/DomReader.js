/**
A content(element) at a given coordinate.
**/
function DomReader() {
    this.readNumericContent = function(contentCoordinateGroup) {
        var aValue=$("#numberAId").val();
        var bValue=$("#numberBId").val();
        var operatorValue=$("#operatorId").val();
        contentCoordinateGroup.setNumericContent(
                aValue,bValue,operatorValue);   
        return contentCoordinateGroup; 
    }
    
    //read from DOM.
    this.readTextContent = function(contentCoordinateGroup) {
        var textContent = $("#textId").val();
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
            var fontSize=$("#fontSizeId").val();
            var contentType;

            if(inContentType) {
                console.log("inContentType:"+inContentType);
                contentType = inContentType;
            }else{
                contentType =$('#contentTypeId').val();
            }
            console.log("contentType:"+contentType);

            var contentCoordinateGroup = new ContentCoordinateGroup(
                mouseCoordinate.x,mouseCoordinate.y,fontSize,contentType);
            return contentCoordinateGroup;
        }

}