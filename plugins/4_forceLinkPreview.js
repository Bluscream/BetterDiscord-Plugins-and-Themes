//META{"name":"forceLinkPreview"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function forceLinkPreview() {}
forceLinkPreview.prototype.load = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};
forceLinkPreview.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};
forceLinkPreview.prototype.start = function() {

	$('.imageLink').each(function(){
	   $(this).append(' <img src="'+test+'">'); 
	});
	
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};
forceLinkPreview.prototype.stop = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};
forceLinkPreview.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
};
forceLinkPreview.prototype.getName = function() {
	return "Force Link Preview Plugin";
};
forceLinkPreview.prototype.getDescription = function() {
	return "Forces link/image/video previews to showup even when the channel has it disabled.";
};
forceLinkPreview.prototype.getVersion = function() {
	return "1.0";
};
forceLinkPreview.prototype.getAuthor = function() {
	return "Bluscream";
};