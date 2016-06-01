/* Function preWalkthrough
 * DON'T QUITE TRUST THIS YET
 * Appends the HTML template found in <file> to the element with the ID of <id>.
 * 
 * Takes 2 arguements:
 * 		id: the id of the element to which the template will be appended
 * 		file: the LOCAL path of the template to use (e.g., "/templates/popup.html")
 *
 * Pre: element must exist
 * Post: The template is appended to that element
 */

function preWalkthrough (id, file) {
	
	var el = $(id).contents().find('body');
	el.empty();
	appendTemplateToElement(el,file);
	handlePreWalkthroughInfo(id);
	
}

/* Function handlePreWalkthroughInfo
 * DON'T QUITE TRUST THIS YET
 * TEXT
 * 
 * Takes X arguements:
 * 		X1: 
 * 		X2: 
 *
 * Pre: 
 * Post: 
 */

/*function handlePreWalkthroughInfo (id) {
	
	console.log("Here in handle");
	
	//Set team name
	$(id).contents().find('body').children('#submitTeam').on('Click', function() {
		alert('hi');
	});
	
	console.log("exiting handle");
}*/