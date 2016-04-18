
//Adds a checkbox for each of the five facets to element
//Takes question number as input
function addFacetCheckboxes(element, questionNumber, actionNum, yesNoMaybe) {
	var questionNumber = questionNumber + 1;
	
	var facets = ["Motivation", "Information Processing Style", "Computer Self-Efficacies",
		"Attitude Towards Risk", "Willingness to Tinker"];
	
	for (var facet = 0; facet < facets.length; facet++) {
		//Checkbox
		$("<input/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + questionNumber + yesNoMaybe + "F" + facet,
			type: "checkbox",
			value: facets[facet],
		}).appendTo(element);
	
		//Label for Checkbox
		$("<span/>", { html: facets[facet] }).appendTo(element);
		
		$("<br>").appendTo(element);
	}
	
	$("<br>").appendTo(element);
};

//Adds a series of questions (array of strings) to element
//Under each question, adds checkboxes for yes/no response and fields for explanation
function addQuestions(element, questions, actionNum) {

	for (var i = 0; i < questions.length; i++) {
		var container = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) });
		var yesFacets = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "yesFacets" });
		var noFacets = $("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "noFacets" });
		var maybeFacets =$("<div/>", { id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "maybeFacets" });
		
		//Add question text
		var question = $("<span/>", { html: questions[i] }).appendTo(container);
		question.addClass("cwQuestion");
	
		//Add "Yes" checkbox
	var yesCheckbox = $("<div>", {
		html: "Yes",
		class: "responseBoxLabel"
	}).appendTo(container);
	
	var noCheckbox = $("<div>", {
		html: "No",
		class: "responseBoxLabel"
	}).appendTo(container);
	
	var maybeCheckbox = $("<div>", {
		html: "Maybe",
		class: "responseBoxLabel"
	}).appendTo(container);
		
		$("<br>").appendTo(container);
		//Add response field for yes
		var yesResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "YesResponse",
			class: "responseBox",
			placeholder: "Why?",
		}).appendTo(container);
		
		//Add response field for no
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "NoResponse",
			placeholder: "Why not?",
			class: "responseBox"
		}).appendTo(container);
		
		//Add response field for maybe
		var noResponse = $("<textArea/>", {
			id: "S" + numSubtasks + "A" + actionNum + "Q" + (i + 1) + "maybeResponse",
			placeholder: "Why maybe?",
			class: "responseBox"
		}).appendTo(container);

		var question = $("<span/>", { html: "Which of the persona's facets did you use to answer the above question?" }).appendTo(container);
		question.addClass("cwQuestion");
		//Add checkboxes for Maybe facets
		addFacetCheckboxes(maybeFacets, i, actionNum, "M");
		maybeFacets.appendTo(container);
					
		container.appendTo(element);
	}
}