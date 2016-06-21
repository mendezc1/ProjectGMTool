var subgoalArray = [];

//Creates a new subgoal and saves it to local storage at the end of subgoalArray
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
	//console.log("subgoalArray nonlocal: ", subgoalArray);
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


//Creates a new preIdealAction object and saves it to local storage on the current subgoal's actions
//Pre: subgoalArray isn't empty
function savePreIdealAction (name, yesnomaybe, whyText, facets) {
	var currArray = JSON.parse(localStorage.getItem('subgoalArray'));
	console.log("subgoal array in action", currArray);
	var targetSubgoal = currArray[currArray.length];
	console.log("targetSubgoal", targetSubgoal);
	var preIdealAction = {
		actionId: targetSubgoal.actions.length + 1,
		name: name,
		subgoalId: targetSubgoal.id, 
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets
	};
	
	console.log("incoming preAction", preIdealAction);
}

//Creates a new postIdealAction object and saves it to local storage on the current subgoal's actions
//Pre: subgoalArray isn't empty
function savePostIdealAction (name, yesnomaybe, whyText, facets) {
	var currArray = JSON.parse(localStorage.getItem('subgoalArray'));
	var targetSubgoal = currArray[currArray.length];
	var postIdealAction = {
		actionId: targetSubgoal.actions.length + 1,
		name: name,
		subgoalId: targetSubgoal.id, 
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets
	};
	
	console.log("incoming postAction", postIdealAction);
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