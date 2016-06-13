
function takeScreenShot() {
	console.log("screen shot");
	chrome.windows.getCurrent(function (win) {    
    	chrome.tabs.captureVisibleTab(win.id,{"format": "png"}, function(imgUrl) {	
    		//var myImg = document.getElementById("previewImage");
        	//myImg.src = imgUrl;
        });    
	});
	//numScreenShots++;
};