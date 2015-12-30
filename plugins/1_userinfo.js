//META{"name":"userInfo"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function userInfo() {}
userInfo.prototype.load = function() {
};
userInfo.prototype.unload = function() {
};
userInfo.prototype.start = function() {
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
		var name = $(".user-popout").find(".username").text();
		id = BetterAPI.getUserIdByName(name);
		avatarID = BetterAPI.getUserAvatarID(id);
		avatarURL = BetterAPI.getUserAvatarURL(id);
		nameByID = BdApi.getUserNameById(id);
		gameByID = BetterAPI.getUserGameByID(id);
		if (gameByID == null) {	
			BetterAPI.addUserLabel("UserInfoLabel", "Info", ''+
			'<img src="'+avatarURL+'" style="max-width:223px;"></img><br>'+
			'<b>Name: </b>'+name+'<br>'+
			'<b>UID: </b><span style="color:darkgrey">'+id+'</span><br>'+
			'<b>AID: </b><span style="font-size:x-small">'+avatarID+'</span>');
		} else {
			BetterAPI.addUserLabel("UserInfoLabel", "Info", ''+
			'<img src="'+avatarURL+'" style="max-width:223px;"></img><br>'+
			'<b>Name: </b>'+name+'<br>'+
			'<b>UID: </b><span style="color:darkgrey">'+id+'</span><br>'+
			'<b>AID: </b><span style="font-size:x-small">'+avatarID+'</span><br>'+
			'<b>Game: </b><span style="color:blue">'+gameByID+'</span>');
		}
		// BetterAPI.addUserButton("btn", "#UserInfo", "Info");
		// $('#UserInfo').on("click", function () {
			// $.jAlert({
				// 'title': name +'\'s Info',
				// 'content': '<table style="width:100%">'+
					// '<tr>'+
						// '<td><b>Name: </b></td>'+
						// '<td>'+name+'</td>'+
					// '</tr>'+
					// '<tr>'+
						// '<td><b>UID: </b></td>'+
						// '<td>'+id+'</td>'+
					// '</tr>'+
					// '<tr>'+
						// '<td><b>Name by ID: </b></td>'+
						// '<td>'+nameByID+'</td>'+
					// '</tr>'+
				// '</table>',
				// 'theme': 'blue',
				// 'btns': [ {
					// 'text': 'Copy',
					// 'class': 'btn_copy',
					// 'onClick': function(e, btn) { new Clipboard('ja_body'); BetterAPI.log(1, "log", userInfo.prototype.getName()+": ",'Copied \"'+$('.ja_body').html()+'\" to clipboard.'); },
				// }, {
					// 'text': 'Close'
				// } ]
			// });
			// BetterAPI.log(0, "info", userInfo.prototype.getName()+": "+name+'\'s Info', "\n\nName: \""+name+"\"\nUID: \""+id+"\"");
		// });
	});
};
userInfo.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.userInfo');
};
userInfo.prototype.update = function() {
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