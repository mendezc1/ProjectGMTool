var subgoalArray = [];

//Creates a new subgoal and saves it to local storage at the end of subgoalArray
function saveSubgoal (id, name, yesnomaybe, whyText, facets) {
	var subgoal = {
		id: id,
		name: name,
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets,
		actions: []
	};
	console.log("incoming subgoal", subgoal, id, subgoalArray.length);
	if(id > subgoalArray.length){
	
	subgoalArray[id-1] = subgoal;
	console.log("subgoalArray nonlocal: ", subgoalArray);
	localStorage.setItem("subgoalArray", JSON.stringify(subgoalArray));
	
	//Test that it worked
	//var retrieved = JSON.parse(localStorage.getItem('subgoalArray'));
	//console.log("subgoalArray local: ", retrieved);
	
	addToSandwich("subgoal",subgoal);
	}
	else{
		console.log("nothing to see here")
	}
}

function addToSandwich(type, item){
	
	if(!type.localeCompare("subgoal")){ 		//It's a subgoal
		var sideSubgoal = '<div style="border:2px solid CornFlowerBlue; margin:5px;" id="sideSubgoal' + item.id + '">Subgoal ' + item.id + ': ' + item.name + '</div>';
		sidebarBody().find("#subgoalList").append(sideSubgoal);
		sidebarBody().find("#sideSubgoal" + item.id).click(function(){
			drawSubgoal(item.id);
		});
	}
	if(!type.localeCompare("idealAction") && item.name){ 	//It's an action
		var sideAction = '<div style="border:1px solid CornFlowerBlue; margin:5px;" id="sideAction' + item.actionId + '">Action ' + item.actionId + ': ' + item.name + '</div>';
		sidebarBody().find("#subgoalList").append(sideAction);
		//console.log("added to sammich", item.actionId, item.name);
		var actionNum = localStorage.getItem("numActions");
		actionNum++;
		localStorage.setItem("numActions", actionNum);
		sidebarBody().find("#sideAction" +item.actionId).click(function(){
			drawAction(item.actionId, item.subgoalId);
			sidebarBody().find('#actionNameInput').html("Camera action");
			sidebarBody().find('#submitActionName').click();
		});
	}
	
}


//Creates a new preIdealAction object and saves it to local storage on the current subgoal's actions
//Pre: subgoalArray isn't empty
function savePreIdealAction (name, yesnomaybe, whyText, facets) {
    
	var currArray = getSubgoalArrayFromLocal();
    //console.log(currArray);
	var targetSubgoal = currArray[(currArray.length - 1)];
	//console.log("targetSubgoal", targetSubgoal);
	var preIdealAction = {
		actionId: targetSubgoal.actions.length + 1, //Check this when done
		name: name,
		subgoalId: targetSubgoal.id, 
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets
	};
	
	console.log("incoming preAction", preIdealAction);
    //Save to local so that we can get it later and stick it in the array with its corresponding postAction
    saveVarToLocal("currPreAction", preIdealAction);
	localStorage.setItem("inMiddleOfAction", "true");		//So we know to retrieve the in-between state
    
}

//Creates a new postIdealAction object and saves it to local storage on the current subgoal's actions
//Pre: subgoalArray isn't empty, and the current preAction isn't null
function savePostIdealAction (name, yesnomaybe, whyText, facets) {
    var currPreAction = getVarFromLocal("currPreAction");
    //console.log("incoming preAction", currPreAction);
	var postIdealAction = {
		actionId: currPreAction.actionId,  //Check this when done
		name: name,
		subgoalId: currPreAction.subgoalId, 
		ynm: yesnomaybe,
		why: whyText,
		facetValues: facets
	};
	
	console.log("incoming postAction", postIdealAction);
    //Put them together and save
    glueActionsAndSave(currPreAction, postIdealAction);
}


/*	Puts the pre and post actions into an object and sticks it in the target subgoal's actions array.
*	Takes 2 arguments: preIdealAction, postIdealAction
*	Pre: both must exist
*	Post: target subgoal's actions array has an action object made of pre and post action objects.
*/
function glueActionsAndSave (preAction, postAction) {
    
    //Get the associated image's URL from local
    var currImgURL = localStorage.getItem("currImgURL");
    //console.log(currImgURL);
    
    //Make the object
    var idealAction = {
        id: preAction.actionId,
        name: preAction.name,
        imgURL: currImgURL,
        preAction: preAction,
        postAction: postAction
    }
    console.log("incoming ideal action: ", idealAction);
    
    //Save it to local
    var currArray = getSubgoalArrayFromLocal();
    if (!currArray) {
        console.log("Something went wrong, can't find the subgoal array");
    }
    else {
        var targetSubgoal = currArray[(currArray.length - 1)];      //The last subgoal added
        targetSubgoal.actions.push(idealAction);
        //console.log("sub with action: ", targetSubgoal);
        currArray[(currArray.length - 1)] = targetSubgoal;
        localStorage.setItem("subgoalArray", JSON.stringify(currArray));   //Update the subgoal array
    }
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
		return "";
	}
}


/*	Gets the subgoal array object our of local storage and converts it to an array, then returns it.
*   If it doesn't exist, returns null.
*	Takes no args.
*/
function getSubgoalArrayFromLocal() {
    var currObj = JSON.parse(localStorage.getItem('subgoalArray'));
    if (!currObj) {
        console.log("Couldn't find subgoalArray in local storage");
        return null;
    }
    else{
        var currArray = $.map(currObj, function(el) { return el });     //Turn it into an array
        return currArray;
    }
}




//Test code for storing/retrieving/accessing arrays in local storage
	/*	var testArray = ["checked", 1, false];
		console.log(testArray);
		localStorage.setItem("testArray", JSON.stringify(testArray));
		var retrievedObject = JSON.parse(localStorage.getItem('testArray'));
		console.log(retrievedObject[1]);
	*/