/*
@author:dangtm Elcom HCM Corp
*/
parseXML= function(){
	this.xmlDoc = null;
};
parseXML.prototype.loadXMLDoc = function(url){
	if (window.XMLHttpRequest){
	  xhttp=new XMLHttpRequest();
	}
	else { // code for IE5 and IE6
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.withCredentials = true;
	xhttp.open("GET",url,true);
	
	xhttp.send();
	this.xmlDoc = xhttp.responseXML;
	return this.xmlDoc;
}
parseXML.prototype.loadXMLString = function(text){
	var xmlDocument = $.parseXML(text.replace("<?xml version='1.0' encoding='UTF-8'?>", ""));
	return $(xmlDocument);
}

