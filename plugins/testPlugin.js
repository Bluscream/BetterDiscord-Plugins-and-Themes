//META{"name":"testPlugin"}*//

function testPlugin() {}

testPlugin.prototype.load = function() {
    //Called when plugin is loaded
};

testPlugin.prototype.unload = function() {
    //Called when plugin is unloaded
};

testPlugin.prototype.start = function() {
    //Called when plugin is started
};
testPlugin.prototype.stop = function() {
    //Called when plugin is stopped
};

testPlugin.prototype.getName = function() {
    return "Test Plugin";
};

testPlugin.prototype.getDescription = function() {
    return "Test Plugin";
};

testPlugin.prototype.getVersion = function() {
    return "1.0";
};

testPlugin.prototype.getAuthor = function() {
    return "Jiiks";
};

testPlugin.prototype.getSettingsPanel = function() {
    return '<h3>Test Plugin</h3>';
};