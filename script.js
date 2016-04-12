var personaName = "";
var pronoun = "";
var possessive = "";
var numScreenShots = 0;
var numSubtasks = 0;
var sidebarOpen = false;
var personaShown = 0; //toggle when user clicks view/hide persona button

/* This stuff needs to run when the extension starts */

function init(){
	//start up the sidebar
	toggleSidebar();
}
$(document).ready(function(){
	init();
});
function collapseSidebar(e){
	$("#mySidebar").children().each(function(){
		$(this).hide();
	});
	$("#mySidebar").animate({width: "1%",
    height: "10%"}, 400);
	e.stopPropagation();
	$("#mySidebar").on("click",function(e) {
		expandSidebar();
		e.stopPropagation();
	})
	sidebarOpen = false;

}

function expandSidebar(){
	$("#mySidebar").animate({width : "400px",height:"100%"}, 400);
		$("#mySidebar").children().each(function(){
			$(this).show();
		});
		$("#mySidebar").prop('onclick',null).off('click');
		sidebarOpen = true;
}

function today() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var dayOfMonth = date.getDate();
	var year = date.getFullYear();
	
	return month + "/" + dayOfMonth + "/" + year;
}

function now() {
	var date = new Date();
	return date.getHours() + ":" + date.getMinutes();
}

function overlayScreen(){
	$("#screenShot" + numSubtasks + "-" + numScreenShots).html("Retake Screenshot");
	numScreenShots++;
	if(!document.getElementById('genderMagCanvasContainer')){
		console.log("In overlayScreen");
		var canvasContainer = document.createElement('div');
			// Add the div into the document
	}
	else{
		var canvasContainer = document.getElementById('genderMagCanvas');	
	}
	
		canvasContainer.id = "genderMagCanvasContainer";
		canvasContainer.style.position="fixed";
		// Set to 100% so that it will have the dimensions of the document
		canvasContainer.style.left="0px";
		canvasContainer.style.top="0px";
		canvasContainer.style.width="100%";
		canvasContainer.style.height="100%";
		canvasContainer.style.zIndex="1000";
		document.body.appendChild(canvasContainer);
		
		var canvas = document.createElement('canvas');
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.id = "genderMagCanvas";
		canvas.position = "fixed";
		canvas.style.cssText = "z-index:100; background:blue; width:100%; height:100%;";
		canvas.style.opacity = .50;
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvas.style.overflow = 'visible';
		canvas.style.position = 'fixed';
		canvasContainer.appendChild(canvas);


		var genderMagCanvas = document.getElementById('genderMagCanvas'),
			ctx = genderMagCanvas.getContext('2d'),
			rect = {},
			drag = false;
		
	
		function init() {
			genderMagCanvas.addEventListener('mousedown', mouseDown, false);
			genderMagCanvas.addEventListener('mouseup', mouseUp, false);
			genderMagCanvas.addEventListener('mousemove', mouseMove, false);			
		}
		function mouseDown(e) {
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			drag = true;
		}			
		function mouseUp(e) {
			drag = false;
			console.log(rect);
			elm = document.elementFromPoint(rect.startX, rect.startY);
			var elements = new Array();
			while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
			{
				elements.push(elm);
				elm.style.display = "none";
				elm = document.elementFromPoint(rect.startX, rect.startY);
			}
			console.log("element" , elm.innerText, elm.textContent);
			var highlightClick = document.createElement("div");
			highlightClick.id = "highlightClick";
			document.body.appendChild(highlightClick);
			highlightClick.style.left = rect.startX-40 + "px";
			highlightClick.style.top = rect.startY-20 + "px";
			console.log("Clicked ", highlightClick)
			
		
			console.log(elements);
			for(var element in elements){
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
		chrome.runtime.sendMessage({greeting: "takeScreenShot", userAction: elm.innerText}, function(response) {
				
		});
			console.log("sending message");
			setTimeout(function(){
				document.getElementById("highlightClick").remove();
			}, 2000);
		}
		function mouseMove(e) {
			if (drag) {
				rect.w = (e.pageX - this.offsetLeft) - rect.startX;
				rect.h = (e.pageY - this.offsetTop) - rect.startY ;
				ctx.clearRect(0,0,canvas.width,canvas.height);
				draw();
			}
		}
		function draw() {
			ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
		}
		init();

}


function takeScreenShot() {
	chrome.windows.getCurrent(function (win) {    
    	chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url", imgUrl);  
			var screenShotLink = $("<a>", {
				id: "screenShotLink" + numSubtasks + "-" + numScreenShots,
				html: "Click here, then show me the action",
				href: imgUrl
			});
			$("#screenShot" + numSubtasks + "-" + numScreenShots).append(screenShotLink);
		});    
	});
	numScreenShots++;
};

