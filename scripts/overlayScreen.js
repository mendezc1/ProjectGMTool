
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
		toolTip.style.height = "550px";
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
		$(".actionNameSpan").html("Action: " + actionSpan);
		//$(".previewTrigger").click(function(){ //#triggered
		//	window.open(imgURL);
		//});
		var canvas = document.getElementById("imageCanvas");
		canvas.width = "465";
		canvas.height=	"150";
		canvas.style.border="2px solid black"
		canvas.style.margin="10px";
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
		var sourceY = localStorage.getItem("sourceY");
		var sourceX = localStorage.getItem("sourceX");
		
		

    	//console.log("Source x and y: ", elm.offsetLeft, elm.offsetTop, sourceX, sourceY);
    	var destWidth = myImg.width-ratioWidth;
    	var destHeight = myImg.height-ratioHeight;
		var sourceWidth = myImg.width - destWidth;
   		var sourceHeight = myImg.height - destHeight;
    	var destX = canvas.width / 2 - destWidth / 2;
    	var destY = canvas.height / 2 - destHeight / 2;
 		context.drawImage(myImg,sourceX, sourceY,myImg.width, myImg.height,0,0,ratioWidth*9/10, ratioHeight*9/10);
		
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
			elm = document.elementFromPoint(rect.startX, rect.startY);//elm can return undefined;
			var elements = new Array();
			while(elm.id == "genderMagCanvas" || elm.id == "genderMagCanvasContainer" ){
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
	toolTip.style.height = "550px";
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
	var actionSpan = localStorage.getItem("currActionName");
		$(".actionNameSpan").html("Action: " + actionSpan);
		var canvas = document.getElementById("imageCanvas");
		canvas.width = "465";
		canvas.height=	"150";
		canvas.style.border="2px solid black"
		canvas.style.margin="10px";
		var context = canvas.getContext("2d");
		var myImg = document.getElementById("previewImage");

		function drawOnCanvas(canvas){
			var $myCanvas = $(canvas);
			//$myCanvas.draggable();
			var $offset = $myCanvas.offset();
			var $lineWidthVal = 2;
			var lineColor = "#df4b26";
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
				history.saveState($myCanvas);
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
					context.beginPath();	 
					paintLine(lastPos.x, lastPos.y, pos.x, pos.y, $lineWidthVal, lineColor);

				}
			});
			
			
	//undo redo		 
			 var history = {
				redo_list: [],
				undo_list: [],
				saveState: function(canvas, list, keep_redo) {
					keep_redo = keep_redo || false;
					if(!keep_redo) {
						this.redo_list = [];
					}
					//console.log("WHYYY", canvas[0]);
					(list || this.undo_list).push(canvas[0].toDataURL());   
				},
				
				undo: function(canvas, context) {
					this.restoreState(canvas, context, this.undo_list, this.redo_list);
				},
				
				redo: function(canvas, context) {
					this.restoreState(canvas, context, this.redo_list, this.undo_list);
				},
    
				restoreState: function(canvas, context,  pop, push) {
					if(pop.length) {
						this.saveState(canvas, push, true);
						var restore_state = pop.pop();
						//console.log("prev image", restore_state);
						var img =  document.createElement('img');
						img.src = "data:image/jpeg;base64,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"
//restore_state;
						img.onload = function() {
							

						context.setTransform(1, 0, 0, 1, 0, 0);
						context.clearRect(0, 0,  canvas.width, canvas.height);
							//context.drawImage(img, canvas.width, canvas.height);  
							console.log("should be drawn");
						}
					}
				}
			}

  $('#undoDraw').click(function() {
	console.log("undo", context);
	history.undo($("#annotationCanvas"), context);
  });
  
  $('redoDraw').click(function() {
	console.log("redo ", context);
	history.redo($("#annotationCanvas"), context);
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
		localStorage.setItem("sourceX", sourceX);
		localStorage.setItem("sourceY", sourceY);
		
    	console.log("Source x and y: ", elm.offsetLeft, elm.offsetTop, sourceX, sourceY);
    	var destWidth = myImg.width-ratioWidth;
    	var destHeight = myImg.height-ratioHeight;
		var sourceWidth = myImg.width - destWidth;
   		var sourceHeight = myImg.height - destHeight;
    	var destX = canvas.width / 2 - destWidth / 2;
    	var destY = canvas.height / 2 - destHeight / 2;
		//console.log(globXY);
			
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
		context.drawImage(myImg,sourceX, sourceY,myImg.width, myImg.height,0,0,ratioWidth*9/10, ratioHeight*9/10);
}

