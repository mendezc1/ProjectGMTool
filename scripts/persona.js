function loadPersona(personaName){
	console.log("in load persona" , personaName);
	if(personaName == "Abby"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Abby/abbyPersona.html");
		var abbySRC=chrome.extension.getURL("images/Abby_square.jpg");
		var abbyIMG= "<img id='AbbyPhoto' src='" + abbySRC + "' alt='Abby Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(abbyIMG);
		sidebarBody().find(".abbyMTrigger").click(function (){
			console.log("Who you gonna call?");
			addToolTip("abbyMToolTip", "Abby");	
		});
		sidebarBody().find(".abbyIPSTrigger").click(function(){
			console.log("Marco");
			addToolTip("abbyIPSToolTip", "Abby");
		});
		sidebarBody().find(".abbySETrigger").click(function(){
			console.log("John-Jacob-Jingleheimer-Schmidt his name is my name too, whenever we go out, the people always shout");
			addToolTip("abbySEToolTip", "Abby");
		});
		sidebarBody().find(".abbyRTrigger").click(function(){
			console.log("They call me `Bell`");
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
			console.log("What is my name? Its: ");
			addToolTip("abbyRToolTip", "Abby");
		});
		sidebarBody().find(".abbyTTrigger").click(function(){
			console.log("Knock Knock, Whos there? Orange? Orange Who? Aren't you glad I didn't call");
			addToolTip("abbyTToolTip", "Abby");
		});
		
			
	}
	else if(personaName == "Tim"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Tim/timPersona.html");
		var timSRC=chrome.extension.getURL("images/Tim_square.jpg");
		var tImg = "<img id='TimPhoto' src='" + timSRC + "' alt='Tim Hopkins' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(tImg);
		
		sidebarBody().find(".timMTrigger").click(function (){
			addToolTip("timMToolTip", "Tim");	
		});
		sidebarBody().find(".timIPSTrigger").click(function(){
			addToolTip("timIPSToolTip", "Tim");
		});
		sidebarBody().find(".timSETrigger").click(function(){
			addToolTip("timSEToolTip", "Tim");
		});
		sidebarBody().find(".timRTrigger").click(function(){
			addToolTip("timRToolTip", "Tim");
		});
		sidebarBody().find(".timTTrigger").click(function(){
			addToolTip("timTToolTip", "Tim");
		});
		
	}
	else if(personaName == "Patrick"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Patrick/patrickPersona.html");
		var patrickSRC=chrome.extension.getURL("images/Patrick_square.jpg");
		var patrickIMG= "<img id='PatrickPhoto' src='" + patrickSRC + "' alt='Patrick Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patrickIMG);
		
		sidebarBody().find(".patrickMTrigger").click(function (){
			addToolTip("patrickMToolTip", "Patrick");	
		});
		sidebarBody().find(".patrickIPSTrigger").click(function(){
			addToolTip("patrickIPSToolTip", "Patrick");
		});
		sidebarBody().find(".patrickSETrigger").click(function(){
			addToolTip("patrickSEToolTip", "Patrick");
		});
		sidebarBody().find(".patrickRTrigger").click(function(){
			addToolTip("patrickRToolTip", "Patrick");
		});
		sidebarBody().find(".patrickTTrigger").click(function(){
			addToolTip("patrickTToolTip", "Patrick");
		});		
	}
	else if(personaName == "Patricia"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/Patricia/patriciaPersona.html");
		var patriciaSRC=chrome.extension.getURL("images/Patricia_square.jpg");
		var patriciaIMG= "<img id='PatriciaPhoto' src='" + patriciaSRC + "' alt='Patricia Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patriciaIMG);
		
		sidebarBody().find(".patriciaMTrigger").click(function (){
			addToolTip("patriciaMToolTip", "Patricia");	
		});
		sidebarBody().find(".patriciaIPSTrigger").click(function(){
			addToolTip("patriciaIPSToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaSETrigger").click(function(){
			addToolTip("patriciaSEToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaRTrigger").click(function(){
			addToolTip("patriciaRToolTip", "Patricia");
		});
		sidebarBody().find(".patriciaTTrigger").click(function(){
			addToolTip("patriciaTToolTip", "Patricia");
		});
	}
	else{
		console.log("NO valid name");
	}
}