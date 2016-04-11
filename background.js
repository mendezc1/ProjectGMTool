console.log( 'Background.html starting!' );
var screenShotURL;
	/*Put page action icon on all tabs*/
	chrome.tabs.onUpdated.addListener(function(tabId) {
		chrome.pageAction.show(tabId);
	});

	chrome.tabs.getSelected(null, function(tab) {
		chrome.pageAction.show(tab.id);
	});
	
/*	chrome.tabs.onUpdated.addListener(function() {
	  //chrome.tabs.executeScript(null, { file: "./jquery-ui-1.11.4.custom/jquery-ui.js" }, function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(
				//Selected tab id
				tab.id,
				//Params inside a object data
				{callFunction: "toggleSidebar"}, 
				//Optional callback function
				function(response) {
					console.log(response);
				}
			);
		});
	  //});   
	});
	
*/	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.greeting == "takeScreenShot"){	
				chrome.extension.getBackgroundPage().console.log("After image");
	
				chrome.windows.getCurrent(function (win) {    
				chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {
					screenShotURL = imgUrl
					chrome.extension.getBackgroundPage().console.log(screenShotURL);	
					});    
				});
				sendResponse({farewell: screenShotURL});
			}
	});
	
	/*Send request to current tab when page action is clicked*/
	chrome.pageAction.onClicked.addListener(function(tab) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(
				//Selected tab id
				tab.id,
				//Params inside a object data
				{callFunction: "toggleSidebar"}, 
				//Optional callback function
				function(response) {
					console.log(response);
				}
			);
		});
	});
console.log( 'Background.html done.' );
