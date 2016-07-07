function preActionQuestions(el){
	$(el).find("#imageCanvasTemplate").hide();
    $(el).find("#preActionTemplate").show();
	$(el).find("#imageCaption2").show();
		$(el).find("#HRmorelikefunpolice").show();
	$("#preActionClose").unbind( "click" ).click(function(){
		//SAVE HERE ALANNAH!
		var actionName = localStorage.getItem("currActionName"); //Currently save and then deletes this name before it can be called again
		//var actionName = 
		var yesNoMaybe = {"yes": $('#actionYes').is(":checked"), "no": $('#actionNo').is(":checked"), "maybe": $('#actionMaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#motiv').is(":checked"), "info": $('#info').is(":checked"), "self": $('#self').is(":checked"), "risk": $('#risk').is(":checked"), "tinker": $('#tinker').is(":checked")};
		savePreIdealAction(actionName, yesNoMaybe, whyText, facets);
        setPhasersToTrue("gotPreActionQuestions");
		doActionPrompt(el);
	});
	

	$("#preActionBack").unbind( "click" ).click(function(){
        if (statusIsTrue("drewToolTip")) {
            $(el).find("#preActionTemplate").hide();
            $(el).find("#imageCanvasTemplate").show();
				$(el).find("#HRmorelikefunpolice").hide();
			$(el).find("#imageCaption2").hide();
		
            setPhasersToFalse("gotScreenshot");
        }
        else {
            renderImage();
        }
	})
    $(".abbyMTrigger").unbind( "click" ).click(function (){
        addToolTip("abbyMToolTip", "Abby");	
		$('#abbyMSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyMPreview").hide();
					$("#abbyMComplete").show();
					$("#abbyMSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyMPreview").show();
					$("#abbyMComplete").hide();
					$("#abbyMSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbyIPSTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyIPSToolTip", "Abby");
			$('#abbyIPSSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyIPSPreview").hide();
					$("#abbyIPSComplete").show();
					$("#abbyIPSSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyIPSPreview").show();
					$("#abbyIPSComplete").hide();
					$("#abbyIPSSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbySETrigger").unbind( "click" ).click(function(){
        addToolTip("abbySEToolTip", "Abby");
		$('#abbySESeeMOAR').off('click').on('click', function() { //don't mock Abby's stutter
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbySEPreview").hide();
					$("#abbySEComplete").show();
					$("#abbySESeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbySEPreview").show();
					$("#abbySEComplete").hide();
					$("#abbySESeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbyRTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyRToolTip", "Abby");
			$('#abbyRSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyRPreview").hide();
					$("#abbyRComplete").show();
					$("#abbyRSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyRPreview").show();
					$("#abbyRComplete").hide();
					$("#abbyRSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbyTTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyTToolTip", "Abby");
			$('#abbyTSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyTPreview").hide();
					$("#abbyTComplete").show();
					$("#abbyTSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyTPreview").show();
					$("#abbyTComplete").hide();
					$("#abbyTSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
}

function doActionPrompt(el){
	$(el).find("#imageCaption3").hide();
	$(el).find("#imageCaption2").show();	
	$(el).find("#imageCanvas").show();
	$(el).find("#preActionTemplate").hide();
    $(el).find("#doActionPromptTemplate").show();
	$("#postAction").unbind( "click" ).click(function(){
		//SAVE HERE ALANNAH!
        setPhasersToTrue("idealActionPerformed");
		postActionQuestions(el);
	});
	//$("#postAction").prop("disabled",true);
	$("#doActionBack").unbind( "click" ).click(function(){
		$(el).find("#doActionPromptTemplate").hide();
        $(el).find("#preActionTemplate").show();
        setPhasersToFalse("gotPreActionQuestions");
		preActionQuestions(el);
	});
	$(".continueTrigger").unbind("click").click(function(){
		setPhasersToTrue("idealActionPerformed");
		postActionQuestions(el);
	});
}

function postActionQuestions(el){
	$(el).find("#doActionPromptTemplate").hide();
    $(el).find("#postActionTemplate").show();
	$(el).find("#imageCaption2").hide();	
	$(el).find("#imageCanvas").hide();
	$(el).find("#imageCaption3").show();
	$("#afterb44lyfe").unbind("click").click(function(){
		console.log("Put some gators in the oven");
		$(el).find("#imageCaption2").show();	
		$(el).find("#imageCanvas").show();
		$(el).find("#imageCaption3").hide();
	});
	$("#submitPostAction").unbind( "click" ).click(function(){
		//SAVE HERE ALANNAH!
        setPhasersToTrue("gotPostActionQuestions");
		var actionName = localStorage.getItem("currActionName");
		var yesNoMaybe = {"yes": $('#YNMyes').is(":checked"), "no": $('#YNMno').is(":checked"), "maybe": $('#YNMmaybe').is(":checked")};
		var whyText = $('#postWhyYes').val();
		var facets = {"motiv": $('#Q2motiv').is(":checked"), "info": $('#Q2info').is(":checked"), "self": $('#Q2self').is(":checked"), "risk": $('#Q2risk').is(":checked"), "tinker": $('#Q2tinker').is(":checked")};
		savePostIdealAction(actionName, yesNoMaybe, whyText, facets);
        
		actionLoop(el);
	});
    $(".abbyMTrigger").unbind( "click" ).click(function (){
        addToolTip("abbyMToolTip", "Abby");	
		$('#abbyMSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyMPreview").hide();
					$("#abbyMComplete").show();
					$("#abbyMSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyMPreview").show();
					$("#abbyMComplete").hide();
					$("#abbyMSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbyIPSTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyIPSToolTip", "Abby");
			$('#abbyIPSSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyIPSPreview").hide();
					$("#abbyIPSComplete").show();
					$("#abbyIPSSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyIPSPreview").show();
					$("#abbyIPSComplete").hide();
					$("#abbyIPSSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbySETrigger").unbind( "click" ).click(function(){
        addToolTip("abbySEToolTip", "Abby");
		$('#abbySESeeMOAR').off('click').on('click', function() { //don't mock Abby's stutter
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbySEPreview").hide();
					$("#abbySEComplete").show();
					$("#abbySESeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbySEPreview").show();
					$("#abbySEComplete").hide();
					$("#abbySESeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
    $(".abbyRTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyRToolTip", "Abby");
			$('#abbyRSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyRPreview").hide();
					$("#abbyRComplete").show();
					$("#abbyRSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyRPreview").show();
					$("#abbyRComplete").hide();
					$("#abbyRSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
    });
    $(".abbyTTrigger").unbind( "click" ).click(function(){
        addToolTip("abbyTToolTip", "Abby");
		$('#abbyTSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyTPreview").hide();
					$("#abbyTComplete").show();
					$("#abbyTSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyTPreview").show();
					$("#abbyTComplete").hide();
					$("#abbyTSeeMOAR").html("See more...");	
					$(this).attr("stateVar", 0);
				}
				
			});
	});
    $("#postActionBack").unbind( "click" ).click(function(){
        $(el).find("#postActionTemplate").hide();
        $(el).find("#doActionPromptTemplate").show();
        setPhasersToFalse("idealActionPerformed");
        doActionPrompt(el);
    });
}

function actionLoop(el){
	$(el).find("#postActionTemplate").hide();
    $(el).find("#imageCaption2").hide();	
	$(el).find("#HRmorelikefunpolice").hide();
	$(el).find("#imageCanvas").hide();
	$(el).find("#imageCaption3").hide();
	$(el).find("#actionLoopTemplate").show();
	
	
	$("#moreActions").unbind( "click" ).click(function(){
		if ($(el).find("#actionNameInput").val() == ""){
			alert("Please name your action before continuing");
			
		}
		else{
		//SAVE HERE ALANNAH!
		localStorage.setItem("currActionName", $(el).find("#actionNameInput").val());
		addToSandwich('idealAction', 0);
		$(el).remove();
        setPhasersToFalse("drewToolTip");
		overlayScreen(0);
		overlayScreen(0); //Second time's the charm
		preActionQuestions(el);     
        
        //Reset action states                   
        setPhasersToFalse("highlightedAction");
        setPhasersToFalse("gotScreenshot");
        setPhasersToFalse("gotPreActionQuestions");
        setPhasersToFalse("idealActionPerformed");
        setPhasersToFalse("gotPostActionQuestions");
		}
	});
	
	$("#newSubgoal").unbind( "click" ).click(function(){
		if($(el).find("#subgoalInput").val() == ""){
			alert("Please name your subgoal before continuing")
		}
		else{
		localStorage.setItem("numActions", 0 );
		localStorage.setItem("currSubgoalName", $(el).find("#subgoalInput").val() );
		$(el).remove();
        setPhasersToFalse("drewToolTip");
        
        //Reset action states
        setPhasersToFalse("gotActionName");
        setPhasersToFalse("actionPromptOnScreen");
        setPhasersToFalse("drewToolTip");            
        setPhasersToFalse("highlightedAction");
        setPhasersToFalse("gotScreenshot");
        setPhasersToFalse("gotPreActionQuestions");
        setPhasersToFalse("idealActionPerformed");
        setPhasersToFalse("gotPostActionQuestions");
        //Reset subgoal states
        setPhasersToFalse("gotSubgoalName");
        setPhasersToFalse("gotSubgoalQuestions");
        
		openSlider();
		var numSubgoals = Number(localStorage.getItem("numSubgoals"));
		numSubgoals++;
		localStorage.setItem("numSubgoals", numSubgoals)
		drawSubgoal(numSubgoals); //creates undefined unnamed subgoal
		}
	});
	
	$("#saveAndExit").unbind( "click" ).click(function(){
		//SAVE HERE ALANNAH!
		//nuke
		
		$(el).find("#actionLoopTemplate").hide();
		$(el).find("#theFinalCountDown").show();
		
        setPhasersToTrue("finishedGM");
		var entrees = parseSubgoalArray();
		var scurvy = createCSV(entrees);
		downloadCSV(scurvy);
		
		$("#finalDownload").unbind("click").click(function () {
			var entrees = parseSubgoalArray();
			var scurvy = createCSV(entrees);
			downloadCSV(scurvy);
		});
		
		$("#finalYesCheckbox").unbind("click").click(function () {
			if ($('#finalYesCheckbox').is(":checked")) {
				$('#finalYes').prop('disabled', false);
				$("#finalYes").attr("style","background-color:#7D1935;color:white;");
			}
			else {
				$('#finalYes').prop('disabled', true);
				$("#finalYes").attr("style","background-color:#696969;color:gray;");
			}
		});	
		
		$("#finalYes").unbind("click").click(function () {
			localStorage.clear(); //NUKED
			//nuclear fallout
			//war war never changes...
			location.reload();
		});
		
		$("#finalNo").unbind("click").click(function () {
			$('#theFinalCountDown').hide();
			setPhasersToFalse('finishedGM');
			$('#actionLoopTemplate').show();
		});
		
		
		
	});	
	$("#loopActionBack").unbind( "click" ).click(function(){
		$(el).find("#actionLoopTemplate").hide();
        $(el).find("#postActionTemplate").show();
		$(el).find("#imageCanvas").show();
		$(el).find("#imageCaption2").show();
		$(el).find("#HRmorelikefunpolice").show();
        setPhasersToFalse("gotPostActionQuestions");
		postActionQuestions(el);
	});
	
}

function reloadToolTipState () {
	console.log("reloading toolTip state");
	
	overlayScreen("onlyToolTip");
	
	var toolTip = document.getElementById("myToolTip");

	if (statusIsTrue("finishedGM")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		actionLoop(toolTip);
		$("#saveAndExit").click();
	}
	
	else if (statusIsTrue("gotPostActionQuestions")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		actionLoop(toolTip);
	}
	
	else if (statusIsTrue("idealActionPerformed")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		postActionQuestions(toolTip);
	}
	
	else if (statusIsTrue("gotPreActionQuestions")) {	//This is the chosen one, and will bring balance to the force
		$(toolTip).find("#imageCanvasTemplate").hide();
		doActionPrompt(toolTip);
	}
	
	else if (statusIsTrue("gotScreenshot")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		preActionQuestions(toolTip);
	}
	
	else if (statusIsTrue("highlightedAction")) {

		console.log("on image");
		//renderImage()
		//overlayScreen("onlyToolTip");
	}
	
	console.log("Done reloading tooltip");
}

