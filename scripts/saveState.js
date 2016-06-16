var subgoalArray = [];

var idealAction = {
	id: "",
	name: "",
	idOfSubgoal: ""
};



//Creates a new subgoal object
//Call using var x = addSubgoal(id, name, numActions);
function addSubgoal (id, name, numActions) {
	var subgoal = {
		id: id,
		name: name,
		numActions: numActions	
	};
	console.log("incoming subgoal", subgoal);
}

//Creates a new idealAction object
//Call using var x = addIdealAction(id, name, idOfSubgoal);
function addIdealAction (id, name, idOfSubgoal) {
	var idealAction = {
		id: id,
		name: name,
		idOfSubgoal: idOfSubgoal
	};
	console.log("incoming action", idealAction);
}




//Save the team name
function saveTeamNameLocal () {
	teamName = sidebarBody().find("#teamInput").val();
	chrome.storage.local.set({'teamName': teamName}, function() {
		  // Notify that we saved.
		  console.log('teamName saved');
	});
}

//Save the persona name
function savePersonaNameLocal () {
	personaName = sidebarBody().find("#personaSelection").val();
	chrome.storage.local.set({'personaName': personaName}, function() {
		  // Notify that we saved.
		  console.log('personaName saved');
	});
}

//Save scenario name
function saveScenarioNameLocal () {
	scenarioName = sidebarBody().find("#scenarioInput").val();
	chrome.storage.local.set({'scenarioName': scenarioName}, function() {
		  // Notify that we saved.
		  console.log('scenarioName saved');
	});
}