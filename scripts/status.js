var statusObject = {
	openedSlider: "",
	startedGM: "",
	gotTeamName: "",
	gotPersonaName: "",
	gotScenarioName: "",
	finishedPrewalkthrough: "",
	gotSubgoalName: "",
	gotSubgoalQuestions: "",
	gotActionName: "",
	gotPreActionQuestions: "",
	gotScreenshot: "",
	gotPostActionQuestions: "",
	finishedSubgoal: "",
	finishedGM: ""
}

function initStatusObject () {
	localStorage.setItem("statusObject", JSON.stringify(statusObject));
}

function getStatusObject () {
	var obj = JSON.parse(localStorage.getItem(statusObject));
	return obj;
}

function saveStatusObject (obj) {
	localStorage.setItem("statusObject", JSON.stringify(obj));
}

function setPhasersToTrue (key) {
	var obj = getStatusObject();
	if (obj) {
		obj.key = "true";
		saveStatusObject();
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}

function setPhasersToFalse (key) {
	var obj = getStatusObject();
	if (obj) {
		obj.key = "false";
		saveStatusObject();
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}

function setPhasersToStun (key) {			//Sets the key's value to an empty string.
	var obj = getStatusObject();
	if (obj) {
		obj.key = "";
		saveStatusObject();
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}