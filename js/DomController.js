/**
Controls behavior.
**/
function DomController() {
    this.toggleAdvanced = function() {
        $(".fieldSet1").toggle(); 
    }
    this.showInputs = function() {
        $("#leftDivId").show();
        $("#rightDivId").show();
        $("#bannerDivId").width(1600);
    }
    this.hideInputs = function() {
        $("#leftDivId").hide();
        $("#rightDivId").hide();       
        $("#bannerDivId").width(1000);     
    }
    this.hideNumericInputs = function() {
        $("#numberAId").hide();
        $("#numberBId").hide();
        $("#operatorId").hide();
        $("#numberALabelId").hide();
        $("#numberBLabelId").hide();
        $("#operatorLabelId").hide();        
    }
    this.showNumericInputs = function() {
        $("#numberAId").show();
        $("#numberBId").show();
        $("#operatorId").show();
        $("#numberALabelId").show();
        $("#numberBLabelId").show();
        $("#operatorLabelId").show();
    }
    this.hideTextInputs = function() {
        $("#textId").hide();
        $("#textLabelId").hide();        
    }
    this.showTextInputs = function() {
        $("#textId").show();
        $("#textLabelId").show();
    }
    //INFO: works on DOM.
    this.onContentChange = function(inContentType) {
        var contentType = "";
        if(inContentType) {
            contentType = inContentType;
        }else {
            contentType = $("#contentTypeId").val();
        }
        console.log("Content Type is "+contentType);
        //TODO: good to have, not must have, organize in div or field sets.
        if(contentType==="Text") {
            this.hideNumericInputs();
            this.showTextInputs();
        }else{
            this.showNumericInputs();
            this.hideTextInputs();
        }
    }    
}