var solutionContext = "";
var plmHyperlink = "";
var userId = "";
var _3dSpaceUrl = "";
function setContext(context) {
	solutionContext = context;
}
function isNullUndefinedEmpty(v) {
	return ("undefined" === v || "null" === v || "" === v || '' === v || v === undefined || v === null);
}
function events() {
	$(document).ready(function() {
		$(".dddxp-logo-container .dddxp-logo").attr("style", "background-image: url(" + solutionContext + "/images/3DEXLoginCompassTxt@2X.png);");
		$(".compass-ct, .compass-base, .compass-over, .compass-on, .compass-small-over, .compass-small, .quadrant-play-small, .quadrant-play").attr("style", "cursor: default;background-image: url(" + solutionContext + "/images/compass.png);");
		$(".topbar-logo").attr("style", "background-image: url(" + solutionContext + "/images/sprite2x.png);");
	});
}
function loadFonts() {
	$("head").prepend("<style>@font-face {font-family: 'customFont';src: url('file:///" + fontfile + "');}</style>"); $("#url").css("font-family", "customFont");
}
function set3DEXHyperLink(plmHyperlinkUrl) {
	plmHyperlink = plmHyperlinkUrl;
}
function get3DEXHyperLink(plmId) {
	return plmHyperlink.replaceAll("PLACEHOLDER_TO_REPLACE", plmId);
}
function setUserId(userIdPassed) {
	userId = userIdPassed;
	setTimeout(function() {
		$("#userId").html(userId);
	}, 500)
}
function getUserId() {
	return userId;
}
function setNonPsLinkUrl(_3dSpaceUrlPassed) {
	_3dSpaceUrl = _3dSpaceUrlPassed;
}
function getGetNonPsLinkUrl(plmId, projectName) {
	var returnVal = _3dSpaceUrl.replaceAll("PLACEHOLDER_TO_REPLACE", plmId);
	return returnVal.replaceAll("PROJECT_NAME", projectName);
}