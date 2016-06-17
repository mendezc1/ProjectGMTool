var subgoalArray = [];

//Creates a new subgoal object
//Call using var x = addSubgoal(id, name, numActions);
function saveSubgoal (id, name, numActions) {
	var subgoal = {
		id: id,
		name: name,
		numActions: numActions,
		actions: []
	};
	console.log("incoming subgoal", subgoal);
	subgoalArray.push(subgoal);
	console.log("Array 1: ", subgoalArray);
	chrome.storage.local.set({'subgoalArray': subgoalArray});
}

//Creates a new idealAction object
function saveIdealAction (id, name, idOfSubgoal, el) {
	var idealAction = {
		id: id,
		name: name,
		idOfSubgoal: idOfSubgoal
		//Begin props for answers
		/* YNMyes:
		whyYes:
		YNMno:
		whyNo:
		YNMmaybe:
		whyMaybe:
		motiv:
		info:
		self:
		risk:
		tinker: */
	};
	console.log("incoming action", idealAction);
	subgoalArray[(idOfSubgoal-1)].actions.push(idealAction);
	console.log("array 2: ", subgoalArray);
}




//Save the team name
function saveTeamNameLocal () {
	teamName = sidebarBody().find("#teamInput").val();
	chrome.storage.local.set({'teamName': teamName}, function() {
		  // Notify that we saved.
		  //console.log('teamName saved');
	});
}

//Save the persona name
function savePersonaNameLocal () {
	personaName = sidebarBody().find("#personaSelection").val();
	chrome.storage.local.set({'personaName': personaName}, function() {
		  // Notify that we saved.
		  //console.log('personaName saved');
	});
}

//Save scenario name
function saveScenarioNameLocal () {
	scenarioName = sidebarBody().find("#scenarioInput").val();
	chrome.storage.local.set({'scenarioName': scenarioName}, function() {
		  // Notify that we saved.
		  //console.log('scenarioName saved');
	});
}