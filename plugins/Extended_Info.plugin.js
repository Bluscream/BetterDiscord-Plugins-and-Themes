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
		avatarURL = BetterAPI.getAvatarURL(id);
		nameByID = BdApi.getUserNameById(id);
		gameByID = BetterAPI.getUserGameByID(id);
		if(!avatarID){
			avatarID = BetterAPI.getUserAvatarIDbyName(name);
		}
		if(!avatarURL){
			avatarURL = BetterAPI.getAvatarURLbyName(name);
		}
		var _label = '<div class="text">';
		if (avatarURL) {
			var _label = _label + '<img src='+avatarURL+' style="max-width:223px;"></img>';
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
		BetterAPI.addUserLabel("UserInfoLabel", "Info", _label+'</div>');
		$('.member-role-add').parent().css( "background-color", "rgba(0,255,0,0.4)")
		function checkRoles(){ if($('.member-role-remove').length > 0){ return 1; }else{ return 0; } }
		if($('.member-role-remove').length > 1 && $('#removeallroles').length < 1){
			$('div[data-reactid^=".0.4.$=11=2$"]>.member-roles').append('<li class="member-role manipulate" style="background-color:rgba(255,0,0,0.4) !important;"><span class="name">Remove all</span><button type="button" class="member-role-remove" id="removeallroles"></button></li>');
			$('#removeallroles').click(function(){	
				withDelay(500)
					.while(checkRoles)
						.do(function(){
							$('.member-role-remove:first').click();
						});
			});
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
	$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').livequery(function(){
		BetterAPI.addServerButton("serverinfobutton", "Server Info", "before");
	});
	$("#serverinfobutton").livequery(function(){
		$("#serverinfobutton").click(function(){
			var _data = "";
			var _title = "Server Information";
			if (!$('.bd-alert').length <= 0) {
				$('.bd-alert').remove();
			}
			var sname = BetterAPI.getCurrentServerName();
			var sid = BetterAPI.getCurrentServerID();
			if(sid){
				var aurl = BetterAPI.getAvatarURL(''+sid);
			}
			var tcn = BetterAPI.getCurrentTextChannelName();
			var tcid = BetterAPI.getCurrentTextChannelID();
			var vc = BetterAPI.getCurrentVoiceChannelName();
			var uc = BetterAPI.userCount();
			var onuc = BetterAPI.onlineUserCount();
			var offuc = BetterAPI.offlineUserCount();
			if(sname){ _title = 'Server Information - '+sname; _data = _data+'<b>Name: </b>'+sname+'<br>';	}
			if(sid){ _data = _data+'<b>Server ID: </b>'+sid+'<br>'; }
			if(tcn){ _data = _data+'<br><b>Active Text Channel: </b>'+tcn+'<br>'; }
			if(tcid){ _data = _data+'<b>Active Text Channel ID: </b>'+tcid+'<br>'; }
			if(vc){ _data = _data+'<br><b>Active Voice Channel: </b>'+vc+'<br>'; }
			if(uc){ _data = _data+'<br><b>Users: </b>Total: <b>'+uc+'</b> Online: <font color="green">'+onuc+'</font> Offline: <font color="red">'+offuc+'</font>'; }
			Core.prototype.alert(_title, '\
				<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="3">\
					<TR>\
						<TD><img width="165px" height="165px" src='+aurl+'></img></TD>\
						<TD>\
							'+_data+'\
						</TD>\
					</TR>\
				</TABLE>\
			');
		});
	});
	$('ul[data-reactid=".0.1.1.0.1.3"]').livequery(function(){
		BetterAPI.addLink("status", "Status", "status", "lg");
		$('#status').click(function(){
			BetterAPI.openStatusPopup();
		});
		BetterAPI.addLink("plus", "+", "https://discordapp.com/widget?id=134680912691462144&theme=dark", "sm");
		$('#plus').click(function(){
			$.jAlert({
				'iframe': $('#plus').attr('href'),
				'size': $('#plus').attr('size'),
				'theme': 'black',
				'title': 'BD+ (0kdpwyLsTTT8fB2t)'
			 });
		});
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
	// updateMembers();
	updateMembers = function() {
		if((BetterAPI.userCount()) && (BetterAPI.userCount() > 0)){
			$('.friends-online').text('');
			$('.friends-online').html(BetterAPI.onlineFriendsCount()+' | <font color="lightblue">'+BetterAPI.serverCount()+'</font> | <font color="red">'+BetterAPI.userCount()+'</font>');
		}else{
			$('.friends-online').text('');
			$('.friends-online').html(BetterAPI.onlineFriendsCount()+' | <font color="lightblue">'+BetterAPI.serverCount()+'</font>');
		}
	}
	// appendMembers();
	appendMembers = function() {
		if ($("#totalmembers").length <= 0) {
			$('.scroller.channel-members').prepend('\
			<h2 id="totalmembers" style="background:none !important;">\
				<span>Total</span>\
				<span>—</span>\
				<span>'+BetterAPI.userCount()+'</span>\
			</h2>');
		};
	};
	$('.footer').livequery(function(){
		if($('#bdcl').length <= 0){
			$('.footer').append(' | <a id="bdchangelog">BD Change Log</a>');
			$('#bdchangelog').click(function(){
				$('span[data-reactid=".0.5"]').remove();
				$("body").append(Core.prototype.constructChangelog());
			});
		}
	});
};
userInfo.prototype.onSwitch = function() {
	//appendMembers();
	//updateMembers();
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
	return "Extended Info";
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