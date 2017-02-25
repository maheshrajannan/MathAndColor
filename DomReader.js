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
}