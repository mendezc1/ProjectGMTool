
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  console.log("renderimage" , request);
    if (request.callFunction == "renderImage"){
//    console.log("rendering image" , request.imgURL);
		renderImage(request.imageUrl);
        localStorage.setItem("currImgURL", request.imageUrl);
	}
});


function overlayScreen(onlyDraw){
	
	if (onlyDraw == "onlyToolTip") {
		closeSlider();
		if(!document.getElementById('genderMagCanvasContainer')){
			console.log("in if");
			var canvasContainer = document.createElement('div');
				// Add the div into the document
		}
		else{
			var canvasContainer = document.getElementById('genderMagCanvas');	
		}
		
		canvasContainer.id = "genderMagCanvasContainer";
		canvasContainer.style.position="fixed";
		// Set to 100% so that it will have the dimensions of the document
		canvasContainer.style.left="0px";
		canvasContainer.style.top="0px";
		canvasContainer.style.width="100%";
		canvasContainer.style.height="100%";
		canvasContainer.style.zIndex="1000";
		document.body.appendChild(canvasContainer);
		
		var canvas = document.createElement('canvas');
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.id = "genderMagCanvas";
		canvas.position = "fixed";
		//canvas.style.cssText = "z-index:100; background:blue; width:100%; height:100%;";
		canvas.style.opacity = .50;
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvas.style.overflow = 'visible';
		canvas.style.position = 'fixed';
		canvasContainer.appendChild(canvas);


		var genderMagCanvas = document.getElementById('genderMagCanvas'),
			ctx = genderMagCanvas.getContext('2d'),
			rect = {},
			drag = false;
		
		
		//
		elm = document.elementFromPoint(rect.startX, rect.startY);
		var elements = new Array();
		while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
		{
			elements.push(elm);
			elm.style.display = "none";
			elm = document.elementFromPoint(rect.startX, rect.startY);
		}
		var toolTip = document.createElement("div");
	toolTip.id = "myToolTip";
	toolTip.style.position = "absolute";
	toolTip.style.left = elm.offsetLeft+100 + "px";
	toolTip.style.top = elm.offsetTop+100 + "px";
	toolTip.style.height = "300px";
	toolTip.style.width = "500px";
	toolTip.style.zindex = "10002";	
	toolTip.style.border ="3px solid #999999";
	toolTip.style.backgroundColor = "white";
	toolTip.style.cursor="pointer";
	toolTip.style.borderRadius="5px";
    setPhasersToTrue("drewToolTip");
	
	document.body.appendChild(toolTip);
	$('#myToolTip').draggable();
	//addToolTip("imageCanvas");

	appendTemplateToElement(toolTip ,"./templates/action.html");
	$(".closeToolTip").click(function() {
		//toolTip.remove();
		//toolTip.innerHTML = " ";
        setPhasersToTrue("gotScreenshot");
        preActionQuestions(toolTip);
	});
	$("#retakeImage").click(function(){
		toolTip.remove();
        setPhasersToFalse("drewToolTip");
		overlayScreen();
		overlayScreen();
	});
	$("#imageBack").click(function(){
		openSlider();
	});
	var actionSpan = localStorage.getItem("currActionName");
	$(".actionNameSpan").html(actionSpan.slice(1,actionSpan.length-1));
	//$(".previewTrigger").click(function(){ //#triggered
	//	window.open(imgURL);
	//});
		var canvas = document.getElementById("imageCanvas");
		var context = canvas.getContext("2d");
		var myImg = document.getElementById("previewImage");
		var imgURL = localStorage.getItem("currImgURL");
		if (imgURL) {
            myImg.src = imgURL;
        }
        else {
             myImg.src = localStorage.getItem("currImgURL");
        }
		var imageRatio = myImg.width/myImg.height;
		var ratioHeight = myImg.height * 0.75;
		var ratioWidth = imageRatio*ratioHeight;
		console.log("my image", myImg.height, myImg.width, imageRatio, ratioHeight, ratioWidth);
		var sourceY = elm.offsetTop;
		var sourceX = elm.offsetLeft;
		
		if(elm.offsetLeft > 90)
			var sourceX = elm.offsetLeft -90;//-(elm.offsetLeft/16);
		if(elm.offsetTop > 60)
			var sourceY = elm.offsetTop -60;//+ (elm.offsetTop/8);

    	console.log("Source x and y: ", elm.offsetLeft, elm.offsetTop, sourceX, sourceY);
    	var destWidth = myImg.width-ratioWidth;
    	var destHeight = myImg.height-ratioHeight;
		var sourceWidth = myImg.width - destWidth;
   		var sourceHeight = myImg.height - destHeight;
    	var destX = canvas.width / 2 - destWidth / 2;
    	var destY = canvas.height / 2 - destHeight / 2;
 		context.drawImage(myImg, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, ratioWidth, ratioHeight);
		
}
	
	else {
		closeSlider();
	if(!document.getElementById('genderMagCanvasContainer')){
		console.log("In overlayScreen");
		var canvasContainer = document.createElement('div');
			// Add the div into the document
	}
	else{
		var canvasContainer = document.getElementById('genderMagCanvas');	
	}
	
		canvasContainer.id = "genderMagCanvasContainer";
		canvasContainer.style.position="fixed";
		// Set to 100% so that it will have the dimensions of the document
		canvasContainer.style.left="0px";
		canvasContainer.style.top="0px";
		canvasContainer.style.width="100%";
		canvasContainer.style.height="100%";
		canvasContainer.style.zIndex="1000";
		document.body.appendChild(canvasContainer);
		
		var canvas = document.createElement('canvas');
		canvas.style.width = canvasContainer.scrollWidth+"px";
		canvas.style.height = canvasContainer.scrollHeight+"px";
		canvas.id = "genderMagCanvas";
		canvas.position = "fixed";
		//canvas.style.cssText = "z-index:100; background:blue; width:100%; height:100%;";
		canvas.style.opacity = .50;
		canvas.width=canvasContainer.scrollWidth;
		canvas.height=canvasContainer.scrollHeight;
		canvas.style.overflow = 'visible';
		canvas.style.position = 'fixed';
		canvasContainer.appendChild(canvas);


		var genderMagCanvas = document.getElementById('genderMagCanvas'),
			ctx = genderMagCanvas.getContext('2d'),
			rect = {},
			drag = false;
		
	
		function init() {
			genderMagCanvas.addEventListener('mousedown', mouseDown, false);
			genderMagCanvas.addEventListener('mouseup', mouseUp, false);
			genderMagCanvas.addEventListener('mousemove', mouseMove, false);			
		}
		function mouseDown(e) {
			rect.startX = e.pageX - this.offsetLeft;
			rect.startY = e.pageY - this.offsetTop;
			drag = true;
		}			
		function mouseUp(e) {
			drag = false;
			console.log(rect);
			globXY = [e.pageX,e.pageY];
			elm = document.elementFromPoint(rect.startX, rect.startY);
			var elements = new Array();
			while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
			{
				elements.push(elm);
				elm.style.display = "none";
				elm = document.elementFromPoint(rect.startX, rect.startY);
			}
			console.log("element" , elm.innerText, elm.textContent);
			var highlightClick = document.createElement("div");
			highlightClick.id = "highlightClick";
		//	document.body.appendChild(highlightClick);
			highlightClick.style.position = "absolute";
			highlightClick.style.left = elm.offsetLeft + "px";
			highlightClick.style.top = elm.offsetTop + "px";
			highlightClick.style.height = elm.offsetHeight + "px";
			highlightClick.style.width = elm.offsetWidth + "px";
			highlightClick.style.border = "3px solid orange";
			highlightClick.style.opacity = "0.5";
			highlightClick.style.zindex = "10000";
	
			console.log("Clicked ", highlightClick)
            setPhasersToTrue("highlightedAction");
		
			console.log(elements);
			for(var element in elements){
				if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
					element.style.display = "default";
				}
			}
		chrome.runtime.sendMessage({greeting: "takeScreenShot"}, function(response) {
				
		});


		console.log("sending message");
		setTimeout(function(){
		//	document.getElementById("highlightClick").remove();
			$("#highlightHover").remove();
		}, 2000);
		}
		function mouseMove(e) {
			if (drag) {
				rect.w = (e.pageX - this.offsetLeft) - rect.startX;
				rect.h = (e.pageY - this.offsetTop) - rect.startY ;
				ctx.clearRect(0,0,canvas.width,canvas.height);				
				draw();
			}
			if($("#highlightHover")){
				rect.startX = e.pageX - this.offsetLeft;
				rect.startY = e.pageY - this.offsetTop;
				var hoverElm = document.elementFromPoint(rect.startX, rect.startY);
				rect.w = (e.pageX - this.offsetLeft) - rect.startX;
				rect.h = (e.pageY - this.offsetTop) - rect.startY ;

				$("#highlightHover").remove();
				var highlightHover = document.createElement("div");
				highlightHover.id = "highlightHover";
				document.body.appendChild(highlightHover);
				highlightHover.style.position = "absolute";
				highlightHover.style.left = rect.startX-30 + "px";
				highlightHover.style.top = rect.startY-20 + "px";
				highlightHover.style.height = "50" + "px";
				highlightHover.style.width = "100" + "px";
				highlightHover.style.border = "3px solid orange";
				highlightHover.style.opacity = "0.5";
				highlightHover.style.zindex = "10000";
				//console.log("Hovered if", hoverElm)
			}
			else{
				var highlightHover = document.createElement("div");
				highlightHover.id = "highlightHover";
			}
		}
		function draw() {
			ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
		}
		init();

}}

