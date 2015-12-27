//META{"name":"firework"}*//
function firework() {}
firework.prototype.load = function() {
	return;
};
firework.prototype.unload = function() {
};
firework.prototype.start = function() {
	$("head").append('<link rel="stylesheet" href="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/style/fireworks.css">');
	$("head").append('<script src="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/script/fireworks.js"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/script/soundmanager2-nodebug-jsmin.js"></script>');
	createFirework(80,176,3,2,null,null,null,null,false,true);
};
firework.prototype.stop = function() {
};
firework.prototype.update = function() {
};
firework.prototype.getName = function() {
	return "Fire Work Plugin";
};
firework.prototype.getDescription = function() {
	return "Adds a crazy firework to your client.";
};
firework.prototype.getVersion = function() {
	return "1.0";
};
firework.prototype.getAuthor = function() {
	return "Bluscream";
};