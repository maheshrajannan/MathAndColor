/**
Writes to the DOM.
**/
function DomWriter() {
    this.setNumericContent = function(contentCoordinateGroup) {
        //TODO: change dropdown and populate values...
        //TODO: repopulate A and B, only if pre-populate existing is selected. 
        //default is it is NOT selected.
        this.setElementValue('numberAId',contentCoordinateGroup.a);            
        this.setElementValue('numberBId',contentCoordinateGroup.b);            
        this.setElementValue('operatorId',contentCoordinateGroup.operator);            
        this.setElementValue('contentTypeId',contentCoordinateGroup.contentType);            
    }
    this.setTextContent = function(contentCoordinateGroup) {
        this.setElementValue('textId',contentCoordinateGroup.textContent);            
        this.setElementValue('contentTypeId',contentCoordinateGroup.contentType);            
    }
    this.setContent = function(contentCoordinateGroup) {
        if(contentCoordinateGroup.isNumeric()) {
            //TODO: change dropdown and populate values...
            //TODO: repopulate A and B, only if pre-populate existing is selected. 
            //default is it is NOT selected.            
            this.setNumericContent(contentCoordinateGroup);
        } else{
            this.setTextContent(contentCoordinateGroup);
        }
    }
    //Sets on DOM.
    this.setPosition = function(coordinate) {
        console.log("Setting position"+coordinate.printValue());
        $("#xId").val(coordinate.x);
        $("#yId").val(coordinate.y);
    }
    //Sets on DOM.
    //TODO: also focus on text input.
    this.clearAndFocusNumericInput = function(nextCoordinateNumber) {
        $("#numberAId").focus();
        this.setAddMessage(nextCoordinateNumber);
    }   

    this.setAddMessage = function(nextCoordinateNumber) {
        $("#contentCoordinateGroupId").val("-1");
        $('#contentCoordinateGroupLabelId').text("Adding "+ nextCoordinateNumber);
        $("#editMessageDivId").text("");                            
    }
    this.setElementValue=function(elementId,elementValue){
        $('#'+elementId).val(elementValue);
    }
}