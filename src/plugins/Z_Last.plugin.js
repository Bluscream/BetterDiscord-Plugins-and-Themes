//META{"name":"LastPlugin"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function LastPlugin() {}
LastPlugin.prototype.load = function() {
};
LastPlugin.prototype.start = function() {
	BetterAPI.DisableLogging();
	console.clear();
};
LastPlugin.prototype.stop = function() {
};
LastPlugin.prototype.unload = function() {
};
LastPlugin.prototype.onSwitch = function() {
};
LastPlugin.prototype.onMessage = function() {
};
LastPlugin.prototype.getName = function() {
	return "Last";
};
LastPlugin.prototype.getDescription = function() {
	return "No information given.";
};
LastPlugin.prototype.getVersion = function() {
	return "1.0";
};
LastPlugin.prototype.getAuthor = function() {
	return "Bluscream";
};