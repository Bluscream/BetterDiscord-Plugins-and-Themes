//META{"name":"PrivatePlugin"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function PrivatePlugin() {}
var BetterAPI = BetterAPI || bdplugins.BetterAPI.plugin.constructor
PrivatePlugin.prototype.load = function() {};
PrivatePlugin.prototype.start = function() {
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
PrivatePlugin.prototype.getName = function() {
	return "Private";
};
PrivatePlugin.prototype.getDescription = function() {
	return "No information given.";
};
PrivatePlugin.prototype.getVersion = function() {
	return "1.0";
};
PrivatePlugin.prototype.getAuthor = function() {
	return "Bluscream";
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
exports.PrivatePlugin = PrivatePlugin;