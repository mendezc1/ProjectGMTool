/* Function setup
 * 
 * Sets up the initial state of the GenderMag bar with a the passed-in template (which should
 *		be "firstState.html" at this point. Adds onclicks to the two buttons.
 * 
 * Takes 2 arguements:
 * 		id: the id of the element to which the template will be appended (e.g. '#GenderMargFrame')
 * 		file: the LOCAL path of the template to use (e.g., "/templates/firstState.html")
 *
 * Pre: The element and the template must exist; The element must contain the buttons being referred to
 * Post: The element contains the template HTML; The buttons have the appropriate onclicks
 */

function setup (id, file) {
	
	console.log("In setup");
	//clearHTML();
	
	//Restore the state of the HTML if it exists, and otherwise draw the normal starting state
	chrome.storage.local.get("lastSavedHTML", function(result) {
		var HTMLtoAppend = result.lastSavedHTML;
		console.log("result ", result);
		if (HTMLtoAppend) {
			restoreHTML();
		}
		else {
			console.log("Nothing to restore - starting as normal");
			//Put the text and buttons on the screen
			var el = $(id).contents().find('body');
			appendTemplateToElement(el,file);
			
			//Add the onclick to the "Start Walkthrough" button	
			$(id).contents().find('body').children('#startGenderMagButton').on('click', function() {
				preWalkthrough("#GenderMagFrame", "./templates/popup.html");
			});
			
			//Add the onclick to the "Learn More" button
			$(id).contents().find('body').children('#learnMoreButton').on('click', function() {
				console.log("Learn more button clicked");
				overlayScreen();
				//addToolTip("setupToolTip");
			});
		}
	});
	
}