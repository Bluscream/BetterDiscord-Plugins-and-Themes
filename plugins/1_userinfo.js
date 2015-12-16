//META{"name":"userInfo"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function userInfo() {}
userInfo.prototype.load = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};
userInfo.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};
userInfo.prototype.start = function() {
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
        if ($('#UserInfo').length <= 0) {
			// var usernamebyid = BetterAPI.getUserNameById(id);
            $('.user-popout-options').append('<button class="btn" id="UserInfo">Info</button>');
            $('#UserInfo').on("click", function () {
				var username = $(".user-popout").find(".username").text();
				var id = BetterAPI.getUserIdByName(username);
				infoAlert(username +'\'s Info','Name: '+username+'\n'+'UID: '+id);
				// $.jAlert({
					// 'title': username +'\'s Info',
					// [ {'content': 'Name: '+username}, {'content': '\nUID: '+id} ]
					// 'theme': 'blue',
					// 'size': 'md',
					// 'showAnimation': 'fadeInUp',
					// 'hideAnimation': 'fadeOutDown' 
				// });
				console.clear();
				BetterAPI.log(0, "info", userInfo.prototype.getName()+": "+username+'\'s Info', "\n\nName: \""+username+"\"\nUID: \""+id+"\"");
            });
        }
    });
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};
userInfo.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.userInfo');
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};
userInfo.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
};
userInfo.prototype.getName = function() {
	return "User Info Plugin";
};
userInfo.prototype.getDescription = function() {
	return "Adds functionality to see more information.";
};
userInfo.prototype.getVersion = function() {
	return "1.0";
};
userInfo.prototype.getAuthor = function() {
	return "Bluscream";
};
/*
<div class="avatar-small" style="background-image:url(&quot;https://cdn.discordapp.com/avatars/82988905682440192/abaa0fc14a1a2940c7c1a0d21f0feb0b.jpg&quot;);" data-reactid=".0.1.1.0.2.1.1.0.0.1:$82988905682440192.0"><div class="status online" data-reactid=".0.1.1.0.2.1.1.0.0.1:$82988905682440192.0.0"></div></div>
*/