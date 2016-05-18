/* Function appendTemplateToElement
 * 
 * Takes 2 arguements:
 * 		element: the element to which the template will be appended
 *		file: the LOCAL path of the template to use (e.g., "/templates/popup.html")
 *
 * Pre: element must exist
 * Post: template will be added to element AFTER all other content. Elements within the template can be referred to
 * as long as the referrer is still in the scope in which this function was called.
 */

function appendTemplateToElement(element,file){	
	var msg = $.ajax({type: "GET", url: chrome.extension.getURL(file), async: false}).responseText;
	var dataToAppend =$($.parseHTML(msg));
	element.append(dataToAppend);
}

/* Function importStylesheet
 * 
 * Takes 2 arguements:
 * 		element: the element to which the stylesheet will be appended
 *		file: the LOCAL path of the template to use (e.g., "/styles/styles.css")
 *
 * Pre: element must exist
 * Post: Stylesheet will be added to the element.
 */

function importStylesheet(element, file){
	return $("<link>", {
			rel:"stylesheet",
			href: chrome.extension.getURL(file)
		}).appendTo(element);	
}

/*
 *
 *
 *
 *
 */