//META{"name":"BetterAPI"}*//
function BetterAPI() {}

BetterAPI.prototype.load = function() {
	
	var debug = 1;
	
	//appendTo
	BetterAPI.appendTo = function(link, Element){
		var $head = $("head");
		var $headlinklast = $head.find( link + ":last");
		if ($headlinklast.length){
		   $headlinklast.after(Element);
		}
		else {
		   $head.append(Element);
		};
	};
	
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css" type="text/css">');
	// $("head").append('<script src="https://cdn.rawgit.com/hydrabolt/discord.js/master/lib/index.js"></script>');
	// $("head").append('<script src="https://cdn.rawgit.com/izy521/discord.io/master/lib/index.js"></script>');
	// $("head").append('<script src="https://cdn.rawgit.com/qeled/discordie/master/lib/index.js"></script>');
	
	//isNumber
	BetterAPI.isNumber = function(string) {
		return /^\d+$/.test(string);
	};
	//log
	BetterAPI.log = function(dbg, type, pluginName, msg, vars) {
		if ( (dbg = "debug") || (dbg = 1) ) {
			if (debug == 1) {
				switch(type) {
					case "info":
						console.info("[BetterDiscord] " + pluginName + ": " + msg, vars);
						break;
					case "warn":
						console.warn("[BetterDiscord] " + pluginName + ": " + msg, vars);
						break;
					case "error":
						console.error("[BetterDiscord] " + pluginName + ": " + msg, vars);
						break;
					default:
						console.log("[BetterDiscord] " + pluginName + ": " + msg, vars);
				};
			} else {
				return;
			}
		} else {
			switch(type) {
				case "info":
					console.info("[BetterDiscord] " + pluginName + ": " + msg, vars);
					break;
				case "warn":
					console.warn("[BetterDiscord] " + pluginName + ": " + msg, vars);
					break;
				case "error":
					console.error("[BetterDiscord] " + pluginName + ": " + msg, vars);
					break;
				default:
					console.log("[BetterDiscord] " + pluginName + ": " + msg, vars);
			};
		};	
	};
	//getUserIdByName
	BetterAPI.getUserIdByName = function(name) {
		var nick = "";
		var match = "";		
		var users = $(".member-username");
		// console.clear();
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			if(user.text() == name) {
				var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
				match = avatarUrl.match(/\d+/);
				nick = user.text();
			};
		};
		if (match == "") {
            [].slice.call($('.message-group')).forEach(function (message) {
				var user = $(message).find(".user-name");
				var username = user.text();
				var comment = $(user).parents(".comment");
				var silbling = $(comment).prev();
				var avatarUrl = $(silbling).css("background-image");
				if (name == username) {
					match = avatarUrl.match(/\d+/);
					nick = user.text();
				};
			});
		};
		if ( ( match != "" ) && ( /^\d+$/.test(match) ) && ( ( match.length < 17 ) || ( match.length > 18 ) ) ) {
			console.log("BetterDiscord: "+ BetterAPI.prototype.getName() +": UID of \""+nick+"\" is "+match);
			return match;
		} else {
			return null;
		};
	};
	//getUserNameById
	BetterAPI.getUserNameById = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			var url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-username").text();
			}
		}
		if (match == "") {
			var users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				var user = $(users[i]);
				var url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-username").text();
				}
			}
		};
		if (match != "") {
			return match;
		} else {
			return null;
		};
	};
	
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js"></script>');

	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};

BetterAPI.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};

BetterAPI.prototype.start = function() {		
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};

BetterAPI.prototype.stop = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};

BetterAPI.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
};

BetterAPI.prototype.getName = function() {
	return "BetterAPI Plugin";
};

BetterAPI.prototype.getDescription = function() {
	return "Enhances the BetterDiscord Plugin API.";
};

BetterAPI.prototype.getVersion = function() {
	return "1.0";
};

BetterAPI.prototype.getAuthor = function() {
	return "Bluscream";
};