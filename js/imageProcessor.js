        var FONT_SIZE = $('#fontSizeId').val();
        var CONTENT_TYPE_NUMERIC="Numeric";
        var CONTENT_TYPE_TEXT="Text";
        var domReader = new DomReader();
        var domWriter = new DomWriter();
        var domController = new DomController();
        var currentCoordinate = new CurrentContentCoordinate();
        var contentCache = new ContentCache();
        var validator =new Validator();

        window.onload = function() {
            $("#bannerDivId").width(1600);   
            $("#doraImageId").attr("border","4");  
            console.log("image source is "+$("#doraImageId").attr("src"));
            console.log("image source is "+$("#doraImageId").attr("border"));
            domController.toggleAdvanced();
            domController.onContentChange();
        };
        //INFO: outside of onload

        $("div#leftDivId img").click(function () {
            $("div#leftDivId img").attr("border","0");
            $(this).attr("border","4");
            console.log("image source is "+$(this).attr("src"));
            //TODO: what is this for ?
            //$("input#image_from_list").val($(this).attr("col"));
            $('#bkImage').attr('src',$(this).attr("src"));
            //Change title
            $("#mainTitleId").html($(this).attr("col"));
        }); 

        //ContentCanvas class.
        function erase(canvas) {
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        //INFO: capture the last coordinate of mouse, by mouse listener.
        //on key down, write to the last known coordinate of the mouse.
        function mouseMoveHandler(canvas, event) {
            domController.showInputs();
            currentCoordinate.setMouseCoordinate(canvas, event);
            var contentCoordinateGroup = domReader.readContentCoordinateGroup(
                currentCoordinate.mouseCoordinate);
            if(contentCoordinateGroup.isNumeric()) {
                contentCoordinateGroup
                 = domReader.readNumericContent(contentCoordinateGroup);
            }else{
                contentCoordinateGroup
                 = domReader.readTextContent(contentCoordinateGroup);
            }
            contentCoordinateGroup.adjust(canvas,
                Number(contentCoordinateGroup.fontSize)/4);
            var contentCoordinateGroupWithinLimits
             = contentCache.isAnyWithinLimits(contentCoordinateGroup);
            var nextCoordinateNumber;
            if(contentCoordinateGroupWithinLimits){
                console.log("near/on existing coordinate is being clicked");
                populateExistingCordinate(contentCoordinateGroupWithinLimits);
            }else{
                nextCoordinateNumber = contentCache.getNextCoordinate();
                console.log("new coordinate is being clicked");
                domWriter.setPosition(contentCoordinateGroup.coordinate);
                //TODO: check for overlap.
                domWriter.clearAndFocusNumericInput(nextCoordinateNumber);
            }
        }

        //INFO:Instead of adding it on load, if we add it as event based on canvas element,
        //then it can be re-used across pages.
        //Later this can also be made data driven.
        //canvas.addEventListener("keyup", keyUpHandler, true);
        //canvas.addEventListener('mousemove',mouseMoveHandler,true);

        //ContentCanvas
        function addletter(canvas, letter, x, y,fontSize,align) {
            var context = canvas.getContext("2d");
            context.font = fontSize+"pt Calibri";
            context.textAlign = validator.validate(align);
            context.fillText(letter, x, y );
        }
        //Validate the input and add text.
        //interacts With DOM
        //TODO: move this to validator.
        function validateInput(contentType) {
            var letterA = $('#numberAId').val();
            validator.validateNumeric(letterA,'numberAId','A');
            var letterB = $('#numberBId').val();
            validator.validateNumeric(letterB,'numberBId','B');
            addContent(contentType);
        }
        function modifyXCoordinate() {
            //TODO: get ride of this wrapper calls.
            console.log("modifyXCoordinate");
            currentCoordinate.modifyXCoordinate();
            this.validateInput();
        }        
        function modifyYCoordinate() {
            //TODO: get ride of this wrapper calls.
            console.log("modifyYCoordinate");
            currentCoordinate.modifyYCoordinate();
            this.validateInput();
        }        
        function addContent(inContentType) {
            console.log("adding content"+inContentType);
            //INFO: common to both contentCoordinateGroup of type text and numeric.
            var canvas = document.getElementById("myCanvas");
            var contentCoordinateGroupId=Number($('#contentCoordinateGroupId').val()); 
            console.log("contentCoordinateGroupId:"+contentCoordinateGroupId);           
            console.log("contentCoordinateGroupId:"+(contentCoordinateGroupId>0));           
            var contentType;
            
            var contentCoordinateGroupWithinLimits;
            //INFO: Editing existing coordinate.
            var currentContentCoordinateGroup;

            //INFO: specific to numeric content coordinate group.
            var contentCoordinateGroup = domReader.readContentCoordinateGroup(
                currentCoordinate.mouseCoordinate,inContentType);
            contentCoordinateGroup = domReader.readContent(contentCoordinateGroup);
            //console.log("contentCoordinateGroup:"+contentCoordinateGroup.printValue());           

            //INFO: adjust it, just in case x and y are edited.
            contentCoordinateGroup.adjust(canvas,Number(contentCoordinateGroup.fontSize)/4);
            console.log(
                "After adjusting contentCoordinateGroup:"
                +contentCoordinateGroup.printValue());           

            if(contentCoordinateGroupId > 0) {
                //INFO: Begin editing existing coordinate.
                console.log("Editing contentCoordinateGroupId"+contentCoordinateGroupId);
                domWriter.setPosition(contentCoordinateGroup.coordinate);
                contentCoordinateGroup.setId(contentCoordinateGroupId);
                contentCache.addToHistory(contentCoordinateGroup,contentCoordinateGroupId);
                console.log("Redrawing");
                //TODO: move erase also.
                erase(canvas);
                contentCache.draw(canvas);
                //INFO: End of editing existing coordinate.
            }else{
                //INFO: adding a new coordinate.
                //INFO: checking if new coordinate is with in limits of any of old coordinates.
                contentCoordinateGroupWithinLimits
                 = contentCache.isAnyWithinLimits(contentCoordinateGroup);
                if(contentCoordinateGroupWithinLimits == null) {
                    console.log("Adding new values");
                    domWriter.setPosition(contentCoordinateGroup.coordinate);
                    //TODO: do contentCoordinateGroup.draw, that does the 5 things below.
                    contentCoordinateGroup.draw(canvas);
                    contentCache.addToHistory(contentCoordinateGroup);
                }else {
                    console.log("New value is existing value, so Populating existing values");
                    contentCoordinateGroupWithinLimits.editReason
                    ="Because Space for 1 digit, instead of "+
                     contentCoordinateGroup.getLength() +
                      " digits.";
                    //INFO: populate x,y a,b,operator and TODO: id.
                    populateExistingCordinate(contentCoordinateGroupWithinLimits);
                }
            }
        }
        //INFO: calls methods that set on dom.
        function populateCoordinate(contentCoordinateGroup) {
            domWriter.setPosition(contentCoordinateGroup.coordinate);
            //TODO: this belongs to DOMController
            domController.onContentChange(contentCoordinateGroup.contentType);
            domWriter.setContent(contentCoordinateGroup);
        }
        //Sets on DOM
        function populateExistingCordinate(contentCoordinateGroupWithinLimits) {
            populateCoordinate(contentCoordinateGroupWithinLimits);
            //TODO: this belongs to domWriter
            $('#contentCoordinateGroupId').val(contentCoordinateGroupWithinLimits.id);     
            $('#contentCoordinateGroupLabelId').text("Editing #"+contentCoordinateGroupWithinLimits.id);     
            $('#editMessageDivId').text(contentCoordinateGroupWithinLimits.editReason);     
        }

        function prefillImage() {
            console.log("prefillImage");
        }