function renderImage(imgURL){

	var toolTip = document.createElement("div");
	toolTip.id = "myToolTip";
	toolTip.style.position = "absolute";
	toolTip.style.left = elm.offsetLeft+100 + "px";
	toolTip.style.top = elm.offsetTop+100 + "px";
	toolTip.style.height = "300px";
	toolTip.style.width = "500px";
	toolTip.style.zindex = "10002";	
	toolTip.style.border ="3px solid #999999";
	toolTip.style.backgroundColor = "white";
	toolTip.style.cursor="pointer";
	toolTip.style.borderRadius="5px";
    setPhasersToTrue("drewToolTip");
	
	document.body.appendChild(toolTip);
	$('#myToolTip').draggable();
	//addToolTip("imageCanvas");

	appendTemplateToElement(toolTip ,"./templates/action.html");
	$(".closeToolTip").click(function() {
		//toolTip.remove();
		//toolTip.innerHTML = " ";
        setPhasersToTrue("gotScreenshot");
        preActionQuestions(toolTip);
	});
	$("#retakeImage").click(function(){
		toolTip.remove();
        setPhasersToFalse("drewToolTip");
		overlayScreen();
	});
	$("#imageBack").click(function(){
		openSlider();
	});
	$(".actionNameSpan").html(localStorage.getItem("currActionName"));

		var canvas = document.getElementById("imageCanvas");
		var context = canvas.getContext("2d");
		var myImg = document.getElementById("previewImage");

		function drawOnCanvas(canvas){
			var $myCanvas = $(canvas);
			//$myCanvas.draggable();
			var $offset = $myCanvas.offset();
			var $lineWidthVal = 5;
			var lineColor = "black";
			var isMouseDown = false;
			var pos = {
				x:0,
				y:0
			};
			var lastPos = {
				x:0,
				y:0
			};
			function paintLine(x1, y1, x2, y2, paintWidth, paintColor) {
				$myCanvas.drawLine({
					strokeStyle: paintColor,
					strokeWidth: paintWidth,
					rounded: true,
					strokeJoin: 'round',
					strokeCap: 'round',
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2
				});
			}
			/*  
			** PAINTING FUNCTIONALITY **
			*/

			//On mousedown the painting functionality kicks in
			$myCanvas.on('mousedown', function(e) {
				$offset = $myCanvas.offset();
				e.stopPropagation();
				isMouseDown = true;
			});

			//On mouseup the painting functionality stops
			$myCanvas.on('mouseup', function() {
				$offset = $myCanvas.offset();
				isMouseDown = false;
				return;
			});

			//On mousemove store the mouse coordinates and 
			//use jCanvas drawLine() method
			$myCanvas.on('mousemove', function(e) {
				lastPos.x = pos.x;
				lastPos.y = pos.y;
				pos.x = e.pageX - $offset.left;
				pos.y = e.pageY - $offset.top;

				if (isMouseDown) {
				  paintLine(lastPos.x, lastPos.y, pos.x, pos.y, $lineWidthVal, lineColor);

				}
			});

		}
		if (imgURL) {
            myImg.src = imgURL;
        }
        else {
             myImg.src = localStorage.getItem("currImgURL");
        }
		var imageRatio = myImg.width/myImg.height;
		var ratioHeight = myImg.height * 0.75;
		var ratioWidth = imageRatio*ratioHeight;
		console.log("my image", myImg.height, myImg.width, imageRatio, ratioHeight, ratioWidth);
		var sourceY = elm.offsetTop;
		var sourceX = elm.offsetLeft;
		
		if(elm.offsetLeft > 90)
			var sourceX = elm.offsetLeft -90;//-(elm.offsetLeft/16);
		if(elm.offsetTop > 60)
			var sourceY = elm.offsetTop -60;//+ (elm.offsetTop/8);

    	console.log("Source x and y: ", elm.offsetLeft, elm.offsetTop, sourceX, sourceY);
    	var destWidth = myImg.width-ratioWidth;
    	var destHeight = myImg.height-ratioHeight;
		var sourceWidth = myImg.width - destWidth;
   		var sourceHeight = myImg.height - destHeight;
    	var destX = canvas.width / 2 - destWidth / 2;
    	var destY = canvas.height / 2 - destHeight / 2;
		console.log(globXY);
			
		$(".previewTrigger").click(function(){ //#triggered
		importStylesheet("head","/styles/overlayScreen.css");
		appendTemplateToElement("body", "/templates/imageAnnotation.html");
		
		console.log($("#imageAnnotation").css("width"));
		console.log($("#imageAnnotation").height());
		$("#imageAnnotation").width(ratioWidth+10);
		$("#imageAnnotation").height(ratioHeight+40);
		$("#imageAnnotation").draggable();
		$("#annotationCanvas").attr("width", ratioWidth);
		$("#annotationCanvas").attr("height", ratioHeight);
		$("#annotationCanvas").width(ratioWidth);
		$("#annotationCanvas").height(ratioHeight);
		$("#imageAnnotation").css("position", "absolute");
		$("#imageAnnotation").css("top", "150px");
		$("#imageAnnotation").css("left", "100px");
	
			drawOnCanvas("#annotationCanvas");
			var annotationCanvas = document.getElementById("annotationCanvas");
			ctx = annotationCanvas.getContext("2d");
			ctx.drawImage(myImg,0,0,myImg.width, myImg.height,0,0,ratioWidth, ratioHeight);
			
			$("#backLargePreview").click(function(){
				$("#imageAnnotation").remove();
			});
			$("#closeLargePreview").click(function(){
				$("#imageAnnotation").remove();
			});
			
		});
		context.drawImage(myImg,0, 0,myImg.width, myImg.height,0,0,ratioWidth/3, ratioHeight/3);
/*		//$("#screenShot" + numSubtasks + "-" + numScreenShots).html("Retake Screenshot");
		//numScreenShots++;
		closeSlider();
		if(!document.getElementById('genderMagCanvasContainer')){
			console.log("In overlayScreen");
			var canvasContainer = document.createElement('div');
				// Add the div into the document
		}
		else{
			var canvasContainer = document.getElementById('genderMagCanvas');	
		}
		
			canvasContainer.id = "genderMagCanvasContainer";
			canvasContainer.style.position="fixed";
			// Set to 100% so that it will have the dimensions of the document
			canvasContainer.style.left="0px";
			canvasContainer.style.top="0px";
			canvasContainer.style.width="100%";
			canvasContainer.style.height="100%";
			canvasContainer.style.zIndex="1000";
			document.body.appendChild(canvasContainer);
			
			var canvas = document.createElement('canvas');
			canvas.style.width = canvasContainer.scrollWidth+"px";
			canvas.style.height = canvasContainer.scrollHeight+"px";
			canvas.id = "genderMagCanvas";
			canvas.position = "fixed";
			//canvas.style.cssText = "z-index:100; background:blue; width:100%; height:100%;";
			canvas.style.opacity = .50;
			canvas.width=canvasContainer.scrollWidth;
			canvas.height=canvasContainer.scrollHeight;
			canvas.style.overflow = 'visible';
			canvas.style.position = 'fixed';
			canvasContainer.appendChild(canvas);


			var genderMagCanvas = document.getElementById('genderMagCanvas'),
				ctx = genderMagCanvas.getContext('2d'),
				rect = {},
				drag = false;
			
		
			function init() {
				genderMagCanvas.addEventListener('mousedown', mouseDown, false);
				genderMagCanvas.addEventListener('mouseup', mouseUp, false);
				genderMagCanvas.addEventListener('mousemove', mouseMove, false);			
			}
			function mouseDown(e) {
				rect.startX = e.pageX - this.offsetLeft;
				rect.startY = e.pageY - this.offsetTop;
				drag = true;
			}			
			function mouseUp(e) {
				drag = false;
				console.log(rect);
				elm = document.elementFromPoint(rect.startX, rect.startY);
				var elements = new Array();
				while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" )
				{
					elements.push(elm);
					elm.style.display = "none";
					elm = document.elementFromPoint(rect.startX, rect.startY);
				}
				console.log("element" , elm.innerText, elm.textContent);
				var highlightClick = document.createElement("div");
				highlightClick.id = "highlightClick";
			//	document.body.appendChild(highlightClick);
				highlightClick.style.position = "absolute";
				highlightClick.style.left = elm.offsetLeft + "px";
				highlightClick.style.top = elm.offsetTop + "px";
				highlightClick.style.height = elm.offsetHeight + "px";
				highlightClick.style.width = elm.offsetWidth + "px";
				highlightClick.style.border = "3px solid orange";
				highlightClick.style.opacity = "0.5";
				highlightClick.style.zindex = "10000";
		
				console.log("Clicked ", highlightClick)
				setPhasersToTrue("highlightedAction");
			
				console.log(elements);
				for(var element in elements){
					if(element.id == "genderMagCanvas" || element.id == "genderMagCanvasContainer" ){
						element.style.display = "default";
					}
				}
			chrome.runtime.sendMessage({greeting: "takeScreenShot"}, function(response) {
					
			});


			console.log("sending message");
			setTimeout(function(){
			//	document.getElementById("highlightClick").remove();
				$("#highlightHover").remove();
			}, 2000);
			}
			function mouseMove(e) {
				if (drag) {
					rect.w = (e.pageX - this.offsetLeft) - rect.startX;
					rect.h = (e.pageY - this.offsetTop) - rect.startY ;
					ctx.clearRect(0,0,canvas.width,canvas.height);				
					draw();
				}
				if($("#highlightHover")){
					rect.startX = e.pageX - this.offsetLeft;
					rect.startY = e.pageY - this.offsetTop;
					var hoverElm = document.elementFromPoint(rect.startX, rect.startY);
					rect.w = (e.pageX - this.offsetLeft) - rect.startX;
					rect.h = (e.pageY - this.offsetTop) - rect.startY ;

					$("#highlightHover").remove();
					var highlightHover = document.createElement("div");
					highlightHover.id = "highlightHover";
					document.body.appendChild(highlightHover);
					highlightHover.style.position = "absolute";
					highlightHover.style.left = rect.startX-30 + "px";
					highlightHover.style.top = rect.startY-20 + "px";
					highlightHover.style.height = "50" + "px";
					highlightHover.style.width = "100" + "px";
					highlightHover.style.border = "3px solid orange";
					highlightHover.style.opacity = "0.5";
					highlightHover.style.zindex = "10000";
					//console.log("Hovered if", hoverElm)
				}
				else{
					var highlightHover = document.createElement("div");
					highlightHover.id = "highlightHover";
				}
			}
			function draw() {
				ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
			}
			init();
	}

}

function renderImage(imgURL){

	var toolTip = document.createElement("div");
	toolTip.id = "myToolTip";
	toolTip.style.position = "absolute";
	toolTip.style.left = elm.offsetLeft+100 + "px";
	toolTip.style.top = elm.offsetTop+100 + "px";
	toolTip.style.height = "300px";
	toolTip.style.width = "500px";
	toolTip.style.zindex = "10002";	
	toolTip.style.border ="3px solid #999999";
	toolTip.style.backgroundColor = "white";
	toolTip.style.cursor="pointer";
	toolTip.style.borderRadius="5px";
    setPhasersToTrue("drewToolTip");
	
	document.body.appendChild(toolTip);
	$('#myToolTip').draggable();
	//addToolTip("imageCanvas");

	appendTemplateToElement(toolTip ,"./templates/action.html");
	$(".closeToolTip").click(function() {
		//toolTip.remove();
		//toolTip.innerHTML = " ";
        setPhasersToTrue("gotScreenshot");
        preActionQuestions(toolTip);
	});
	$("#retakeImage").click(function(){
		toolTip.remove();
        setPhasersToFalse("drewToolTip");
		overlayScreen();
		overlayScreen();
	});
	$("#imageBack").click(function(){
		openSlider();
	});
	var actionSpan = localStorage.getItem("currActionName");
	$(".actionNameSpan").html(actionSpan.slice(1,actionSpan.length-1));
	$(".previewTrigger").click(function(){ //#triggered
		window.open(imgURL);
	});
		var canvas = document.getElementById("imageCanvas");
		var context = canvas.getContext("2d");
		var myImg = document.getElementById("previewImage");
        myImg.src = localStorage.getItem("currImgURL");
        
		var imageRatio = myImg.width/myImg.height;
		var ratioHeight = myImg.height * 0.75;
		var ratioWidth = imageRatio*ratioHeight;
		console.log("my image", myImg.height, myImg.width, imageRatio, ratioHeight, ratioWidth);
		var sourceY = elm.offsetTop;
		var sourceX = elm.offsetLeft;
		
		if(elm.offsetLeft > 90)
			var sourceX = elm.offsetLeft -90;//-(elm.offsetLeft/16);
		if(elm.offsetTop > 60)
			var sourceY = elm.offsetTop -60;//+ (elm.offsetTop/8);

    	console.log("Source x and y: ", elm.offsetLeft, elm.offsetTop, sourceX, sourceY);
    	var destWidth = myImg.width-ratioWidth;
    	var destHeight = myImg.height-ratioHeight;
		var sourceWidth = myImg.width - destWidth;
   		var sourceHeight = myImg.height - destHeight;
    	var destX = canvas.width / 2 - destWidth / 2;
    	var destY = canvas.height / 2 - destHeight / 2;
 		context.drawImage(myImg, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, ratioWidth, ratioHeight);
*/
}

