//META{"name":"DiscordJS"}*//

var DiscordJS = function () {
	'use strict';
	this.getName = function(){ return "DiscordJS Plugin"; }
	this.getDescription = function(){ return "Allows you to use DiscordJS Features."; }
	this.getVersion = function(){ return "1"; }
	this.getAuthor = function(){ return "Bluscream"; }
};
DiscordJS.prototype.load = function () {
	var source;var debug = false;
	if(debug){
		source = "https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/dist/DiscordJS.js";
	}else{
		source = "https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/dist/DiscordJS.min.js";
	}
	$("<script/>",{ type: "text/javascript", src: source, id: "DiscordJS" }).appendTo($("head"));
};
DiscordJS.prototype.start = function () {
	// var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	// if(BdApi.getPlugin(_require[0]) !== null){
		// try{eval(_require[2]);
		// }catch(e){
			// Core.prototype.alert(BetterDiscordBot.prototype.getName()+' - Requirement not started!',''+
				// 'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				// '<br>'+
				// 'Click <a onClick="'+
					// '$(\'.btn-settings\').click();'+
					// 'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					// 'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					// ' }, 750); }, 750);'+
				// '">here</a> to enable it.<br>'+
			// '');
			// return;
		// }
	// }else{
		// Core.prototype.alert('Required plugin not found!',''+
				// 'A requirement is missing: <b>'+_require[0]+'</b><br>'+
				// '<br>'+
				// 'Click <a href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
				// 'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
			// '');
			// return null;
	// }
	// _require = null;
};

DiscordJS.prototype.onSwitch = function () {};
DiscordJS.prototype.onMessage = function () {};
DiscordJS.prototype.observer = function (e) {};

DiscordJS.prototype.stop = function () {};
DiscordJS.prototype.unload = function () {};
DiscordJS.prototype.getSettingsPanel = function () {
	return "<h3>Settings Panel</h3>";
};
try{exports.DiscordJS = DiscordJS;}catch(e){console.warn('DiscordJS: Using old BetterDiscord version, not exporting functions.')}