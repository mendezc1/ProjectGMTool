function loadPersona(personaName){
	console.log("in load persona" , personaName);
	if(personaName == "Abby"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Abby/abbyPersona.html");
		var abbySRC=chrome.extension.getURL("images/Abby_square.jpg");
		var abbyIMG= "<img id='AbbyPhoto' src='" + abbySRC + "' alt='Abby Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(abbyIMG);
		sidebarBody().find(".abbyMTrigger").unbind( "click" ).click(function (){
		//	console.log("Who you gonna call?");
			addToolTip("abbyMToolTip", "Abby");	
			$('#abbyMSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyMPreview").hide();
					$("#abbyMComplete").show();
					$("#abbyMSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyMPreview").show();
					$("#abbyMComplete").hide();
					$("#abbyMSeeMOAR").html("See more");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
		sidebarBody().find(".abbyIPSTrigger").unbind( "click" ).click(function(){
	//		console.log("Marco");
			addToolTip("abbyIPSToolTip", "Abby");
			$('#abbyIPSSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyIPSPreview").hide();
					$("#abbyIPSComplete").show();
					$("#abbyIPSSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyIPSPreview").show();
					$("#abbyIPSComplete").hide();
					$("#abbyIPSSeeMOAR").html("See more");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
	
		sidebarBody().find(".abbySETrigger").unbind( "click" ).click(function(){
//			console.log("John-Jacob-Jingleheimer-Schmidt his name is my name too, whenever we go out, the people always shout");
			addToolTip("abbySEToolTip", "Abby");
			$('#abbySESeeMOAR').off('click').on('click', function() { //don't mock Abby's stutter
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbySEPreview").hide();
					$("#abbySEComplete").show();
					$("#abbySESeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbySEPreview").show();
					$("#abbySEComplete").hide();
					$("#abbySESeeMOAR").html("See more");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
		sidebarBody().find(".abbyRTrigger").unbind( "click" ).click(function(){
		/*	console.log("They call me `Bell`");
			console.log("They call me `Stacy`");
			console.log("They call me `her`");
			console.log("They call me `Jane`"); 
			console.log("Thats not my name");
			console.log("Thats not my name");
			console.log("Thats not my name");
			console.log("Thats not my name.");
			console.log("They call me `quiet girl`");
			console.log("But I'm a riot Mary, Jo, Lisa");
			console.log("Always the same");
			console.log("Thats not my name");
			console.log("Thats not my name");
			console.log("Thats not my name"); 
			console.log("Thats not my name");
			console.log("What is my name? Its: ");*/
			addToolTip("abbyRToolTip", "Abby");
			$('#abbyRSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyRPreview").hide();
					$("#abbyRComplete").show();
					$("#abbyRSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyRPreview").show();
					$("#abbyRComplete").hide();
					$("#abbyRSeeMOAR").html("See more");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
		sidebarBody().find(".abbyTTrigger").unbind( "click" ).click(function(){
			//console.log("Knock Knock, Whos there? Orange? Orange Who? Aren't you glad I didn't call");
			addToolTip("abbyTToolTip", "Abby");
			$('#abbyTSeeMOAR').off('click').on('click', function() {
				var isOpen = $(this).attr("stateVar");
		
				//The "see more" is expanded and needs to be closed
				if (isOpen == 0) {
					$("#abbyTPreview").hide();
					$("#abbyTComplete").show();
					$("#abbyTSeeMOAR").html("See less");	
					$(this).attr("stateVar", 1);
				}
				else{
					$("#abbyTPreview").show();
					$("#abbyTComplete").hide();
					$("#abbyTSeeMOAR").html("See more");	
					$(this).attr("stateVar", 0);
				}
				
			});
		});
		
			
	}
	else if(personaName == "Tim"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Tim/timPersona.html");
		var timSRC=chrome.extension.getURL("images/Tim_square.jpg");
		var tImg = "<img id='TimPhoto' src='" + timSRC + "' alt='Tim Hopkins' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(tImg);
		
		sidebarBody().find(".timMTrigger").unbind( "click" ).click(function (){
			addToolTip("timMToolTip", "Tim");	
		});
		sidebarBody().find(".timIPSTrigger").unbind( "click" ).click(function(){
			addToolTip("timIPSToolTip", "Tim");
		});
		sidebarBody().find(".timSETrigger").unbind( "click" ).click(function(){
			addToolTip("timSEToolTip", "Tim");
		});
		sidebarBody().find(".timRTrigger").unbind( "click" ).click(function(){
			addToolTip("timRToolTip", "Tim");
		});
		sidebarBody().find(".timTTrigger").unbind( "click" ).click(function(){
			addToolTip("timTToolTip", "Tim");
		});
		
	}
	else if(personaName == "Patrick"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Patrick/patrickPersona.html");
		var patrickSRC=chrome.extension.getURL("images/Patrick_square.jpg");
		var patrickIMG= "<img id='PatrickPhoto' src='" + patrickSRC + "' alt='Patrick Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patrickIMG);
		
		sidebarBody().find(".patrickMTrigger").unbind( "click" ).click(function (){
			addToolTip("patrickMToolTip", "Patrick");	
		});
		sidebarBody().find(".patrickIPSTrigger").unbind( "click" ).click(function(){
			addToolTip("patrickIPSToolTip", "Patrick");
		});
		sidebarBody().find(".patrickSETrigger").unbind( "click" ).click(function(){
			addToolTip("patrickSEToolTip", "Patrick");
		});
		sidebarBody().find(".patrickRTrigger").unbind( "click" ).click(function(){
			addToolTip("patrickRToolTip", "Patrick");
		});
		sidebarBody().find(".patrickTTrigger").unbind( "click" ).click(function(){
			addToolTip("patrickTToolTip", "Patrick");
		});		
	}
	else if(personaName == "Patricia"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Patricia/patriciaPersona.html");
		var patriciaSRC=chrome.extension.getURL("images/Patricia_square.jpg");
		var patriciaIMG= "<img id='PatriciaPhoto' src='" + patriciaSRC + "' alt='Patricia Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patriciaIMG);
		
		sidebarBody().find(".patriciaMTrigger").unbind( "click" ).click(function (){
			addToolTip("patriciaMToolTip", "Patricia");	
		});
		sidebarBody().find(".patriciaIPSTrigger").unbind( "click" ).click(function(){
			addToolTip("patriciaIPSToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaSETrigger").unbind( "click" ).click(function(){
			addToolTip("patriciaSEToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaRTrigger").unbind( "click" ).click(function(){
			addToolTip("patriciaRToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaTTrigger").unbind( "click" ).click(function(){
			addToolTip("patriciaTToolTip", "Patricia");
		});
	}
	else{
		console.log("NO valid name");
	}
}