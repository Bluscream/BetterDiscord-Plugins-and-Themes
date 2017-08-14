//META{"name":"betterNSFW"}*//

function betterNSFW(){}

betterNSFW.prototype.getName = function () {
    return "betterNSFW";
};

betterNSFW.prototype.getDescription = function () {
    return "Changes the nsfw- prefix on channels into an 18+ icon (You may need to swap servers twice to see the change)";
};

betterNSFW.prototype.getVersion = function () {
    return "1.0.0";
};

betterNSFW.prototype.getAuthor = function () {
    return "digitalAlchemist";
};

betterNSFW.prototype.start = function () {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://raw.githubusercontent.com/cosmicsalad/Discord-Themes-and-Plugins/master/lib/jquery-ui.min.js';
	$("head").append(script);
	console.log("JQuery loaded");
	
	this.changeChannelNames();
};

betterNSFW.prototype.changeChannelNames = function() {

	var aTags = document.getElementsByClassName("channel-name");
	var searchText = "nsfw-";
	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].textContent.indexOf(searchText) >= 0){
			var replacement = aTags[i].textContent;
			replacement = replacement.replace('nsfw-','');
			var emojihtml = '<span style="font-size: 0.7em; float: right; position: relative; color: red; background-color: black; border-radius: 5px; padding: 1px 5px; font-weight: 700;">18+</span>';
			aTags[i].innerHTML = replacement+emojihtml;
		};
	};
};

betterNSFW.prototype.load = function() {
	this.changeChannelNames();
};
betterNSFW.prototype.unload = function() {};
betterNSFW.prototype.stop = function() {};
betterNSFW.prototype.onSwitch = function() {
	this.changeChannelNames();
};
betterNSFW.prototype.getSettingsPanel = function() {
    return null;
};
