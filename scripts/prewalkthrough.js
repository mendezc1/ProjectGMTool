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
	handlePreWalkthroughInfo();

}

/* Function handlePreWalkthroughInfo
 * 
 * Handles the prewalkthrough information -- team name, persona choice, and scenario name. Asks the user for each of these in turn, 
 * 	and leaves the template ready to set up for the next subtask.
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
	
	//Set team name
	sidebarBody().find('body').on('click', '#submitTeam', function() {
		//Get and save team name
		teamName = sidebarBody().find("#teamInput").val();
		chrome.storage.local.set({'teamName': teamName}, function() {
			  // Notify that we saved.
			  console.log('teamName saved');
        });
		
		//Display team name
		sidebarBody().find("#teamName").html("Team Name: "+ teamName);
		sidebarBody().find("#getTeam").remove();
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
		sidebarBody().find("#personaName").html("Persona Name: " + personaName + "<br>");
		if ((personaName == "Tim") || (personaName == "Patrick")) {
			pronoun = "he";
			possessive = "his";
		} else {
			pronoun = "she";
			possessive = "her";
		}
		sidebarBody().find("#getPersona").children().remove();
		sidebarBody().find("#getPersona").remove();
		//Show Scenario
		sidebarBody().find("#getScenario").children().show();
		sidebarBody().find("#scenarioPrompt").html("Take a moment to describe the scenario " + personaName + " will be performing");
		//Show button to view persona
		sidebarBody().find("#viewPersona").show().html("Show " + personaName);
		personaShown = true;
		sidebarBody().find("#getScenario").show();
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
		sidebarBody().find("#scenarioName").html("Scenario Description: " + scenarioName);
		
		sidebarBody().find("#getScenario").children().remove();
		sidebarBody().find("#getScenario").remove();
	
		//Show subtask
		sidebarBody().find("#getSubgoal").children().show;
		sidebarBody().find("#setup").remove();
		sidebarBody().find("#subgoalPrompt").html("Now that you've completed the initial setup, enter a subgoal for " + personaName + " to perform");
		
		//Test that local vars were stored correctly
		//USE THIS type of syntax to get vars out of local storage (returns the JSON object)
		chrome.storage.local.get(function(result){console.log(result)});
		
	});
	

}


















