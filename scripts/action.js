function preActionQuestions(el){
	$(el).find("#imageCanvasTemplate").hide();
    $(el).find("#preActionTemplate").show();
	$("#preActionClose").click(function(){
		//SAVE HERE ALANNAH!
		//var actionName = getVarFromLocal("currActionName"); //Currently save and then deletes this name before it can be called again
		var actionName = "Lights, Camera"
		var yesNoMaybe = {"yes": $('#actionYes').is(":checked"), "no": $('#actionNo').is(":checked"), "maybe": $('#actionMaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#motiv').is(":checked"), "info": $('#info').is(":checked"), "self": $('#self').is(":checked"), "risk": $('#risk').is(":checked"), "tinker": $('#tinker').is(":checked")};
		savePreIdealAction(actionName, yesNoMaybe, whyText, facets);
        setPhasersToTrue("gotPreActionQuestions");
		doActionPrompt(el);
	});
	

	$("#preActionBack").click(function(){
        if (statusIsTrue("drewToolTip")) {
            $(el).find("#preActionTemplate").hide();
            $(el).find("#imageCanvasTemplate").show();
            setPhasersToFalse("gotScreenshot");
        }
        else {
            renderImage();
        }
	})
    $(".abbyMTrigger").click(function (){
        addToolTip("abbyMToolTip", "Abby");	
    });
    $(".abbyIPSTrigger").click(function(){
        addToolTip("abbyIPSToolTip", "Abby");
    });
    $(".abbySETrigger").click(function(){
        addToolTip("abbySEToolTip", "Abby");
    });
    $(".abbyRTrigger").click(function(){
        addToolTip("abbyRToolTip", "Abby");
    });
    $(".abbyTTrigger").click(function(){
        addToolTip("abbyTToolTip", "Abby");
    });
}

function doActionPrompt(el){
	$(el).find("#preActionTemplate").hide();
    $(el).find("#doActionPromptTemplate").show();
	$("#postAction").click(function(){
		//SAVE HERE ALANNAH!
        setPhasersToTrue("idealActionPerformed");
		postActionQuestions(el);
	});
	$("#doActionBack").click(function(){
		$(el).find("#doActionPromptTemplate").hide();
        $(el).find("#preActionTemplate").show();
        setPhasersToFalse("gotPreActionQuestions");
		preActionQuestions(el);
	});
}

function postActionQuestions(el){
	$(el).find("#doActionPromptTemplate").hide();
    $(el).find("#postActionTemplate").show();
	$("#submitPostAction").click(function(){
		//SAVE HERE ALANNAH!
        setPhasersToTrue("gotPostActionQuestions");
		var actionName = localStorage.getItem("currActionName");
		var yesNoMaybe = {"yes": $('#YNMyes').is(":checked"), "no": $('#YNMno').is(":checked"), "maybe": $('#YNMmaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#Q2motiv').is(":checked"), "info": $('#Q2info').is(":checked"), "self": $('#Q2self').is(":checked"), "risk": $('#Q2risk').is(":checked"), "tinker": $('#Q2tinker').is(":checked")};
		savePostIdealAction(actionName, yesNoMaybe, whyText, facets);
        
		actionLoop(el);
	});
    $(".abbyMTrigger").click(function (){
        addToolTip("abbyMToolTip", "Abby");	
    });
    $(".abbyIPSTrigger").click(function(){
        addToolTip("abbyIPSToolTip", "Abby");
    });
    $(".abbySETrigger").click(function(){
        addToolTip("abbySEToolTip", "Abby");
    });
    $(".abbyRTrigger").click(function(){
        addToolTip("abbyRToolTip", "Abby");
    });
    $(".abbyTTrigger").click(function(){
        addToolTip("abbyTToolTip", "Abby");
    });
    $("#postActionBack").click(function(){
        $(el).find("#postActionTemplate").hide();
        $(el).find("#doActionPromptTemplate").show();
        setPhasersToFalse("idealActionPerformed");
        doActionPrompt(el);
    });
}

function actionLoop(el){
	$(el).find("#postActionTemplate").hide();
    $(el).find("#actionLoopTemplate").show();
	
	$("#moreActions").click(function(){
		//SAVE HERE ALANNAH!
		localStorage.setItem("currActionName", $(el).find("#actionNameInput").val());
		$(el).remove();
        setPhasersToFalse("drewToolTip");
		overlayScreen(0);
		overlayScreen(0); //Second time's the charm
		preActionQuestions(el);     
        
        //Reset action states
        setPhasersToFalse("gotActionName");
        setPhasersToFalse("actionPromptOnScreen");          
        setPhasersToFalse("drewToolTip");          
        setPhasersToFalse("highlightedAction");
        setPhasersToFalse("gotScreenshot");
        setPhasersToFalse("gotPreActionQuestions");
        setPhasersToFalse("idealActionPerformed");
        setPhasersToFalse("gotPostActionQuestions");
	});
	
	$("#newSubgoal").click(function(){
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
	});
	
	$("#saveAndExit").click(function(){
		//SAVE HERE ALANNAH!
		//nuke
		
        setPhasersToTrue("finishedGM");
		var entrees = parseSubgoalArray();
		var scurvy = createCSV(entrees);
		downloadCSV(scurvy);
		
		localStorage.clear(); //NUKED
		//nuclear fallout
		//war war never changes...
		
	});	
	$("#loopActionBack").click(function(){
		$(el).find("#actionLoopTemplate").hide();
        $(el).find("#postActionTemplate").show();
        setPhasersToFalse("gotPostActionQuestions");
		postActionQuestions(el);
	});
	
}

function reloadToolTipState () {
	console.log("reloading toolTip state");
	
	overlayScreen("onlyToolTip");
	
	var toolTip = document.getElementById("myToolTip");

	
	if (statusIsTrue("gotPostActionQuestions")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		actionLoop(toolTip);
	}
	
	else if (statusIsTrue("idealActionPerformed")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		postActionQuestions(toolTip);
	}
	
	else if (statusIsTrue("gotPreActionQuestions")) {	//This is the important one
		$(toolTip).find("#imageCanvasTemplate").hide();
		doActionPrompt(toolTip);
	}
	
	else if (statusIsTrue("gotScreenshot")) {
		$(toolTip).find("#imageCanvasTemplate").hide();
		preActionQuestions(toolTip);
	}
	
	else if (statusIsTrue("highlightedAction")) {
		//overlayScreen("onlyToolTip");
	}
	
	console.log("Done reloading tooltip");
}

