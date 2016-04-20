//META{"name":"PrivatePlugin"}*//
function PrivatePlugin() {
	this.getName = function() { return "Private"; };
	this.getDescription = function() { return "No information given."; };
	this.getVersion = function() { return "1.0"; };
	this.getAuthor = function() { return "Bluscream"; };
}
PrivatePlugin.prototype.load = function() {};
PrivatePlugin.prototype.start = function() {
	var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert('Private Plugin - Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 750);'+
				'">here</a> to enable it.<br>'+
			'');
			return null;
		}
		// BetterAPI.changeUserInfo("Bluscream", "7fef6999df67e910379d5ad2a2f3863a");BetterAPI.createCharCounter();
		$('.emoji:not(.emote)').addClass('emote');
		$('textarea').removeAttr( "disabled" );
		$('.channel-textarea').removeClass('channel-textarea-disabled');
		$('div[data-reactid=".0.1.1.0.0.0.3:$134680912691462144.0.0.0"]').click();
		setTimeout(function() {
			var scrollPane = $(".scroller.messages").first();
			$(scrollPane).scrollTop(999999999);
			var scrollPane = $(".scroller.channel-members").first();
			$(scrollPane).scrollTop(0);
		}, 1000);
		/*$('div[data-reactid=".0.1.1.0.2.0"]').livequery(function(){
			BetterAPI.addLocationBar();
		});*/
		try{$('.channel.btn-friends').livequery(function(){
			$('header[data-reactid$="$Direct Messages"]').html('PM\'s - <a onclick="$(\'.close\').click();">Clear all</a>')
		});
		}catch(e){}
		$('.server-info.server-name>span').livequery(function(){
			$('.server-info.server-name>span').each( function(i,e) { $(e).text($(e).text().replace(' by undefined', '')) });
			$('.server-info.server-region>span').each( function(i,e) {
				var _text = $(e).text();
				if(_text.contains('-')){
					_text = _text.replaceAll('-', ' ');
					_text = _text.toUpperCase();
				}else{
					_text = _text.capitalizeFirstLetter();
				}
				$(e).text(_text);
			});
		});
		$('#bd-pub-button').livequery(function(){
			$('#bd-pub-button').text($('#bd-pub-button').text().capitalizeFirstLetter());
		});
	}else{
		Core.prototype.alert('Required plugin not found!',''+
			'A requirement is missing: <b>'+_require[0]+'</b><br>'+
			'<br>'+
			'Click <a style=""href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
			'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
		'');
		return null;
	}
	_require = null;
};
PrivatePlugin.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.userInfo');
	$('#owngame').remove();
};
PrivatePlugin.prototype.unload = function() {
};
PrivatePlugin.prototype.onSwitch = function() {
	$('textarea').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
	//BetterAPI.createCharCounter();BetterAPI.updateLocationBar();
	setTimeout(function() {
		var scrollPane = $(".scroller.messages").first();
        $(scrollPane).scrollTop(999999999);
		var scrollPane = $(".scroller.channel-members").first();
        $(scrollPane).scrollTop(0);
	}, 1000);
	$('header[data-reactid$="$Direct Messages"]').html('PM\'s - <a onclick="PrivatePlugin.clearDMs();">Clear all</a>');
};
PrivatePlugin.prototype.onMessage = function() {
	$('textarea').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
	//PrivatePlugin.updateCount();PrivatePlugin.checkServerCount();
};
PrivatePlugin.updateCount = function() {
	servers = localStorage.getItem('servers');
	localStorage.setItem('servers', BetterAPI.serverCount());
	users = localStorage.getItem('users');
	localStorage.setItem('users', BetterAPI.userCount());
}
PrivatePlugin.checkUserCount = function() {
	_users = localStorage.getItem('users');
	if(users != _users){
		if (users < _users){
			alertify.success(Math.abs(users-_users)+' users(s) joined.');
		}else{
			alertify.error(Math.abs(users-_users)+' users(s) left.');
		}
	}
}
PrivatePlugin.checkServerCount = function() {
	_servers = localStorage.getItem('servers');
	if(servers != _servers){
		if (servers < _servers){
			alertify.success(Math.abs(servers-_servers)+' server(s) added.');
		}else{
			alertify.error(Math.abs(servers-_servers)+' server(s) removed.');
		}
	}
}
PrivatePlugin.clearDMs = function() {
	$('.close').each(function(i,el){
		$(el).click();
	});
}
try{exports.PrivatePlugin = PrivatePlugin;}catch(e){console.warn('Using old version, not exporting functions.')}