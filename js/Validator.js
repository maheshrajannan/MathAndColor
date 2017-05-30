/**
interacts with the specified field by id.
**/
function Validator() {
    this.validate = function(align) {
    	var resultAlign;
        if(align && 
        	( align === "left" || align === "right" || align === "center"
        	 || align === "justify" || align ==="initial")
            ) {
            resultAlign=align;
            } else {
            console.log("align:"+align);
            resultAlign = "right";
            }
        return resultAlign;
    }
    this.validateNumeric = function(numberInput,fieldId,fieldLabel) {
        console.log("Validating "+numberInput+":"+fieldId+":"+fieldLabel);
        //TODO: explain the regex.
        if (/\D/.test(numberInput)) {
            alert( numberInput +
             " is not a number. Please enter a valid number for "+
             fieldLabel
             +"." );
            $('#'+fieldId).focus() ;
            return false; 
        }    	
    }
}