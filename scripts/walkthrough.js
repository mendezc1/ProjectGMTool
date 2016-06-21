function drawSubgoal(id, file, subgoalId){
	id = "#GenderMagFrame";
	file = "/templates/subgoal.html";
	var subName = sidebarBody().find("#subgoalInput").val();
	console.log("subname", subName);
	var el = $(id).contents().find('#containeryo');
	el.empty();
	appendTemplateToElement(el,file);
	sidebarBody().find('#subgoalHeading').html("Subgoal: " + subName);
	var subgoals = getSubgoalArrayFromLocal();
	if(subgoals){
		var subgoal = subgoals[subgoalId-1];
		console.log("in draw subgoals", subgoal, subgoalId, subgoal.ynm.yes, subgoal.name);
		console.log("in subgoal setting area", subName)
		sidebarBody().find('#subgoalHeading').html("Subgoal: " + subgoal.name);
		//sidebarBody().find('#yes').attr("checked") = subgoal.ynm.yes;
		//sidebarBody().find('#no').attr("checked") = subgoal.ynm.no;
		//sidebarBody().find('#maybe').attr("checked") = subgoal.ynm.maybe;
		sidebarBody().find('#A0Q0whyYes').html(subgoal.why);
	}
	sidebarBody().find("#editSubgoal").hide();
	sidebarBody().find('body').on('click', '#addAction', function(){
		var yesNoMaybe = {"yes": sidebarBody().find("#yes").is(":checked"), "no": sidebarBody().find("#no").is(":checked"), "maybe": sidebarBody().find("#maybe").is(":checked")};
		var whyText = sidebarBody().find('#A0Q0whyYes').val();
		var facets = {"motiv": sidebarBody().find("#A0Q0motiv").is(":checked"), "info": sidebarBody().find("#A0Q0info").is(":checked"), "self": sidebarBody().find("#A0Q0self").is(":checked"), "risk": sidebarBody().find("#A0Q0risk").is(":checked"), "tinker": sidebarBody().find("#A0Q0tinker").is(":checked")};
		saveSubgoal(subgoalId, subName, yesNoMaybe, whyText, facets);
		drawAction(0,0,0);
		
	});
	
	sidebarBody().find("#A0Q0whyYes").keyup(function(event){
		if(event.keyCode == 13){
		//	sidebarBody().find("#addAction").click();
		} 
	});
	
}

