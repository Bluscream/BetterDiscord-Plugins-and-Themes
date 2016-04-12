//META{"name":"testPlugin"}*//
function testPlugin() {}
testPlugin.prototype.getName = function() {
    return "Test";
};
testPlugin.prototype.getDescription = function() {
    return "Test Description";
};
testPlugin.prototype.getVersion = function() {
    return "1.0";
};
testPlugin.prototype.getAuthor = function() {
    return "Jiiks";
};
testPlugin.prototype.getSettingsPanel = function() {
    return '<h3>Test Plugin Settings Panel</h3>';
};

testPlugin.prototype.load = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.unload = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + "unloaded.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.start = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.stop = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.", "color: purple; font-weight: bold;", "");
};

testPlugin.prototype.onMessage = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onMessage] event fired.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.onSwitch = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onSwitch] event fired.", "color: purple; font-weight: bold;", "");
};