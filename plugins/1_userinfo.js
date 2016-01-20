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
		if(!avatarID){
			avatarID = BetterAPI.getUserAvatarIDbyName(name);
		}
		if(!avatarURL){
			avatarURL = BetterAPI.getUserAvatarURLbyName(name);
		}
		var _label = '';
		if (avatarURL) {
			var _label = _label + '<img src="'+avatarURL+'" style="max-width:223px;"></img>';
		}
		if (name) {
			var _label = _label + '<br><b>Name: </b>'+name+'';
		}
		if (BetterAPI.isUID(id)) {
			var _label = _label + '<br><b>UID: </b><span style="color:darkgrey">'+id+'</span>';
		}
		if (avatarID) {
			var _label = _label + '<br><b>AID: </b><span style="font-size:x-small">'+avatarID+'</span>';
		}
		if (gameByID) {	
			var _label = _label +'<br><b>Game: </b><span style="color:blue">'+gameByID+'</span>';
		}
		BetterAPI.addUserLabel("UserInfoLabel", "Info", _label);
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
	$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').livequery(function(){
		BetterAPI.addServerButton("serverinfobutton", "Server Info", "before");
	});
	$("#serverinfobutton").livequery(function(){
		$("#serverinfobutton").click(function(){
			if (!$('.bd-alert').length <= 0) {
				$('.bd-alert').remove();
			}
			var sname = BetterAPI.getCurrentServerName();
			var sid = BetterAPI.getCurrentServerID();
			Core.prototype.alert('Server Information - '+sname, '\
				<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="3">\
					<TR>\
						<TD><img border="5" src="'+BetterAPI.getUserAvatarURL(''+sid)+'"></img></TD>\
						<TD>\
							<b> Name: </b>'+sname+'<br>\
							<b> Server ID: </b>'+sid+'<br><br>\
							<b> Channel: </b>'+BetterAPI.getCurrentChannelName()+'<br>\
							<b> Channel ID: </b>'+BetterAPI.getCurrentChannelID()+'<br><br>\
							<b> Users: </b>Total: <b>'+BetterAPI.userCount()+'</b> Online: <font color="green">'+BetterAPI.onlineUserCount()+'</font> Offline: <font color="red">'+BetterAPI.offlineUserCount()+'</font><br>\
						</TD>\
					</TR>\
				</TABLE>\
			');
		});
	});
	$('ul[data-reactid=".0.1.1.0.1.3"]').livequery(function(){
			BetterAPI.addLink("status", "Status", "status", "lg");
	});
	$('#status').click(function(){
		if(BetterAPI.getCurrentServerID() == "129022124844253184"){
			$.jAlert({
				'iframe': 'https://steamstat.us',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		} else {
			$.jAlert({
				'iframe': 'https://status.discordapp.com',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		};
	});
	$('.user-settings-modal-account').livequery(function(){
		if ($("#userinfopanel").length <= 0) {
			id = BetterAPI.getOwnID();
			avatarID = BetterAPI.getOwnAvatarID();
			if(!avatarID){
				avatarID = BetterAPI.getUserAvatarIDbyName(name);
			}
			var _label = '';
			if (BetterAPI.isUID(id)) {
				// var _label = _label + '<b>Unique ID: </b><span style="color:darkgrey">'+id+'</span>';
				var _label = _label + '<div class="control-group" data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.1" id="userinfopanel">\
					<label data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0" for="settings-username">\
						<span data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0.0">Unique ID</span>\
					</label>\
					<input data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.1" id="settings-username" type="text" value="'+id+'" disabled></div>'
			}
			if (avatarID) {
				// var _label = _label + '<br><br><b>Avatar ID: </b><span>'+avatarID+'</span>';
				var _label = _label + '<div class="control-group" data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.1" id="userinfopanel">\
					<label data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0" for="settings-username">\
						<span data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.0.0">Avatar ID</span>\
					</label>\
					<input data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0.0.1" id="settings-username" type="text" value="'+avatarID+'" disabled></div>'
			}
			$('div[data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1.0"]').append(_label);
		}
	});
	appendMembers = function() {
		if ($("#totalmembers").length <= 0) {
			$('.scroller.channel-members').prepend('\
			<h2 id="totalmembers">\
				<span>Total</span>\
				<span>—</span>\
				<span>'+BetterAPI.userCount()+'</span>\
			</h2>');
		};
	};
	// appendMembers();
};
userInfo.prototype.onSwitch = function() {
	// appendMembers();
};
userInfo.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.userInfo');
	$('#serverinfobutton').off('click');
	$('#serverinfobutton').remove();
	$('.settings-panel').off('DOMNodeInserted.user-settings-modal-account');
};
userInfo.prototype.update = function() {
};
userInfo.prototype.getName = function() {
	return "Extended Info Plugin";
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