function drawAction(id, file, actionNum){
	id = "#GenderMagFrame";
	file = "/templates/actionPrompt.html";
	var el = $(id).contents().find('#containeryo');
	el.empty();
	appendTemplateToElement(el,file);
	var actionName = "";
	sidebarBody().find('body').on('click', '#submitActionName', function() {
		actionName = sidebarBody().find("#actionNameInput").val();
		saveVarToLocal("currActionName", actionName);
		sidebarBody().find('#getActionName').html("<b>Ideal Action: " + actionName + "</b>");
		sidebarBody().find("#promptAction").show();
	});
	sidebarBody().find("#actionNameInput").keyup(function(event){
		if(event.keyCode == 13){
			sidebarBody().find("#submitActionName").click();
		} 
	});
	sidebarBody().find('body').on('click', '#overlayTrigger', function() {
		overlayScreen();
	});
	sidebarBody().find("#promptActionBack").click(function(){
		el.empty();
		var subgoalId = localStorage.getItem("numSubgoals");
		console.log("get back", subgoalId);
		/*Jojo was a man who thought he was a loner
		But he knew it couldn't last
		Jojo left his home in Tucson, Arizona
		For some California grass*/
		drawSubgoal(0,0, subgoalId);
	})
}
/*
		//Get Subtask
		//current funcitonality is broken. need to add JS for incrementing IDs to properly place actions.
		//Current name appending only works for the first subgoal. Breaks after that. Needs JS to make unique IDs etc.
		sidebarBody().find('body').on('click', '#submitSubgoal', function() {
			var subgoalName = sidebarBody().find("#subgoalInput").val();
			appendTemplateToElement(sidebarBody().find('#subgoals'),'/templates/subgoal.html');
			sidebarBody().find("#subgoalHeading").html("Subgoal: " + subgoalName);
			//initialize the subgoal accordion menu and tooltips
			$(function() {
				sidebarBody().find(".accordion").accordion({ heightStyle: "content", collapsible: true });
				sidebarBody().find("#setup").tooltip({ track: true });
			});
			
			sidebarBody().find("#addAction").click(function(e) {
				appendTemplateToElement(sidebarBody().find(e.target).parent(),'/templates/action.html');
			
				//initialize the subgoal accordion menu and tooltips
				$(function() {
					sidebarBody().find(".accordion").accordion({ heightStyle: "content", collapsible: true });	
					sidebarBody().find("#setup").tooltip({ track: true });
				});
			});
		});
		
		//Add ideal action
		$("body").on("click", "input.submitAction", function() {
			//Current subgoal
			var actions = $(this).parent().parent();
			var subgoal = actions.parent();
			
			var numActions = parseInt(subgoal.attr("numactions"));
			subgoal.attr("numactions", numActions + 1);
			
			var actionName = $(this).prev().val();
			var actionId = subgoal.attr("id") + "A" + subgoal.attr("numactions");
			
			//Add this action
			var action = $("<div/>", {
				id: actionId
			}).appendTo(actions);
			
			//Add action name to action
			$("<span/>", { 
				html: "Ideal Action: "+ actionName + "<br>",
				id: actionId + "Name",
				class: "idealActionLabel"
			}).appendTo(action);

			var buttonPrompt = $("<div/>", {
				html: "Now that you specified the action click this button to show it and capture your screen",
			}).appendTo(action);
			
			var screenShotButton = $("<button>", {
				id: "screenShot" + numSubtasks + "-" + numScreenShots,
				class: "screenShot",
				html: "Click here to show me the action"
			}).appendTo(action);
			
			//screenShotButton.after("<br/>");
			$("body").on("click", "button.screenShot", function(){
				chrome.runtime.sendMessage({greeting: "takeScreenShot"}, function(response) {	
				});
				overlayScreen();
			});	
		//Add questions for action
			var actionQuestions = $("<div/>", {
				id: actionId + "Questions"
			}).appendTo(action);
				
			var question1 = "<br> Will " + personaName + " know what to do at this step?<br>";

			var question3 = "If  " + 
							personaName + " does the right thing, will " + 
							pronoun + " know that " +
							pronoun + " did the right thing and is making progress toward " +
							possessive + " goal?<br>";

			var questions = [question1, question3];
				
			//Add questions and response fields to ideal action
			addQuestions(actionQuestions, questions, numActions + 1);
			
			var removeAction = $("<button>", {
				class: "removeAction",
				id: "Remove" + actionId,
				html: "Remove This Action"
			}).appendTo(action);	
			
			//Reset form and move to the bottom of the panel
			$(this).attr("placeholder", "");
			$(this).prev().val("");
			$(this).parent().appendTo(actions);
		});
		
		$("body").on("click", "button.removeSubtask", function() {
			var id = event.target.id;
			var subtaskNumber = id[id.length - 1];
					
			$("#S" + subtaskNumber).remove();
			$("#S" + subtaskNumber + "Name").remove();
			
			numSubtasks--;
			$(".accordion").accordion("refresh");
		});
		
		$("body").on("click", "button.removeAction", function() {
			var id = event.target.id;
			var subtaskNumber = id[7];
			var actionNumber = id[9];
					
			$("#S" + subtaskNumber + "A" + actionNumber).remove();
			
			//Reduce the action count for the subgoal
			//prevNumActions = $("#S" + subtaskNumber).attr("numactions");
			//curNumActions = parseInt(prevNumActions) - 1;
			//$("#S" + subtaskNumber).attr("numactions", curNumActions);
			
			$(".accordion").accordion("refresh");
		});
		$("body").on("click", "button.screenShot", function(){
			overlayScreen();
		});
		
		$("#saveAndExit").click(function() {
			$(document).each(function() {
				allInput = ($(this).find(':input'));
			});
			
			csv = createCSV(parseUserInput(allInput));
			downloadCSV(csv);
			
			//After save, don't store html on unload
			$(window).unbind("unload");
			
			//Remove input and global variables
			localStorage.clear();		
		});		
		console.log("end of if");
*/
