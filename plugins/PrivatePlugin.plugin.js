//META{"name":"PrivatePlugin"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work properly!
function PrivatePlugin() {
	mybotlist = ["97138137679028224","133337838942027776","132590828303548417","134390773377400832","136011222918103040","136896068397957121"];
}
PrivatePlugin.prototype.load = function() { 
};
PrivatePlugin.prototype.start = function() {
	// BetterAPI.changeUserInfo("Bluscream", "7fef6999df67e910379d5ad2a2f3863a");
	$('.emoji:not(.emote)').addClass('emote');
	$('textarea').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
	$('#bd-pub-button').html('<font color="lightblue">'+BetterAPI.serverCount()+'</font> | <font color="red">'+BetterAPI.userCount()+'</font>');
	botlist = mybotlist;
	setTimeout(function() {
		var scrollPane = $(".scroller.messages").first();
		$(scrollPane).scrollTop(999999999);
		var scrollPane = $(".scroller.channel-members").first();
        $(scrollPane).scrollTop(0);
	}, 1000);
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
	$('#bd-pub-button').html('<font color="lightblue">'+BetterAPI.serverCount()+'</font> | <font color="red">'+BetterAPI.userCount()+'</font>');
	botlist = mybotlist;
	setTimeout(function() {
		var scrollPane = $(".scroller.messages").first();
        $(scrollPane).scrollTop(999999999);
		var scrollPane = $(".scroller.channel-members").first();
        $(scrollPane).scrollTop(0);
	}, 1000);
};
PrivatePlugin.prototype.onMessage = function() {
	$('textarea').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
	botlist = mybotlist;
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