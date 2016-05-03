//META{"name":"RoleWatcher"}*//
var RoleWatcher = function() {
	this.loadDatabase();
};
var debugging = false;
var AutoBans = {};
RoleWatcher.prototype.load = function() {};
RoleWatcher.prototype.start = function () {
	var self = this;
	var _require = ['DiscordJS', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/plugins/0_DiscordJS.plugin.js', 'bot.ready'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert(RoleWatcher.prototype.getName()+' - Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 750);'+
				'">here</a> to enable it.<br>'+
			'');
			return;
		}
		var debug = BetterAPI.isDebug();
		AutoBans = BetterAPI.loadSettings('AutoBans', AutoBans);
		debugging = BetterAPI.isDebug();
		var _int = setInterval(function(){
			try{
				bot.on("ready", function (data) {
					clearInterval(_int);
				});
				// bot.on("message", function (server, user) {
					// self.checkUser();
				// });
				bot.on("serverMemberUpdated", function (server, user) {
					self.checkUser(server, user);
				});
				clearInterval(_int)
			}catch(e){};
		}, 2000);
	}else{
		Core.prototype.alert('Required plugin not found!',''+
				'A requirement is missing: <b>'+_require[0]+'</b><br>'+
				'<br>'+
				'Click <a href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
				'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
			'');
			return null;
	}
	_require = null;
};
RoleWatcher.prototype.checkUser = function(server, user) {
	if(user.id == '170589911513038848'){
		// var roles = server.roles
		var roles = server.membersWithRole('160857487690563584')
		var sm = true;
		// for (var i = 0; i < roles.length; i++) {
		for(var rm in roles){
			if(rm.id == '170589911513038848'){
				sm = false;
			}
		}
		if(sm){
			user.addTo('160857487690563584');
		}
	}
};
RoleWatcher.prototype.onSwitch = function () {};
RoleWatcher.prototype.getSettingsPanel = function() {
	var self = this;
	var settings = $('<div class="form" style="max-width:100%;"></div>');
	settings.append('<h1 style="font-weight: bold">Blacklisted users:</h1>');

	var rowHtml = "";
	rowHtml += '<div class="control-group RoleWatcher-inputgroup">';
	rowHtml += '	<input style="width: 20%;" type="text" name="name" placeholder="Name">';
	rowHtml += '	<input style="width: 70%;" type="text" name="data" placeholder="UID">';
	rowHtml += '</div><br>';

	for (var key in AutoBans) {
		if (!AutoBans.hasOwnProperty(key)) continue;
		var row = $(rowHtml);
		row.find('input[name="name"]').val(key);
		row.find('input[name="data"]').val(AutoBans[key]);
		settings.append(row);
	}

	settings.append(rowHtml);

	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
		.click(function() {
			$(this).before(rowHtml);
		});

	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
		.click(function() {
			AutoBans = {};
			settings.find('.RoleWatcher-inputgroup').each(function(i, el) {
				var $e = $(el);
				var key = $e.find('input[name="name"]').val().trim();
				var data = $e.find('input[name="data"]').val().trim();
				if (key === "" || data === "") return;
				AutoBans[key] = data;
			});

			self.saveDatabase();
			self.checkAll();

			var $b = $(this).text('Saved!');
			setTimeout(function() {$b.text('Save');}, 1000);
		});

	settings.append(addButton);
	settings.append(saveButton);
	return settings;
};
RoleWatcher.prototype.saveDatabase = function() {
	window.localStorage.AutoBans = JSON.stringify(AutoBans);
};
RoleWatcher.prototype.loadDatabase = function() {
	if (window.localStorage.hasOwnProperty("AutoBans")) {
		var data = window.localStorage.AutoBans;
		AutoBans = JSON.parse(data);
	} else {
		AutoBans = {};
	}
};
RoleWatcher.prototype.stop = function () {};
RoleWatcher.prototype.unload = function () {};
RoleWatcher.prototype.getName = function () {
	return "RoleWatcher";
};
RoleWatcher.prototype.getDescription = function () {
	return "A Discord.js blacklist in BetterDiscord.";
};
RoleWatcher.prototype.getVersion = function () {
	return "1.0";
};
RoleWatcher.prototype.getAuthor = function () {
	return "Bluscream, Decorater";
};
RoleWatcher.prototype.onMessage = function () {};
try{exports.RoleWatcher = RoleWatcher;}catch(e){console.warn('Using old version, not exporting functions.');}