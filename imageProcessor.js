        var FONT_SIZE = $('#fontSizeId').val();
        var CONTENT_TYPE_NUMERIC="Numeric";
        var CONTENT_TYPE_TEXT="Text";
        var mouseCoordinate;
        var contentCoordinateGroupHistory=[];


        window.onload = function() {
            $("#bannerDivId").width(1600);     
            toggleAdvanced();
            onContentChange();
        };
        //INFO: outside of onload

        $("div#leftDivId img").click(function () {
            $("div#leftDivId img").attr("border","0");
            $(this).attr("border","4");
            $("input#image_from_list").val($(this).attr("col"));
            $('#bkImage').attr('src',$(this).attr("col"));
        }); 

        function toggleAdvanced(){
            $(".fieldSet1").toggle(); 
        }

        function addToHistory(contentCoordinateGroup){
            contentCoordinateGroup.setId(Number(contentCoordinateGroupHistory.length+1));
            contentCoordinateGroupHistory.push(contentCoordinateGroup);
        }

        //ContentCanvas class.
        function erase(canvas) {
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        //INFO: capture the last coordinate of mouse, by mouse listener.
        //on key down, write to the last known coordinate of the mouse.
        function mouseMoveHandler(canvas, event) {
            showInputs();
            mouseCoordinate = getMouseCoordinate(canvas, event);
            console.log("clicked at "+mouseCoordinate.printValue());
            var fontSize=$("#fontSizeId").val();
            var contentType=$("#contentTypeId").val();
            var contentCoordinateGroup = new ContentCoordinateGroup(
                mouseCoordinate.x,mouseCoordinate.y,fontSize,contentType);
            if(contentCoordinateGroup.isNumeric()) {
                var aValue=$("#numberAId").val();
                var bValue=$("#numberBId").val();
                var operatorValue=$("#operatorId").val();
                contentCoordinateGroup.setNumericContent(aValue,bValue,operatorValue);            
            }else{
                var contentText = $("#textId").val();
                contentCoordinateGroup.setContentText(contentText);
            }
            contentCoordinateGroup.adjust(canvas,Number(fontSize)/4);
            var contentCoordinateGroupWithinLimits = contentCoordinateGroup.isAnyWithinLimits(contentCoordinateGroupHistory);
            var nextCoordinateNumber;
            if(contentCoordinateGroupWithinLimits){
                console.log("near/on existing coordinate is being clicked");
                populateExistingCordinate(contentCoordinateGroupWithinLimits);
            }else{
                if( (contentCoordinateGroupHistory) && contentCoordinateGroupHistory.length > 0) {
                    nextCoordinateNumber = Number(contentCoordinateGroupHistory.length) + 1;
                }else{
                    nextCoordinateNumber = 1;
                }
                console.log("new coordinate is being clicked");
                $("#xId").val(contentCoordinateGroup.coordinate.x);
                $("#yId").val(contentCoordinateGroup.coordinate.y);
                //TODO: check for overlap.
                $("#numberAId").focus();
                $("#contentCoordinateGroupId").val("-1");
                $('#contentCoordinateGroupLabelId').text("Adding "+ nextCoordinateNumber);
                $("#editMessageDivId").text("");                
            }
        }
        /**
        ContentCanvas
        http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
        **/
        function getMouseCoordinate(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            var x = Math.round(evt.clientX - rect.left);
            var y = Math.round(evt.clientY - rect.top);
            var coordinate = new Coordinate(x,y);
            return coordinate;
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
        function validateInput() {
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
            addContent();
        }
        function addContent() {
            console.log("adding content");
            //INFO: common to both contentCoordinateGroup of type text and numeric.
            var x=$('#xId').val();
            var y=$('#yId').val();
            var fontSize = $('#fontSizeId').val();
            var canvas = document.getElementById("myCanvas");
            var contentCoordinateGroupId=$('#contentCoordinateGroupId').val();
            var contentType=$('#contentTypeId').val();
            var contentCoordinateGroupWithinLimits;
            //INFO: Editing existing coordinate.
            var currentContentCoordinateGroup;

            //INFO: specific to numeric content coordinate group.

            var contentCoordinateGroup = new ContentCoordinateGroup(x,y,fontSize,contentType);
            if(contentCoordinateGroup.isNumeric()) {
                var letterA = $('#numberAId').val();
                var letterB = $('#numberBId').val();
                var operator = $('#operatorId').val();
                contentCoordinateGroup.setNumericContent(letterA,letterB,operator);
            }else{
                var contentText = $('#textId').val();
                contentCoordinateGroup.setContentText(contentText);
            }
            //INFO: adjust it, just in case x and y are edited.
            contentCoordinateGroup.adjust(canvas,Number(fontSize)/4);

            if(contentCoordinateGroupId>0) {
                console.log("Editing contentCoordinateGroupId"+contentCoordinateGroupId);
                x=contentCoordinateGroup.coordinate.x;
                y=contentCoordinateGroup.coordinate.y;
                $('#xId').val(x);
                $('#yId').val(y);            
                contentCoordinateGroup.setId(contentCoordinateGroupId);
                contentCoordinateGroupHistory[contentCoordinateGroupId-1]=contentCoordinateGroup;
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
                contentCoordinateGroupWithinLimits = contentCoordinateGroup.isAnyWithinLimits(contentCoordinateGroupHistory);
                if(contentCoordinateGroupWithinLimits == null) {
                    console.log("Adding new values");
                    x=contentCoordinateGroup.coordinate.x;
                    y=contentCoordinateGroup.coordinate.y;
                    $('#xId').val(x);
                    $('#yId').val(y);            
                    //TODO: do contentCoordinateGroup.draw, that does the 5 things below.
                    contentCoordinateGroup.draw(canvas);
                    addToHistory(contentCoordinateGroup);
                    console.log("total"+contentCoordinateGroupHistory.length);                
                }else {
                    console.log("New value is existing value, so Populating existing values");
                    contentCoordinateGroupWithinLimits.editReason="Because Space for 1 digit, instead of "+ contentCoordinateGroup.getLineLength() + " digits.";
                    //INFO: populate x,y a,b,operator and TODO: id.
                    populateExistingCordinate(contentCoordinateGroupWithinLimits);
                }
            }
        }
        function populateCoordinate(contentCoordinateGroup) {
            $('#xId').val(contentCoordinateGroup.coordinate.x);
            $('#yId').val(contentCoordinateGroup.coordinate.y);
            onContentChange(contentCoordinateGroup.contentType);
            if(contentCoordinateGroup.isNumeric()) {
                //TODO: change dropdown and populate values...
                //TODO: repopulate A and B, only if pre-populate existing is selected. 
                //default is it is NOT selected.            
                $('#numberAId').val(contentCoordinateGroup.a);
                $('#numberBId').val(contentCoordinateGroup.b);
                $('#operatorId').val(contentCoordinateGroup.operator);
                $('#contentTypeId').val(contentCoordinateGroup.contentType);
            } else{
                $('#textId').val(contentCoordinateGroup.contentText);
                $('#contentTypeId').val(contentCoordinateGroup.contentType);
            }
        }
        function populateExistingCordinate(contentCoordinateGroupWithinLimits) {
            populateCoordinate(contentCoordinateGroupWithinLimits);
            $('#contentCoordinateGroupId').val(contentCoordinateGroupWithinLimits.id);     
            $('#contentCoordinateGroupLabelId').text("Editing #"+contentCoordinateGroupWithinLimits.id);     
            $('#editMessageDivId').text(contentCoordinateGroupWithinLimits.editReason);     
        }
        function showInputs() {
            $("#leftDivId").show();
            $("#rightDivId").show();
            $("#bannerDivId").width(1600);     
        }
        function hideInputs() {
            $("#leftDivId").hide();
            $("#rightDivId").hide();       
            $("#bannerDivId").width(1000);     
        }
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
                $("#numberAId").hide();
                $("#numberBId").hide();
                $("#operatorId").hide();
                $("#numberALabelId").hide();
                $("#numberBLabelId").hide();
                $("#operatorLabelId").hide();
                $("#textId").show();
                $("#textLabelId").show();
            }else{
                $("#numberAId").show();
                $("#numberBId").show();
                $("#operatorId").show();
                $("#numberALabelId").show();
                $("#numberBLabelId").show();
                $("#operatorLabelId").show();
                $("#textId").hide();
                $("#textLabelId").hide();
            }
        }
        function prefillImage() {
            console.log("prefillImage");
        }