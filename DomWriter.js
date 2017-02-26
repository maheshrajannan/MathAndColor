/**
A content(element) at a given coordinate.
**/
function DomWriter() {
    this.setNumericContent = function(contentCoordinateGroup) {
            //TODO: change dropdown and populate values...
            //TODO: repopulate A and B, only if pre-populate existing is selected. 
            //default is it is NOT selected.            
            $('#numberAId').val(contentCoordinateGroup.a);
            $('#numberBId').val(contentCoordinateGroup.b);
            $('#operatorId').val(contentCoordinateGroup.operator);
            $('#contentTypeId').val(contentCoordinateGroup.contentType);
        }
    this.setTextContent = function(contentCoordinateGroup) {
            $('#textId').val(contentCoordinateGroup.textContent);
            $('#contentTypeId').val(contentCoordinateGroup.contentType);
        }        
}