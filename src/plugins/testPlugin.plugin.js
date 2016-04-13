//META{"name":"testPlugin"}*//
function testPlugin() {
	var settings = {
		testSettingBool : true,
		testSettingInt : 123,
		testSettingStr : "Test String"
	}
}
testPlugin.prototype.getName = function() { return "Test"; };
testPlugin.prototype.getDescription = function() { return "Test Description"; };
testPlugin.prototype.getVersion = function() { return "1.0"; };
testPlugin.prototype.getUpdateURL = function() { return "https://cdn.rawgit.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/src/plugins/testPlugin.plugin.js"; };
testPlugin.prototype.getAuthor = function() { return "Jiiks"; };
testPlugin.prototype.getSettingsPanel = function() {
    return '<h3>Test Plugin Settings Panel</h3>';
};

testPlugin.prototype.load = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.start = function() {
	testPlugin.settings = BetterAPI.loadSettings('testPlugin', testPlugin.settings);
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.", "color: purple; font-weight: bold;", "");
};

testPlugin.prototype.onMessage = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onMessage] event fired.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.onSwitch = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onSwitch] event fired.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.socketEvent = function(data) {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [socketEvent] event fired.", "color: purple; font-weight: bold;", "");
	console.log(data);
};
testPlugin.prototype.observer = function(e) {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [observer] change fired.", "color: purple; font-weight: bold;", "");
    console.log(e);
};

testPlugin.prototype.stop = function() {
	BetterAPI.saveSettings('testPlugin', testPlugin.settings);
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.unload = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.", "color: purple; font-weight: bold;", "");
};
