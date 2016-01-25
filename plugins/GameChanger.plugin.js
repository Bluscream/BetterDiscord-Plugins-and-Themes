//META{"name":"GameChanger"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function GameChanger() {}
GameChanger.prototype.load = function() { 
};
GameChanger.prototype.start = function() {
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
		var _name = $(".user-popout").find(".username").text();
		var _playing = "with "+_name+".";
		BdApi.setPlaying(_playing);
		localStorage.setItem('Playing', _playing);
		$('#owngame').remove();
	});
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new MutationObserver(function(mutations, observer) {
		$('#owngame').remove();
		GameChanger.prototype.addOwnGame();
	});
	observer.observe(document, {
	  subtree: true,
	  attributes: true
	});
};
GameChanger.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.popout');
	$('#owngame').remove();
};
GameChanger.prototype.unload = function() { 
};
GameChanger.prototype.onSwitch = function() {
	if ($('.private-channels').length > 0) {
		var user = $('.active').find('.channel-name').text();
		var _playing = "with "+user+".";
		BdApi.setPlaying(_playing);
	} else {
		var channel = BetterAPI.getCurrentTextChannelName();
		var server = BetterAPI.getCurrentServerName();
		var _playing = "in #"+channel+" on "+server+".";
		BdApi.setPlaying(_playing);
	}
	localStorage.setItem('Playing', _playing);
	$('textarea').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
};
GameChanger.prototype.getName = function() {
	return "Game Changer";
};
GameChanger.prototype.getDescription = function() {
	return "Shows which channel you are in as your game.";
};
GameChanger.prototype.getVersion = function() {
	return "1.0";
};
GameChanger.prototype.getAuthor = function() {
	return "Bluscream";
};
GameChanger.prototype.addOwnGame = function() {
	var ownID = BetterAPI.getOwnID();
	if(ownID){
		var users = $(".member-username");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
			if (avatarUrl.match(/\d+/) == ownID) {
				user.parent().append(''+
				'<div class="member-game" id="owngame">'+
				'<span>Playing </span>'+
				'<strong>'+localStorage.getItem('Playing')+'</strong>'+
				'');
			}
		}
	}
};