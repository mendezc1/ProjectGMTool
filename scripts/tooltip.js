function addToolTip(toolTipName){
	//drawObject("div", toolTipName);
	console.log("testing")
	var sidebarBody = $("#GenderMagFrame").contents().find("body");
	appendTemplateToElement(sidebarBody, 'templates/setupToolTip.html');
	sidebarBody.contents().find(".closeToolTip").on('click', function() {
		console.log("setup tooltip");
		sidebarBody.contents().find(".preview").remove();
		sidebarBody.contents().find(".complete").remove();
		sidebarBody.contents().find(".closeToolTip").remove();
		overlayScreen();
	});
}