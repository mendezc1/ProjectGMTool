/* Function preWalkthrough
 * 
 * Appends the HTML template found in <file> to the element with the ID of <id>. Then, calls the handlePreWalkthroughInfo() 
 * function, which gets the user's team name, persona choice, and scenario name and puts the first subgoal template on the screen.
 * 
 * Takes 2 arguements:
 * 		id: the id of the element to which the template will be appended
 * 		file: the LOCAL path of the template to use (e.g., "/templates/popup.html")
 *
 * Pre: Element must exist
 * Post: The template is appended to that element, and the user has filled out the prewalkthrough information. The user is 
 * 	on the first subgoal.
 */

function preWalkthrough (id, file) {
	
	var el = $(id).contents().find('body');
	el.empty();
	appendTemplateToElement(el,file);
	seeMoreOnclick();
	

	//addClearOnclick();
	makeEditable();
	handlePreWalkthroughInfo();

}

/* Function seeMoreOnclick
 * 
 * Adds the functionality to the "See more..." link of the popup.html template.
 * 
 * Takes no arguments.
 *
 * Pre: The prewalkthrough template has been appended to the sidebar (so the elements that are referenced exist).
 * Post: The "see more..." link is functional.
 */
function seeMoreOnclick () {
	
	sidebarBody().find('body').on('click', '.moreOrLess', function() {
		var isOpen = $(this).attr("stateVar");
		
		//The "see more" is expanded and needs to be closed
		if (isOpen == 1) {
			$(this).attr("stateVar", 0);
			isOpen = $(this).attr("stateVar");
			sidebarBody().find(".complete").hide();
			sidebarBody().find(".preview").show();
			sidebarBody().find(".moreOrLess").html("See more");
		}
		
		//The "see more" is closed and needs to be expanded
		else {
			$(this).attr("stateVar", 1);
			isOpen = $(this).attr("stateVar");
			sidebarBody().find(".preview").hide();
			sidebarBody().find(".moreOrLess").html("See less");
			sidebarBody().find(".complete").show();
		}
		
	});
	
}

function restoreSave(prevHTML){

		
		sidebarBody().find("#persona").html(prevHTML);
		console.log("prevHTML", prevHTML);
		localStorage.removeItem("personaName");
}

//Save current HTML to local storage.
function addSaveOnclick () {


	var backupHTML = "ABBY!";
	localStorage.setItem("personaName", backupHTML);
	console.log("backup", backupHTML);
	//sidebarBody().find('body').on('click', '#saveButton', function() {
	
	
	//save the current state (html) unless user is done (clicked done button)      

		//saveHTML();
	//});
	
}

//Clear current HTML out of local storage.
function addClearOnclick () {
	console.log("clearing html")
	sidebarBody().find('body').on('click', '#clearButton', function() {
		clearHTML();
	});
	
}


/* Function makeEditable
 * 
 * Adds the functionality "Edit" buttons (e.g, for team name, persona, etc)
 * 
 * Takes no arguments.
 *
 * Pre: The prewalkthrough template has been appended to the sidebar (so the elements that are referenced exist).
 * Post: The edit buttons allow the user to edit their input.
 */
 
function makeEditable () {
	
	//Team name button
	sidebarBody().find('body').on('click', '#editTeam', function() {
		sidebarBody().find("#editTeam").hide();
		sidebarBody().find("#getTeam").show();
	});
	
	//Persona name button
	sidebarBody().find('body').on('click', '#editPersona', function() {
		sidebarBody().find("#editPersona").hide();
		sidebarBody().find("#personaInfo").hide();
		sidebarBody().find("#personaInfo").empty();
		sidebarBody().find("#getPersona").show();
		sidebarBody().find("#getPersona").children().show();
	});
	
	//Scenario name button
	sidebarBody().find('body').on('click', '#editScenario', function() {
		sidebarBody().find("#editScenario").hide();
		sidebarBody().find("#getScenario").show();
		sidebarBody().find("#getScenario").children().show();
	});
	
}

/* Function handlePreWalkthroughInfo
 * 
 * Handles the prewalkthrough information -- team name, persona choice, and scenario name. Asks the user for each of these in turn, 
 * 	and leaves the template ready to set up for the subgoal. 
 * 
 * Takes no arguments.
 *
 * Pre: The prewalkthrough template has been appended to the sidebar (so the elements that are referenced exist).
 * Post: The user's team name, persona selection, and scenario have been stored in the local storage variables:
 *			team name -> teamName
 *			persona choice -> personaName
 *			scenario -> scenarioName
 */

function handlePreWalkthroughInfo () {
	
	var sidebarHead = $("#mySidebar").contents().find("head");
	//Set team name
	sidebarBody().find('body').on('click', '#submitTeam', function() {
		
		//Get and save team name
		var userTeam = saveTeamNameLocal();
		
		//Display team name and edit button
		sidebarBody().find("#teamName").html("<b>Team:</b> "+ userTeam);
		sidebarBody().find("#editTeam").show();
		sidebarBody().find("#getTeam").hide();
		sidebarBody().find("#getPersona").show();
		
	});
	
	//Persona selection
	sidebarBody().find('body').on('click', '#submitPersona', function() {
		
		//Get and save persona selection
		var userPersona = savePersonaNameLocal();
		
		//Display persona selection and related info
		sidebarBody().find("#personaName").html("<b>Persona:</b> " + userPersona);
		loadPersona(userPersona);
		sidebarBody().find("#personaInfo").show();
		if ((userPersona == "Tim") || (userPersona == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		sidebarBody().find("#getPersona").children().hide();
		sidebarBody().find("#getPersona").hide();
		//Show Scenario
		sidebarBody().find("#getScenario").show();
		sidebarBody().find("#scenarioPrompt").html("Take a moment to describe the scenario " + userPersona + " will be performing");
		sidebarBody().find("#editPersona").show();
		//Show button to view persona
		sidebarBody().find("#viewPersona").show().html("Show " + userPersona);
		personaShown = true;
		var prevHTML = localStorage.getItem("personaName");
		if(prevHTML){
			restoreSave(prevHTML);
		}
		else{
			addSaveOnclick();
		}
		
	});
	
	//Get scenario name
	sidebarBody().find('body').on('click', '#submitScenario', function() {
		
		//Get and save scenario name
		var userScenario = saveScenarioNameLocal();
		
		//Display scenario and related info
		sidebarBody().find("#scenarioName").html("<b>Scenario:</b> " + userScenario);
		sidebarBody().find("#editScenario").show();
		
		sidebarBody().find("#getScenario").children().hide();
		sidebarBody().find("#getScenario").hide();
	
		//Show subtask
		sidebarBody().find("#getSubgoal").show();
		sidebarBody().find("#setup").hide();
		chrome.storage.local.get("personaName", function(result) {
			var userPersona = result.personaName;
			sidebarBody().find("#subgoalPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + userPersona + " to perform");
		});
		//sidebarBody().find("#subgoalPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + userPersona + " to perform");
		
		//Idea: here should go the "Does this look good, are you ready to start the CW" type of button
		
		//DEBUG: Test that local vars were stored correctly
		//USE THIS type of syntax to get vars out of local storage (returns the JSON object)
		chrome.storage.local.get(function(result){console.log(result)});
	});
	
	sidebarBody().find('body').on('click', '#submitSubgoal', function() {
		sidebarBody().find("#editTeam").hide();
		sidebarBody().find("#editPersona").hide();
		sidebarBody().find("#editScenario").hide();
		drawSubgoal(0,0);
	});
	
}	
	


















