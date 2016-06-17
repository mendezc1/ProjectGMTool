function addToolTip(toolTipName){
	var pageDiv = document.createElement("div");
			pageDiv.id = toolTipName+"Div";
			document.body.appendChild(pageDiv);
			pageDiv.style.position="absolute";
			pageDiv.style.right = "0%";
			pageDiv.style.top = "0%";
			pageDiv.style.height = "200px";
			pageDiv.style.width = "500px";
			pageDiv.style.zindex = "10002";	
			pageDiv.style.border ="5px ridge #4099FF";
			pageDiv.style.backgroundColor = "white";
	appendTemplateToElement($("#"+toolTipName+"Div"), 'templates/' + toolTipName + '.html');
	$("#"+toolTipName+"Div").draggable();
		console.log("HostBusters!");
	$("#" + toolTipName + "Button").on('click', function() {
	
		$("#" + toolTipName + "Div").remove();
		//overlayScreen();
	});
}