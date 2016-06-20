function preActionQuestions(el){
	appendTemplateToElement(el, "./templates/preAction.html");
	$("#preActionClose").click(function(){
		//SAVE HERE ALANNAH!
		//var el = sidebarBody().find('#preActionQuestions');
		//saveIdealAction(id, name, idOfSubgoal, el);
		//toolTip.remove();
		$(el).empty();
		doActionPrompt(el);
	});
	
	$("#whyYes").keyup(function(event){
		if(event.keyCode == 13){
			$("#preActionClose").click();
		} 
	});
}

function doActionPrompt(el){
	appendTemplateToElement(el, "./templates/doActionPrompt.html");
	$("#postAction").click(function(){
		//SAVE HERE ALANNAH!
		$(el).empty();
		postActionQuestions(el);
	});
}

function postActionQuestions(el){
	appendTemplateToElement(el, "./templates/postAction.html");
	$("#submitPostAction").click(function(){
		//SAVE HERE ALANNAH!
		$(el).empty();
		actionLoop(el);
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
	
}