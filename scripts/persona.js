function loadPersona(personaName){
	console.log("in load persona" , personaName);
	if(personaName == "Abby"){
		var abbySRC=chrome.extension.getURL("images/Abby_square.jpg");
		var abbyIMG= "<img id='AbbyPhoto' src='" + abbySRC + "' alt='Abby Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#scenarioName").append(abbyIMG);
	}
	else if(personaName == "Tim"){
		var timSRC=chrome.extension.getURL("images/Tim_square.jpg");
		var tImg = "<img id='TimPhoto' src='" + timSRC + "' alt='Tim Hopkins' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#scenarioName").append(tImg);
	}
	else if(personaName == "Patrick"){
		var patrickSRC=chrome.extension.getURL("images/Patrick_square.jpg");
		var patrickIMG= "<img id='PatrickPhoto' src='" + patrickSRC + "' alt='Patrick Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#scenarioName").append(patrickIMG);
	}
	else if(personaName == "Patricia"){
		var patriciaSRC=chrome.extension.getURL("images/Patricia_square.jpg");
		var patriciaIMG= "<img id='PatriciaPhoto' src='" + patriciaSRC + "' alt='Patricia Jones' class='sidebarImg' width='100' height='100'/>";
		sidebarBody().find("#scenarioName").append(patriciaIMG);}
	else{
		console.log("NO valid name");
	}
}