//Adds a checkbox for each of the five facets to element
//Takes question number as input
function addFacetCheckboxes(element, questionNumber, actionNum, yesNoMaybe) {
	var questionNumber = questionNumber + 1;
	
	var facets = ["Motivation", "Information Processing Style", "Computer Self-Efficacies",
		"Attitude Towards Risk", "Willingness to Tinker"];
	
	for (var facet = 0; facet < facets.length; facet++) {
		//Checkbox
		$("<input/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + questionNumber + yesNoMaybe + "F" + facet,
			type: "checkbox",
			value: facets[facet],
		}).appendTo(element);
	
		//Label for Checkbox
		$("<span/>", { html: facets[facet] }).appendTo(element);
		
		$("<br>").appendTo(element);
	}
	
	$("<br>").appendTo(element);
};

function parseUserInput(allInput) {
	var taskName = $("#taskName").html();
	var teamName = $("#teamName").html();
	
	//Three possible responses for each question (yes, no, or maybe)
	//Checkbox, text area, and 5 facets under each response (7 total inputs per response)
	var numInputsPerResponse = 21;

	var entry = [];
	var entries = [];
		
	lastSubgoal = null;
	lastQuestion = null;
	
	for (var i = 0; i < allInput.length; i++) { 
		if ((allInput[i]["checked"] == true) || (allInput[i]["type"] == "textarea")) {
			    
			var responseId = allInput[i]['id'];
			var input = allInput[i]['value'];
				
			var subgoalNumber = responseId[1];
			var actionNumber = responseId[3];
			var questionNumber = responseId[5];
				
			//If on the same question for the same subgoal, update current entry
			//Otherwise, add current entry to list of entries and create a new entry
			if ((questionNumber != lastQuestion) || (subgoalNumber != lastSubgoal)) {
				if (entry.length != 0) {
					entries.push(entry);
				}
					
				var subgoalName = $("#S" + subgoalNumber + "Name").html();
				var actionName = $("#S" + subgoalNumber + "A" + actionNumber + "Name").html();
				var date = today();
				var time = now();
				
				entry = [date, time, teamName, personaName, taskName, subgoalName, actionName, questionNumber];
				//Allows for adding more columns to beginning of the entry (array above)
				//without altering the ridiculous switch statement below
				prefix = entry.length;
					
				//Init with default value
				for (var j = 0; j < numInputsPerResponse; j++) {
					entry.push("0");
				}
					
				lastSubgoal = subgoalNumber;
				lastQuestion = questionNumber;
			}

			var inputId = responseId.substring(6);
			switch(inputId) {
				case 'yesCheckbox':
					entry[prefix + 1] = "1";
					break;
				case 'YesResponse':
					entry[prefix + 2] = input;
					break;
				case 'YF0':
					entry[prefix + 3] = "1";
					break;
				case 'YF1':
					entry[prefix + 4] = "1";
					break;
				case 'YF2':
					entry[prefix + 5] = "1";
					break;
				case 'YF3':
					entry[prefix + 6] = "1";
					break;
				case 'YF4':
					entry[prefix + 7] = "1";
					break;
				case 'noCheckbox':
					entry[prefix + 8] = "1";
					break;
				case 'NoResponse':
					entry[prefix + 9] = input;
					break;
				case 'NF0':
					entry[prefix + 10] = "1";
					break;
				case 'NF1':
					entry[prefix + 11] = "1";
					break;
				case 'NF2':
					entry[prefix + 12] = "1";
					break;
				case 'NF3':
					entry[prefix + 13] = "1";
					break;
				case 'NF4':
					entry[prefix + 14] = "1";
					break;
				case 'maybeCheckbox':
					entry[prefix + 15] = "1";
					break;
				case 'maybeResponse':
					entry[prefix + 16] = input;
					break;
				case 'MF0':
					entry[prefix + 17] = "1";
					break;
				case 'MF1':
					entry[prefix + 18] = "1";
					break;
				case 'MF2':
					entry[prefix + 19] = "1";
					break;
				case 'MF3':
					entry[prefix + 20] = "1";
					break;
				case 'MF4':
					entry[prefix + 21] = "1";
					break;
				default:
					entry[0] = "ERROR IN THIS ENTRY"
			}
		}
	}

	//Add the last entry
	entries.push(entry);
	
	return entries;
}

