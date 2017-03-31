        var FONT_SIZE = $('#fontSizeId').val();
        var CONTENT_TYPE_NUMERIC="Numeric";
        var CONTENT_TYPE_TEXT="Text";
        var contentCoordinateGroupHistory=[];
        var domReader = new DomReader();
        var domWriter = new DomWriter();
        var domController = new DomController();
        var currentCoordinate = new CurrentContentCoordinate();


        window.onload = function() {
            $("#bannerDivId").width(1600);   
            $("#doraImageId").attr("border","4");  
            console.log("image source is "+$("#doraImageId").attr("src"));
            console.log("image source is "+$("#doraImageId").attr("border"));
            domController.toggleAdvanced();
            onContentChange();
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

        function addToHistory(contentCoordinateGroup){
            contentCoordinateGroup.setId(Number(contentCoordinateGroupHistory.length+1));
            contentCoordinateGroupHistory.push(contentCoordinateGroup);
        }

        //ContentCanvas class.
        function erase(canvas) {
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        //Interacts with methods that Set on DOM.
        function readContent(contentCoordinateGroup) {
            if(contentCoordinateGroup.isNumeric()) {
                contentCoordinateGroup = domReader.readNumericContent(
                    contentCoordinateGroup);
            }else{
                contentCoordinateGroup = domReader.readTextContent(contentCoordinateGroup);
            }
            return contentCoordinateGroup;
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
             = contentCoordinateGroup.isAnyWithinLimits(contentCoordinateGroupHistory);
            var nextCoordinateNumber;
            if(contentCoordinateGroupWithinLimits){
                console.log("near/on existing coordinate is being clicked");
                populateExistingCordinate(contentCoordinateGroupWithinLimits);
            }else{
                if( (contentCoordinateGroupHistory)
                 && contentCoordinateGroupHistory.length > 0) {
                    nextCoordinateNumber = Number(contentCoordinateGroupHistory.length) + 1;
                }else{
                    nextCoordinateNumber = 1;
                }
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
            if(align && 
                ( align === "left" || align === "right" ||
                    align === "center" || align === "justify" ||
                     align ==="initial")
                ) {
                context.textAlign=align;
            } else {
                console.log("align:"+align);
                context.textAlign = "right";
            }
            context.fillText(letter, x, y );
        }

        //Validate the input and add text.
        //interacts With DOM
        function validateInput(contentType) {
            var letterA = $('#numberAId').val();
            //TODO: explain the regex.
             if (/\D/.test(letterA)) {
                alert( letterA + " is not a number. Please enter a valid number for A." );
                $('#numberAId').focus() ;
                return false; 
            }
            //TODO: explain regex.
            var letterB = $('#numberBId').val();                       
            if (/\D/.test(letterB)) {
                alert( letterB + " is not a number. Please enter a valid number for B." );
                $('#numberBId').focus() ;
                return false; 
            }
            addContent(contentType);
        }
        function addContent(inContentType) {
            console.log("adding content");
            //INFO: common to both contentCoordinateGroup of type text and numeric.
            var canvas = document.getElementById("myCanvas");
            var contentCoordinateGroupId=$('#contentCoordinateGroupId').val();            
            var contentType;
            
            var contentCoordinateGroupWithinLimits;
            //INFO: Editing existing coordinate.
            var currentContentCoordinateGroup;

            //INFO: specific to numeric content coordinate group.
            var contentCoordinateGroup = domReader.readContentCoordinateGroup(
                currentCoordinate.mouseCoordinate,inContentType);
            contentCoordinateGroup = readContent(contentCoordinateGroup);

            //INFO: adjust it, just in case x and y are edited.
            contentCoordinateGroup.adjust(canvas,Number(contentCoordinateGroup.fontSize)/4);

            if(contentCoordinateGroupId>0) {
                //INFO: Begin editing existing coordinate.
                console.log("Editing contentCoordinateGroupId"+contentCoordinateGroupId);
                domWriter.setPosition(contentCoordinateGroup.coordinate);
                contentCoordinateGroup.setId(contentCoordinateGroupId);
                contentCoordinateGroupHistory[contentCoordinateGroupId-1]
                =contentCoordinateGroup;
                console.log("Redrawing");
                erase(canvas);
                console.log("total:"+contentCoordinateGroupHistory.length);
                for (var j = 0; j < contentCoordinateGroupHistory.length; j++){
                    currentContentCoordinateGroup = contentCoordinateGroupHistory[j];
                    currentContentCoordinateGroup.draw(canvas);
                }
                //INFO: End of editing existing coordinate.
            }else{
                //INFO: adding a new coordinate.
                //INFO: checking if new coordinate is with in limits of any of old coordinates.
                contentCoordinateGroupWithinLimits
                 = contentCoordinateGroup.isAnyWithinLimits(contentCoordinateGroupHistory);
                if(contentCoordinateGroupWithinLimits == null) {
                    console.log("Adding new values");
                    domWriter.setPosition(contentCoordinateGroup.coordinate);
                    //TODO: do contentCoordinateGroup.draw, that does the 5 things below.
                    contentCoordinateGroup.draw(canvas);
                    addToHistory(contentCoordinateGroup);
                    console.log("total"+contentCoordinateGroupHistory.length);                
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
            onContentChange(contentCoordinateGroup.contentType);
            if(contentCoordinateGroup.isNumeric()) {
                //TODO: change dropdown and populate values...
                //TODO: repopulate A and B, only if pre-populate existing is selected. 
                //default is it is NOT selected.            
                domWriter.setNumericContent(contentCoordinateGroup);
            } else{
                domWriter.setTextContent(contentCoordinateGroup);
            }
        }
        //Sets on DOM
        function populateExistingCordinate(contentCoordinateGroupWithinLimits) {
            populateCoordinate(contentCoordinateGroupWithinLimits);
            $('#contentCoordinateGroupId').val(contentCoordinateGroupWithinLimits.id);     
            $('#contentCoordinateGroupLabelId').text("Editing #"+contentCoordinateGroupWithinLimits.id);     
            $('#editMessageDivId').text(contentCoordinateGroupWithinLimits.editReason);     
        }

        //INFO: works on DOM.
        function onContentChange(inContentType) {
            var contentType = "";
            if(inContentType) {
                contentType = inContentType;
            }else {
                contentType = $("#contentTypeId").val();
            }
            console.log("Content Type is "+contentType);
            //TODO: good to have, not must have, organize in div or field sets.
            if(contentType==="Text") {
                domController.hideNumericInputs();
                domController.showTextInputs();
            }else{
                domController.showNumericInputs();
                domController.hideTextInputs();
            }
        }
        function prefillImage() {
            console.log("prefillImage");
        }