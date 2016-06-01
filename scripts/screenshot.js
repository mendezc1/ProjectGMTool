

function takeScreenShot() {
	console.log("screen shot");
	chrome.windows.getCurrent(function (win) {    
    	chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {
            chrome.extension.getBackgroundPage().console.log("The image url", imgUrl);  
			var screenShotLink = $("<a>", {
				id: "screenShotLink" + numSubtasks + "-" + numScreenShots,
				html: "Click here, then show me the action",
				href: imgUrl
			});
			$("#screenShot" + numSubtasks + "-" + numScreenShots).append(screenShotLink);
		});    
	});
	numScreenShots++;
};