function createCSV(entries) {
	var csvContent = "data:text/csv;charset=utf-8,";
	var header = ["Persona", "Task", "Subgoal", "Action", "Question",
		"Yes", "Why", "Motiv", "Risk", "Tinker", "SE", "Info",
		"No", "Why", "Motiv", "Risk", "Tinker", "SE", "Info",
		"Maybe", "Why", "Motiv", "Risk", "Tinker", "SE", "Info"]
		
	csvContent += header.join(",") + "\n";
		
	entries.forEach(function(entry, index){
		var dataString = entry.join(",");
   		csvContent += index < entries.length ? dataString + "\n" : dataString;
	});
	
	return csvContent;
}

function downloadCSV(csvContent) {
	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}


//Adds a series of questions (array of strings) to element
//Under each question, adds checkboxes for yes/no response and fields for explanation
function addQuestions(element, questions, actionNum) {

	for (var i = 0; i < questions.length; i++) {
		var container = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) });
		var yesFacets = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "yesFacets" });
		var noFacets = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "noFacets" });
		var maybeFacets =$("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "maybeFacets" });
		
		//Add question text
		var question = $("<span/>", { html: questions[i] }).appendTo(container);
		question.addClass("cwQuestion");
	
		//Add "Yes" checkbox
	var yesCheckbox = $("<div>", {
		html: "Yes",
		class: "responseBoxLabel"
	}).appendTo(container);
	
	var noCheckbox = $("<div>", {
		html: "No",
		class: "responseBoxLabel"
	}).appendTo(container);
	
	var maybeCheckbox = $("<div>", {
		html: "Maybe",
		class: "responseBoxLabel"
	}).appendTo(container);
		
		$("<br>").appendTo(container);
		//Add response field for yes
		var yesResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "YesResponse",
			class: "responseBox",
			placeholder: "Why?",
		}).appendTo(container);
		

		
		
		

		
		//Add response field for no
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "NoResponse",
			placeholder: "Why not?",
			class: "responseBox"
		}).appendTo(container);

		
		//Add response field for maybe
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "maybeResponse",
			placeholder: "Why maybe?",
			class: "responseBox"
		}).appendTo(container);
		

		var question = $("<span/>", { html: "Which of the persona's facets did you use to answer the above question?" }).appendTo(container);
		question.addClass("cwQuestion");
		//Add checkboxes for Maybe facets
		addFacetCheckboxes(maybeFacets, i, actionNum, "M");
		maybeFacets.appendTo(container);
					
		container.appendTo(element);
	}

}

