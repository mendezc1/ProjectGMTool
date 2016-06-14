function addToolTip(toolTipName){
	//drawObject("div", toolTipName);
	console.log("testing")
	var sidebarBody = $("#GenderMagFrame").contents().find("body");
	appendTemplateToElement(sidebarBody, 'templates/' + toolTipName + '.html');
	sidebarBody.contents().find("#" + toolTipName + "Button").on('click', function() {
		console.log("setup tooltip");
		sidebarBody.contents().find("#" + toolTipName).remove();
		overlayScreen();
	});
}