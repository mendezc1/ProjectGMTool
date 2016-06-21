function preActionQuestions(el){
	appendTemplateToElement(el, "./templates/preAction.html");
	$("#preActionClose").click(function(){
		//SAVE HERE ALANNAH!
		var actionName = getVarFromLocal("currActionName");
		var yesNoMaybe = {"yes": $('#actionYes').is(":checked"), "no": $('#actionNo').is(":checked"), "maybe": $('#actionMaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#motiv').is(":checked"), "info": $('#info').is(":checked"), "self": $('#self').is(":checked"), "risk": $('#risk').is(":checked"), "tinker": $('#tinker').is(":checked")};
		savePreIdealAction(actionName, yesNoMaybe, whyText, facets);
		
		$(el).empty();
		doActionPrompt(el);
	});
	
	$("#whyYes").keyup(function(event){
		if(event.keyCode == 13){
			//$("#preActionClose").click();
		} 
	});
	$("#preActionBack").click(function(){
		renderImage();
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
	appendTemplateToElement(el, "./templates/doActionPrompt.html");
	$("#postAction").click(function(){
		//SAVE HERE ALANNAH!
		$(el).empty();
		postActionQuestions(el);
	});
	$("#doActionBack").click(function(){
		$(el).empty();
		preActionQuestions(el);
	});
}

function postActionQuestions(el){
	appendTemplateToElement(el, "./templates/postAction.html");
	$("#submitPostAction").click(function(){
		//SAVE HERE ALANNAH!
        var actionName = getVarFromLocal("currActionName");
		var yesNoMaybe = {"yes": $('#YNMyes').is(":checked"), "no": $('#YNMno').is(":checked"), "maybe": $('#YNMmaybe').is(":checked")};
		var whyText = $('#whyYes').val();
		var facets = {"motiv": $('#Q2motiv').is(":checked"), "info": $('#Q2info').is(":checked"), "self": $('#Q2self').is(":checked"), "risk": $('#Q2risk').is(":checked"), "tinker": $('#Q2tinker').is(":checked")};
		savePostIdealAction(actionName, yesNoMaybe, whyText, facets);
        
		$(el).empty();
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
		$(el).empty();
		doActionPrompt(el);
	});
}

function actionLoop(el){
	appendTemplateToElement(el, "./templates/actionLoop.html");
	
	$("#moreActions").click(function(){
		//SAVE HERE ALANNAH!
		$(el).remove();
		overlayScreen();
		preActionQuestions(el);
	});
	
	$("#nextSubgoal").click(function(){
		$(el).remove();
		openSlider();
		drawSubgoal();
	});
	
	$("#saveAndExit").click(function(){
		//SAVE HERE ALANNAH!
		//nuke
	});	
	$("#loopActionBack").click(function(){
		$(el).empty();
		postActionQuestions(el);
	});
	
}


