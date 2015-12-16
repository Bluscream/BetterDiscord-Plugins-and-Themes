//META{"name":"firework"}*//
//```
function firework() {}
firework.prototype.load = function() {
	return;
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};
firework.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};

firework.prototype.start = function() {
	$("head").append('<link rel="stylesheet" href="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/style/fireworks.css">');
	$("head").append('<script src="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/script/fireworks.js"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/scottschiller/fireworks.js/master/script/soundmanager2-nodebug-jsmin.js"></script>');
	
	createFirework(80,176,3,2,null,null,null,null,false,true);
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};

firework.prototype.stop = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};

firework.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
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
//```