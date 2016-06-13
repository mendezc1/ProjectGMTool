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
	
	//Put the text and buttons on the screen
	var el = $(id).contents().find('body');
	appendTemplateToElement(el,file);
	
	//Add the onclick to the "Start Walkthrough" button	
	$(id).contents().find('body').children('#startGenderMagButton').on('click', function() {
		importStylesheet($("#GenderMagFrame").contents().find("body"), "./styles/styles.css");
		preWalkthrough("#GenderMagFrame", "./templates/popup.html");
	});
	
	//Add the onclick to the "Learn More" button
	$(id).contents().find('body').children('#learnMoreButton').on('click', function() {
		console.log("Learn more button clicked");
		addToolTip("setupToolTip");
	});
	
}