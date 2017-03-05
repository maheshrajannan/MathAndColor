/**
A content(element) at a given coordinate.
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
}