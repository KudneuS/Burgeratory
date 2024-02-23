$(document).ready(function(){
	if(/Mobi/.test(navigator.userAgent)){
		$("#title").removeAttr("class", "visible").attr("class", "invisible");
		$("#navbar").removeAttr("class", "visible").attr("class", "invisible");
	}
});