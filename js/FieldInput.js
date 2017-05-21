/**
Reads a value from an user entered input field.
**/
function FieldInput(fieldId1,fieldType1,fieldLabel1) {
	//say 33,44 
	var fieldValue;
	//say numberAId
	var fieldId=fieldId1;
	//say A
	var fieldLabel=fieldLabel1;
	//say Numeric
	var fieldType=fieldType1;
	//say true or false.
	var valid=false;

	var FIELD_TYPE_NUMERIC="Numeric";

	var FIELD_TYPE_TEXT="Text";

	var domReader = new DomReader();
	var validator = new Validator();
    this.readFieldValue = function() {
    	this.fieldValue=domReader.readElementValue(fieldId);
    }
    this.isNumeric = function() {
    	return (this.fieldType === this.FIELD_TYPE_NUMERIC);
    }
    this.read = function() {
    	this.readFieldValue();
    	if(this.isNumeric()){
    		valid = validator.validateNumeric(
    			this.fieldValue,this.fieldId,this.fieldLabel
    			);
    	}
    }
    this.printValue = function() {
        return "FieldInput["
        	+"fieldId:"+this.fieldId
            +",fieldLabel:"+this.fieldLabel
            +",fieldType:"+this.fieldType
			+",fieldValue:"+this.fieldValue
			+",valid:"+this.valid
            +"]";
    }
}