/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar"){
		if(sidebarOpen){
			$(document).ready(function(){
				$("#mySidebar").hide();
				sidebarOpen = false;
			});
		}
		else{
			$(document).ready(function(){
				$("#mySidebar").show();
				sidebarOpen = true;
			});
		}
	}
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/

function toggleSidebar() {
	if(sidebarOpen) {
		console.log("in if");
		var el = document.getElementById('mySidebar');
		el.style.top = "30%";
		el.style.bottom = "30%";
		el.style.width = "5%";
		el.style.height = "20%"

		$("#welcomeText").hide();
		$("#beginSetup").hide();
		$("#getTeam").hide();
		$("#teamName").hide();
		//charles writes a function here
		$("#toggleSidebar").html("Open Sidebar");
		sidebarOpen = false;
		
	}
	else {
		console.log("in else");
		var sidebar = $("<div/>", {
			id: "mySidebar",
		}).appendTo($('body'));
		sidebarOpen = true;
		var msg = $.ajax({type: "GET", url: chrome.extension.getURL('/popup.html'), async: false}).responseText;
		$($.parseHTML(msg)).appendTo("#mySidebar");

		$("#submitTeam").click(function() {
			var teamName = $(teamInput).val();
			$("#teamName").html("Team Name: "+ teamName);
			$("#getTeam").children().hide();
			$("#getPersona").children().fadeTo(500, 1).attr("disabled",  false);
		});

		//Get persona name
		$("#submitPersona").click(function() {
			personaName = $("#personaSelection").val();
			$("#personaName").html("Persona Name: " + personaName + "<br>");
			if ((personaName == "Tim") || (personaName == "Patrick")) {
				pronoun = "he";
				possessive = "his";
			} else {
				pronoun = "she";
				possessive = "her";
			}
		
			$("#getPersona").children().remove();
			$("#getPersona").remove();
		
			//Show task
			$("#getTask").children().fadeTo(500, 1).attr("disabled", false);
			$("#taskPrompt").html("Take a moment to describe the scenario " + personaName + " will be performing");
			//Show button to view persona
			$("#viewPersona").show().html("Show " + personaName);
			personaShown = true;
		});
	
		//Get task name
		$('#submitTask').click(function() {
			var taskName = $("#taskInput").val();
			$("#taskName").html("Scenario Description: " + taskName);
			
			$("#getTask").children().remove();
			$("#getTask").remove();
		
			//Show subtask
			$("#getSubtask").children().fadeTo(500, 1).attr("disabled",  false);
			$("#beginSetup").remove();
			$("#subtaskPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + personaName + " to perform");
		});
		
		var closeSidebar = $("<button/>", {
				id: "toggleSidebar",
				html: "Close Sidebar"
		}).appendTo("#mySidebar");
		
		$(closeSidebar).click(function(e){
			collapseSidebar(e);
		});
		
	//Get Subtask
	$("#submitSubtask").click(function() {
		numSubtasks++;
			
		//Clear the hint in the field for subtask name/description
		$("#subtaskInput").attr("placeholder", "");
		
		//Label for this subtask
		var label = $("<h3/>", { id: "S" + numSubtasks + "Name",
			html: "Subgoal: " + $("#subtaskInput").val() });
		label.appendTo("#subtasks");
		var removeSubtask = $("<button>", {
			class: "removeSubtask",
			id: "Remove" + numSubtasks,
			html: "Remove This Subgoal",
		}).appendTo(label);
		//Container for this subtask
		var subtask = $("<div/>", { id: "S" + numSubtasks, numactions: 0 });

		//Container for subtask questions
		var questionContainer = $("<div/>", { id: "S" + numSubtasks + "Questions" });
		questionContainer.appendTo(subtask);
	
		var question = ["Will " + personaName + " have formed this subgoal as a step to " +
		                possessive + " overall goal?<br>"];
		
		addQuestions(questionContainer, question, 0);
					
		//Container to hold ideal actions (questions and responses) for this subtask
		var idealActions = $("<div/>", { id: "S" + numSubtasks + "Actions" });
		
		var addAction = $("<div/>", { class: "getAction", type: "text" });
		var actionInput = $("<input/>", { class: "actionInput", type: "text", placeholder: "Type 'Sue in Search Field" });
		var submitAction = $("<input/>", { class: "submitAction", type: "submit", value: "Add Ideal Action" });
		
		actionInput.appendTo(addAction);
		submitAction.appendTo(addAction);
		addAction.appendTo(idealActions);
		idealActions.appendTo(subtask);
		
		//Add subtask to container for all subtasks
		subtask.appendTo("#subtasks");
		
		//Open accordion menu to this subtask
    	$(".accordion").accordion("refresh");
    	$(".accordion").accordion({ active: numSubtasks - 1}); //Zero-based index of panel
		
		//Reset subtask form
		$("#subtaskInput").val("");
		$("#subtaskPrompt").html("Are there any more subgoals?");
		$("#submitSubtask").val("Add New Subgoal");								
	});
	
	//Show persona details
	$("#viewPersona").click(function() {
		if (personaShown == true) {
			personaShown = false;
			$(this).html("Hide " + personaName);
		} else {
			personaShown = true;
			$(this).html("Show " + personaName);
		}
	});
			//According menu
		$(function() {
			$(".accordion").accordion({ heightStyle: "content", collapsible: true });
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
	}	
}


$(document).ready(function() {
	var style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = chrome.extension.getURL('styles.css');
	(document.head||document.documentElement).appendChild(style);
	console.log("ayy");
	
	//Reload previous html
	var prevHTML = localStorage.getItem("popupHTML");
	if (prevHTML != null) {
	
		$("body").html(prevHTML);
		//Restore user input (state before they clicked away from popup)
		$(document).each(function() {
			allInput = ($(this).find(':input'));
		});
	
		for (var i = 0; i < allInput.length; i++) {
			var id = allInput[i]["id"];
			var type = allInput[i]["type"]
		
			var value = localStorage.getItem(id);
			
			if (type == "checkbox") {
				$("#" + id).attr("checked", $.parseJSON(value)); //convert string to bool
			} else if (type != "submit") {
				$("#" + id).val(value);
			}
		}
    	
    	//Restore global variables
    	personaName = localStorage.getItem("personaName");
    	pronoun = localStorage.getItem("pronoun");
    	possessive = localStorage.getItem("possessive");
    	numSubtasks = localStorage.getItem("numSubtasks");
    	//personaShown = localStorage.getItem("personaShown");
    	
	} else {
		
		$("#viewPersona").hide();
		$("#getPersona").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getTask").children().fadeTo(0, 0.6).attr("disabled",  true);
		$("#getSubtask").children().fadeTo(0, 0.6).attr("disabled",  true);
	}
	



	

});	

// When user clicks off of tool or closes tool
$(window).unload(function () {
	
	var popup = chrome.extension.getViews({ type: 'popup' })[0];
	popupHTML = popup.document.body.innerHTML;
	
	$(document).each(function() {
		allInput = ($(this).find(':input'));
	});
	
	for (var i = 0; i < allInput.length; i++) {
		var id = allInput[i]["id"];
		var type = allInput[i]["type"]
		var checked = allInput[i]["checked"]
		var value = allInput[i]["value"]
		
		//Save the values of checkboxes and text areas (all input besides buttons)
		if (type == "checkbox") {
			localStorage.setItem(id, checked);
		} else if (type != "button") {
			localStorage.setItem(id, value);
		}
	}
	
	//Save the current state (html) unless user is done (clicked done button)      
    localStorage.setItem("popupHTML", popupHTML);
    localStorage.setItem("personaName", personaName);
    localStorage.setItem("pronoun", pronoun);
    localStorage.setItem("possessive", possessive);
    localStorage.setItem("numSubtasks", numSubtasks);
    //localStorage.setItem("personaShown", personaShown);
	
});

