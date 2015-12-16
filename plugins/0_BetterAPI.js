//META{"name":"BetterAPI"}*//
//```
function BetterAPI() {}

BetterAPI.prototype.load = function() {
	
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
	
	//getUserIdByName
	BetterAPI.getUserIdByName = function(name) {
		var nick = "";
		var match = "";
		
		// $.post("GET https://discordapp.com/api/channels/110373943822540800/messages?before=111222333444555666&after=111222333444555666&limit=50", function(data, status){
			// console.log("Data: " + nonce + "\nStatus: " + status);
		// });
		
		var users = $(".member-username");
		// console.clear();
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			// console.log("Userlist: #"+i+" " + user.text() + " | name: "+name)
			if(user.text() == name) {
				var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
				match = avatarUrl.match(/\d+/);
				nick = user.text();
			}
		}
		if (match == "") {
            [].slice.call($('.message-group')).forEach(function (message) {
				var user = $(message).find(".user-name");
				var comment = $(user).parents(".comment");
				var silbling = $(comment).prev();
				var avatarUrl = $(silbling).css("background-image");
				match = avatarUrl.match(/\d+/);
				// console.log("UID of "+user.text()+": "+match)
				nick = user.text();
			});
		};
		if (match != "") {
			console.log("UID of \""+nick+"\" is "+match);
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
		// $.post("https://discordapp.com/api/auth/login",
		// {
			// email: "admin@timo.de.vc",
			// password: "wxiWH.@P9PBJiezw|u%(]H?*lV)4Op*D%);({]k08#0U*mE[p/DunaFVY{If4HJV2U;^%NWN>|-;eF[%&ZWWVh~]=Vi-e-?j-r7j@fHs,^%_{_=i+;_pqW#ez2.&G4wz,w(Gv{5Xi-9L?Pb*L#h)VNWVT-7>w(+/{Car>D]Oy;Gp-g=*-nc/)/Ek]t(E[[B=$f[zI=gx"
		// },
		// function(token){
			// console.log("token: " + token);
		// });
		
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
//```