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
 * Post: The user's team name, persona selection, and scenario have been stored in the GLOBAL variables:
 *			team name -> teamName
 *			persona choice -> personaName
 *			scenario -> scenarioName
 */

function handlePreWalkthroughInfo () {
	
	var sidebarHead = $("#mySidebar").contents().find("head");
	//Set team name
	sidebarBody().find('body').on('click', '#submitTeam', function() {
		
		//Get and save team name
		teamName = sidebarBody().find("#teamInput").val();
		chrome.storage.local.set({'teamName': teamName}, function() {
			  // Notify that we saved.
			  console.log('teamName saved');
        });
		
		//Display team name and edit button
		sidebarBody().find("#teamName").html("Team: "+ teamName);
		sidebarBody().find("#editTeam").show();
		sidebarBody().find("#getTeam").hide();
		sidebarBody().find("#getPersona").show();
		
	});
	
	//Persona selection
	sidebarBody().find('body').on('click', '#submitPersona', function() {
		
		//Get and save persona selection
		personaName = sidebarBody().find("#personaSelection").val();
		chrome.storage.local.set({'personaName': personaName}, function() {
			  // Notify that we saved.
			  console.log('personaName saved');
        });
		
		//Display persona selection and related info
		sidebarBody().find("#personaName").html("Persona: " + personaName);
		loadPersona(personaName);
		if ((personaName == "Tim") || (personaName == "Patrick")) {
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
		sidebarBody().find("#scenarioPrompt").html("Take a moment to describe the scenario " + personaName + " will be performing");
		sidebarBody().find("#editPersona").show();
		//Show button to view persona
		sidebarBody().find("#viewPersona").show().html("Show " + personaName);
		personaShown = true;
		
		
	});
	
	//Get scenario name
	sidebarBody().find('body').on('click', '#submitScenario', function() {
		
		//Get and save scenario name
		scenarioName = sidebarBody().find("#scenarioInput").val();
		chrome.storage.local.set({'scenarioName': scenarioName}, function() {
			  // Notify that we saved.
			  console.log('scenarioName saved');
        });
		
		//Display scenario and related info
		sidebarBody().find("#scenarioName").html("Scenario: " + scenarioName);
		sidebarBody().find("#editScenario").show();
		
		sidebarBody().find("#getScenario").children().hide();
		sidebarBody().find("#getScenario").hide();
	
		//Show subtask
		sidebarBody().find("#getSubgoal").show();
		sidebarBody().find("#setup").hide();
		sidebarBody().find("#subgoalPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + personaName + " to perform");
		
		//Idea: here should go the "Does this look good, are you ready to start the CW" type of button
		
		//Test that local vars were stored correctly
		//USE THIS type of syntax to get vars out of local storage (returns the JSON object)
		chrome.storage.local.get(function(result){console.log(result)});
	});
	
	sidebarBody().find('body').on('click', '#submitSubgoal', function() {
		drawSubgoal(0,0,0);
	});
	
}	
	


















