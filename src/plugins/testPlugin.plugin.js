//META{"name":"testPlugin"}*//
function testPlugin() {
	var settings = {
		testSettingBool : true,
		testSettingInt : 123,
		testSettingStr : "Test String"
	}
}
testPlugin.prototype.getName = function() { return "Test"; };
testPlugin.prototype.getDescription = function() { return "Test Description"; };
testPlugin.prototype.getVersion = function() { return "1.0"; };
testPlugin.prototype.getUpdateURL = function() { return "https://cdn.rawgit.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/src/plugins/testPlugin.plugin.js"; };
testPlugin.prototype.getAuthor = function() { return "Jiiks"; };
testPlugin.prototype.getSettingsPanel = function() {
    return '<h3>Test Plugin Settings Panel</h3>';
};

testPlugin.prototype.load = function() {
	var _require = ['BetterAPI', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(__require[1]) !== null){
		try{eval(_require[1]);
			testPlugin.settings = BetterAPI.loadSettings('testPlugin', testPlugin.settings);
			console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
		}catch(e){console.error('BetterDiscord: Could not load plugin '+this.getName()+' because requirement '+_require+' was not found!\n'+e);}
};
testPlugin.prototype.start = function() {
	var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2])
		}catch(e){
			Core.prototype.alert('Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 500);'+
				'">here</a> to enable it.<br>'+
			'');
			return null;
		}
		testPlugin.settings = BetterAPI.loadSettings('testPlugin', testPlugin.settings);
		console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.", "color: purple; font-weight: bold;", "");
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

testPlugin.prototype.onMessage = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onMessage] event fired.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.onSwitch = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [onSwitch] event fired.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.socketEvent = function(data) {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [socketEvent] event fired.", "color: purple; font-weight: bold;", "");
	console.log(data);
};
testPlugin.prototype.observer = function(e) {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " [observer] change fired.", "color: purple; font-weight: bold;", "");
    console.log(e);
};

testPlugin.prototype.stop = function() {
	BetterAPI.saveSettings('testPlugin', testPlugin.settings);
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.", "color: purple; font-weight: bold;", "");
};
testPlugin.prototype.unload = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.", "color: purple; font-weight: bold;", "");
};
