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
    drewToolTip: "",
    gotScreenshot: "",
	gotPreActionQuestions: "",
	gotPostActionQuestions: "",
	finishedSubgoal: "",
	finishedGM: ""
}

function initStatusObject () {
	localStorage.setItem("statusObject", JSON.stringify(statusObject));
    console.log("Initializing status object...");
}

function getStatusObject () {
	var obj = JSON.parse(localStorage.getItem("statusObject"));
	return obj;
}

function saveStatusObject (obj) {
	localStorage.setItem("statusObject", JSON.stringify(obj));
}

function statusIsTrue(keyToCheck) {
    var obj = getStatusObject();
	if (obj) {
		if (obj[keyToCheck] == "true") {
            return true;
        }
        else {
            return false;
        }
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}

function setPhasersToTrue (keyToChange) {
	var obj = getStatusObject();
	if (obj) {
		obj[keyToChange] = "true";
		saveStatusObject(obj);
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}

function setPhasersToFalse (keyToChange) {
	var obj = getStatusObject();
	if (obj) {
		obj[keyToChange] = "false";
		saveStatusObject(obj);
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}

function setPhasersToStun (keyToChange) {			//Sets the key's value to an empty string.
	var obj = getStatusObject();
	if (obj) {
		obj[keyToChange] = "";
		saveStatusObject(obj);
	}
	else {
		console.log("statusObject doesn't exist in local");
	} 
}