var subgoalArray = [];

//Creates a new subgoal object
//Call using var x = addSubgoal(id, name, numActions);
function saveSubgoal (name, yesnomaybe, whyText, facets) {
	var subgoal = {
		id: subgoalArray.length + 1,
		name: name,
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets,
		actions: []
	};
	console.log("incoming subgoal", subgoal);
	subgoalArray.push(subgoal);
	console.log("subgoalArray nonlocal: ", subgoalArray);
	localStorage.setItem("subgoalArray", JSON.stringify(subgoalArray));
	
	//Test that it worked
	var retrieved = JSON.parse(localStorage.getItem('subgoalArray'));
	console.log("subgoalArray local: ", subgoalArray);
	
	addToSandwich("subgoal",subgoal);
}

function addToSandwich(type, item){
	if(!type.localeCompare("subgoal")){ 		//It's a subgoal
		var sideSubgoal = '<div style="border:1px solid CornFlowerBlue; margin:5px;" id="sideSubgoal' + item.id + '">Subgoal ' + item.id + ': ' + item.name + '</div>';
		sidebarBody().find("#subgoalList").append(sideSubgoal);
	}
	
	
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

/*	Saves the passed variable to HTML5 local storage.
*	Takes 2 arguments: what you want the item to be called, and the item to save.
*	Pre: item must exist
*	Post: item is in local storage.
*/
function saveVarToLocal (nameOfThingToSave, thingToSave) {
	localStorage.setItem(nameOfThingToSave, JSON.stringify(thingToSave));
	console.log("Saved: " + nameOfThingToSave + " " + thingToSave);
}


/*	Gets the passed variable to HTML5 local storage, if it exists.
*	Takes 1 argument: the name of the item.
*	Pre: None
*	Post: If the item by that name is in local storage, it returns the item. If it's not, it returns null.
*/
function getVarFromLocal (nameOfThing) {
	var item = JSON.parse(localStorage.getItem(nameOfThing));
	if (item) {
		console.log("Found: " + nameOfThing + " " + item);
		return item;
	}
	else {
		console.log("Couldn't find variable " + nameOfThing + "in local storage");
		return null;
	}
}







//Test code for storing/retrieving/accessing arrays in local storage
	/*	var testArray = ["checked", 1, false];
		console.log(testArray);
		localStorage.setItem("testArray", JSON.stringify(testArray));
		var retrievedObject = JSON.parse(localStorage.getItem('testArray'));
		console.log(retrievedObject[1]);
	*/





/* Deprecated. Uses chrome local storage rather than HTML 5 local storage.


//Save the entire HTML of the slider to local storage
function saveHTML () {   //hot male lol
	
	var currentHTML = sidebarBody().find("body").html();
    console.log("saving HTML");
	
	//Save to local storage
	chrome.storage.local.set({'lastSavedHTML': currentHTML}, function() {
		console.log("HTML saved");
	});
	//chrome.storage.local.get(function(result){console.log(result)});
	
	//Begin test of code - empties the body then puts it back from local storage
	/* sidebarBody().find("body").empty();
	alert("putting code back");
	chrome.storage.local.get("lastSavedHTML", function(result) {
			var HTMLtoAppend = result.lastSavedHTML;
			sidebarBody().find("body").html(HTMLtoAppend);
			console.log("body should be back");
	});
	
}

//Restore the last saved HTML of the slider from local storage
//If element isn't initialized and this is called, it'll wipe the slider - so check for ==NULL
function restoreHTML () {
	chrome.storage.local.get("lastSavedHTML", function(result) {
			var HTMLtoAppend = result.lastSavedHTML;
			sidebarBody().find("body").html(HTMLtoAppend);
			console.log("body should be back", HTMLtoAppend);
	});
}

//Clear the lastSavedHTML in local storage. Mostly for testing purposes.
function clearHTML () {
	chrome.storage.local.set({'lastSavedHTML': null}, function() {
		console.log("set lastSavedHTML to null");
	});
}



//Save the team name
function saveTeamNameLocal () {
	var teamName = sidebarBody().find("#teamInput").val();
	chrome.storage.local.set({'teamName': teamName}, function() {
		  // Notify that we saved.
		  //console.log('teamName saved');
	});
	return teamName;
}

//Save the persona name
function savePersonaNameLocal () {
	var personaName = sidebarBody().find("#personaSelection").val();
	chrome.storage.local.set({'personaName': personaName}, function() {
		  // Notify that we saved.
		  //console.log('personaName saved');
	});
	return personaName;
}

//Save scenario name
function saveScenarioNameLocal () {
	var scenarioName = sidebarBody().find("#scenarioInput").val();
	chrome.storage.local.set({'scenarioName': scenarioName}, function() {
		  // Notify that we saved.
		  //console.log('scenarioName saved');
	});
	return scenarioName;
}

End deprecated code. */