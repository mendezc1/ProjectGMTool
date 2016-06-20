function addToolTip(toolTipName){
	if($("#"+toolTipName + "Div")){
		$("#"+toolTipName+"Div").remove();
	}

		var pageDiv = document.createElement("div");
		pageDiv.id = toolTipName+"Div";
		document.body.appendChild(pageDiv);
		pageDiv.style.position="fixed";
		pageDiv.style.right = "50px";
		pageDiv.style.top = "30px";//sidebarBody().find("#picGoesHere").top + "px";
		
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
		});
	
}