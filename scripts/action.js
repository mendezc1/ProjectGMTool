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
		doActionPrompt(el);
	});
	

	$("#preActionBack").click(function(){
        if (statusIsTrue("drewToolTip")) {
            $(el).find("#preActionTemplate").hide();
            $(el).find("#imageCanvasTemplate").show();
        }
        else {
            renderImage();
        }
	})
    $(".abbyMTrigger").click(function (){
        addToolTip("abbyMToolTip");	
    });
    $(".abbyIPSTrigger").click(function(){
        addToolTip("abbyIPSToolTip");
    });
    $(".abbySETrigger").click(function(){
        addToolTip("abbySEToolTip");
    });
    $(".abbyRTrigger").click(function(){
        addToolTip("abbyRToolTip");
    });
    $(".abbyTTrigger").click(function(){
        addToolTip("abbyTToolTip");
    });
}

function doActionPrompt(el){
	$(el).find("#preActionTemplate").hide();
    $(el).find("#doActionPromptTemplate").show();
	$("#postAction").click(function(){
		//SAVE HERE ALANNAH!
		postActionQuestions(el);
	});
	$("#doActionBack").click(function(){
		$(el).find("#doActionPromptTemplate").hide();
        $(el).find("#preActionTemplate").show();
		preActionQuestions(el);
	});
}

function postActionQuestions(el){
	$(el).find("#doActionPromptTemplate").hide();
    $(el).find("#postActionTemplate").show();
	$("#submitPostAction").click(function(){
		//SAVE HERE ALANNAH!

		var actionName = localStorage.getItem("currActionName");
		var yesNoMaybe = {"yes": $('#YNMyes').is(":checked"), "no": $('#YNMno').is(":checked"), "maybe": $('#YNMmaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#Q2motiv').is(":checked"), "info": $('#Q2info').is(":checked"), "self": $('#Q2self').is(":checked"), "risk": $('#Q2risk').is(":checked"), "tinker": $('#Q2tinker').is(":checked")};
		savePostIdealAction(actionName, yesNoMaybe, whyText, facets);
        
		actionLoop(el);
	});
    $(".abbyMTrigger").click(function (){
        addToolTip("abbyMToolTip");	
    });
    $(".abbyIPSTrigger").click(function(){
        addToolTip("abbyIPSToolTip");
    });
    $(".abbySETrigger").click(function(){
        addToolTip("abbySEToolTip");
    });
    $(".abbyRTrigger").click(function(){
        addToolTip("abbyRToolTip");
    });
    $(".abbyTTrigger").click(function(){
        addToolTip("abbyTToolTip");
    });
    $("#postActionBack").click(function(){
        $(el).find("#postActionTemplate").hide();
        $(el).find("#doActionPromptTemplate").show();
        doActionPrompt(el);
    });
}

function actionLoop(el){
	$(el).find("#postActionTemplate").hide();
    $(el).find("#actionLoopTemplate").show();
	
	$("#moreActions").click(function(){
		//SAVE HERE ALANNAH!
		$(el).remove();
		overlayScreen();
		preActionQuestions(el);
	});
	
	$("#nextSubgoal").click(function(){
		$(el).remove();
		openSlider();
		drawSubgoal(); //creates undefined unnamed subgoal
	});
	
	$("#saveAndExit").click(function(){
		//SAVE HERE ALANNAH!
		//nuke
	});	
	$("#loopActionBack").click(function(){
		$(el).find("#actionLoopTemplate").hide();
        $(el).find("#postActionTemplate").show();
		postActionQuestions(el);
	});
	
}


