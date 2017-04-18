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
    this.test = function(numberInput,fieldId,fieldLabel) {
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