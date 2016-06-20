function loadPersona(personaName){
	console.log("in load persona" , personaName);
	if(personaName == "Abby"){
		appendTemplateToElement(sidebarBody().find("#personaInfo"), "./templates/abbyPersona.html");
		var abbySRC=chrome.extension.getURL("images/Abby_square.jpg");
		var abbyIMG= "<img id='AbbyPhoto' src='" + abbySRC + "' alt='Abby Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(abbyIMG);
		sidebarBody().find(".abbyMTrigger").click(function (){
			console.log("Who you gonna call?");
			addToolTip("abbyMToolTip");	
		});
		sidebarBody().find(".abbyIPSTrigger").click(function(){
			console.log("Marco");
			addToolTip("abbyIPSToolTip");
		});
		sidebarBody().find(".abbySETrigger").click(function(){
			console.log("John-Jacob-Jingleheimer-Schmidt his name is my name too, whenever we go out, the people always shout");
			addToolTip("abbySEToolTip");
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
			addToolTip("abbyRToolTip");
		});
		sidebarBody().find(".abbyTTrigger").click(function(){
			console.log("Knock Knock, Whos there? Orange? Orange Who? Aren't you glad I didn't call");
			addToolTip("abbyTToolTip");
		});
		
			
	}
	else if(personaName == "Tim"){
		var timSRC=chrome.extension.getURL("images/Tim_square.jpg");
		var tImg = "<img id='TimPhoto' src='" + timSRC + "' alt='Tim Hopkins' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(tImg);
	}
	else if(personaName == "Patrick"){
		var patrickSRC=chrome.extension.getURL("images/Patrick_square.jpg");
		var patrickIMG= "<img id='PatrickPhoto' src='" + patrickSRC + "' alt='Patrick Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patrickIMG);
	}
	else if(personaName == "Patricia"){
		var patriciaSRC=chrome.extension.getURL("images/Patricia_square.jpg");
		var patriciaIMG= "<img id='PatriciaPhoto' src='" + patriciaSRC + "' alt='Patricia Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#picGoesHere").append(patriciaIMG);}
	else{
		console.log("NO valid name");
	}
}