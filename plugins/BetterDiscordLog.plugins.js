//META{"name":"BetterDiscordLog"}*//
var BetterDiscordLog = function() {
	this.loadDatabase();
};
var debugging = false;
var BetterDiscordLogging = {
	settings : {
		enabled : true,
		autoscroll : true,
		debug : true
	},
	events : {
		ready : true,
		disconnected : true,
		raw : false,
		presence : false,
		debug : true,
		warn : true,
		error : true,
		message : false,
		messageUpdated : false,
		messageDeleted : true,
		serverCreated : true,
		serverUpdated : true,
		serverDeleted : true,
		channelCreated : true,
		channelUpdated : true,
		channelDeleted : true,
		serverRoleCreated : true,
		serverRoleUpdated : true,
		serverRoleDeleted : true,
		serverNewMember : true,
		serverMemberUpdated : false,
		serverMemberRemoved : true,
		userTypingStarted : false,
		userTypingStopped : false,
		userUnbanned : true,
		userBanned : true,
		voiceJoin : false,
		voiceStateUpdate : false,
		voiceLeave : false
	}
};
BetterDiscordLog.prototype.load = function() {};
BetterDiscordLog.prototype.start = function () {
	var _require = ['Discord.JS', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/plugins/0_DiscordJS.plugin.js', 'bot.ready'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert(BetterDiscordLog.prototype.getName()+' - Requirement not started!',''+
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
		BetterDiscordLogging = BetterAPI.loadSettings('BetterDiscordLogging', BetterDiscordLogging);
		BetterAPI.requireCSS("https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.css", "tableCSS");
		BetterAPI.requireJS("https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.js", "tableJS");
		debugging = BetterAPI.isDebug();
		BetterDiscordLog.addLogWindow();
		$('span[style="background-image:url(\'/assets/cfb80ab4c0c135cdcb4dbcf0db124c4d.svg\');"]').parent().before('<button id="bdlogbutton" type="button"><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');color:white;"></span></button>');
		$('#bdlogbutton').click(function () {
			if (!BetterAPI.elemExists('#bdlog')) {
				BetterDiscordLog.addLogWindow();
			}
			$('#bdlog').toggle();
		});
		toggleLog = function() {
			$('#bdlog').toggle();
		};
		var lastBanned = 0;
		bot.on("message", function (message) {
			if (BetterDiscordLogging.events.message) {
				if (debugging) { BetterDiscordLog.debug('message', arguments); }
				BetterDiscordLog.log('info', 'message', '<a href="https://discordapp.com/channels/' + message.channel.server.id + '/">' + message.channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + message.channel.server.id + '/' + message.channel.id + '">#' + message.channel.name + '</a>', 'Message ' + wM(message.cleanContent) + ' got created by ' + wN(message.author.username) + '.');
			}
		});
		bot.on("ready", function (data) {
			if (BetterDiscordLogging.events.ready) {
				if (debugging) {
					BetterDiscordLog.debug('ready', arguments);
				}
				BetterDiscordLog.log('info', 'ready', '', '', 'Client is ready.');
				console.log("BetterDiscordLog: Client connected.");
			}
		});
		bot.on("disconnected", function (data) {
			if (BetterDiscordLogging.events.disconnected) {
				if (debugging) {
					BetterDiscordLog.debug('disconnected', arguments);
				}
				BetterDiscordLog.log('info', 'disconnected', '', '', 'Client got disconnected.');
			}
		});
		bot.on("raw", function (data) {
			if (BetterDiscordLogging.events.raw) {
				if (debugging) {
					BetterDiscordLog.debug('raw', arguments);
				}
				BetterDiscordLog.log('info', 'raw', '', '', 'Got raw data.');
			}
		});
		bot.on("debug", function () {
			if (BetterDiscordLogging.events.debug) {
				if (debugging) {
					BetterDiscordLog.debug('debug', arguments);
				}
				BetterDiscordLog.log('debug', 'debug', '', '', arguments[0].capitalizeFirstLetter());
			}
		});
		bot.on("warn", function () {
			if (BetterDiscordLogging.events.warn) {
				if (debugging) {
					BetterDiscordLog.debug('warn', arguments);
				}
				BetterDiscordLog.log('warn', 'warn', '', '', arguments[0].capitalizeFirstLetter());
			}
		});
		bot.on("error", function (data) {
			if (BetterDiscordLogging.events.error) {
				if (debugging) {
					BetterDiscordLog.debug('error', arguments);
				}
				BetterDiscordLog.log('error', 'error', '', '', arguments[0].capitalizeFirstLetter());
			}
		});
		bot.on("presence", function (olduser, newuser) {
			if (BetterDiscordLogging.events.presence) {
				if (debugging) {
					BetterDiscordLog.debug('presence', arguments);
				}
				BetterDiscordLog.log('info', 'presence', '', '', wN(olduser.username) + ' changed presence.');
			}
		});
		bot.on("messageUpdated", function (oldmessage, message) {
			if (BetterDiscordLogging.events.messageUpdated) {
				if (debugging) {
					BetterDiscordLog.debug('messageUpdated', arguments);
				}
				BetterDiscordLog.log('info', 'messageUpdated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', 'Message ' + wID(oldmessage.id) + ' got edited by ' + wN(oldmessage.author.username) + '.');
			}
		});
		bot.on("messageDeleted", function (message, channel) {
			if (BetterDiscordLogging.events.messageDeleted) {
				if (debugging) {
					BetterDiscordLog.debug('messageDeleted', arguments);
				}
				try {
					BetterDiscordLog.log('info', 'messageDeleted', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', 'Message ' + wM(message.cleanContent) + ' by ' + wN(message.author.username) + ' got deleted' + '.');
				} catch (e) {}
			}
		});
		bot.on("serverCreated", function (server) {
			if (BetterDiscordLogging.events.serverCreated) {
				if (debugging) {
					BetterDiscordLog.debug('serverCreated', arguments);
				}
				BetterDiscordLog.log('info', 'serverCreated', '', '', 'Server ' + wS(server.name) + ' was created' + '.');
			}
		});
		bot.on("serverUpdated", function (oldserver, server) {
			if (BetterDiscordLogging.events.serverUpdated) {
				if (debugging) {
					BetterDiscordLog.debug('serverUpdated', arguments);
				}
				BetterDiscordLog.log('info', 'serverUpdated', '', '', 'Server ' + wS(server.name) + ' was edited' + '.');
			}
		});
		bot.on("serverDeleted", function (server) {
			if (BetterDiscordLogging.events.serverDeleted) {
				if (debugging) {
					BetterDiscordLog.debug('serverDeleted', arguments);
				}
				BetterDiscordLog.log('info', 'serverDeleted', '', '', 'Server ' + wS(server.name) + ' was deleted' + '.');
			}
		});
		bot.on("channelCreated", function (channel) {
			if (BetterDiscordLogging.events.channelCreated) {
				if (debugging) {
					BetterDiscordLog.debug('channelCreated', arguments);
				}
				try {
					BetterDiscordLog.log('info', 'channelCreated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel <a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a> was created' + '.');
				} catch (e) {}
			}
		});
		bot.on("channelUpdated", function (oldchannel, channel) {
			if (BetterDiscordLogging.events.channelUpdated) {
				if (debugging) {
					BetterDiscordLog.debug('channelUpdated', arguments);
				}
				try {
					BetterDiscordLog.log('info', 'channelUpdated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel ' + wN(oldchannel.name) + ' was edited to <a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>.');
				} catch (e) {}
			}
		});
		bot.on("channelDeleted", function (channel) {
			if (BetterDiscordLogging.events.channelDeleted) {
				if (debugging) {
					BetterDiscordLog.debug('channelDeleted', arguments);
				}
				try {
					BetterDiscordLog.log('info', 'channelDeleted', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel ' + wN(channel.name) + ' was deleted' + '.');
				} catch (e) {}
			}
		});
		bot.on("serverRoleCreated", function (role) {
			if (BetterDiscordLogging.events.serverRoleCreated) {
				if (debugging) {
					BetterDiscordLog.debug('serverRoleCreated', arguments);
				}
				BetterDiscordLog.log('info', 'serverRoleCreated', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role <text style="color:' + role.colorAsHex() + '">\'' + role.name + '\'</text> was created' + '.');
			}
		});
		bot.on("serverRoleUpdated", function (oldrole, role) {
			if (BetterDiscordLogging.events.serverRoleUpdated) {
				if (debugging) {
					BetterDiscordLog.debug('serverRoleUpdated', arguments);
				}
				BetterDiscordLog.log('info', 'serverRoleUpdated', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role ' + wN('<text style="color:' + oldrole.colorAsHex() + '">' + oldrole.name + '</text>') + ' was edited to ' + wN('<text style="color:' + role.colorAsHex() + '">' + role.name + '</text>') + '.');
			}
		});
		bot.on("serverRoleDeleted", function (role) {
			if (BetterDiscordLogging.events.serverRoleDeleted) {
				if (debugging) {
					BetterDiscordLog.debug('serverRoleDeleted', arguments);
				}
				BetterDiscordLog.log('info', 'serverRoleDeleted', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role <text style="color:' + role.colorAsHex() + '">\'' + role.name + '\'</text> was deleted' + '.');
			}
		});
		bot.on("serverNewMember", function (server, user) {
			if (BetterDiscordLogging.events.serverNewMember) {
				if (debugging) {
					BetterDiscordLog.debug('serverNewMember', arguments);
				}
				if (server.id == BetterAPI.getCurrentServerID()) {
					alertify.notify('<span style="color:green !important;">' + wN(user.name) + ' joined.</span>');
				}
				BetterDiscordLog.log('info', 'serverNewMember', '<a href="https://discordapp.com/channels/' + server.id + '/">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' joined' + '.');
			}
		});
		bot.on("serverMemberUpdated", function (server, user) {
			if (BetterDiscordLogging.events.serverMemberUpdated) {
				if (debugging) {
					BetterDiscordLog.debug('serverMemberUpdated', arguments);
				}
				BetterDiscordLog.log('info', 'serverMemberUpdated', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' updated' + '.');
			}
		});
		bot.on("serverMemberRemoved", function (server, user) {
			if (BetterDiscordLogging.events.serverMemberRemoved) {
				if (debugging) {
					BetterDiscordLog.debug('serverMemberRemoved', arguments);
				}
				if (server.id == BetterAPI.getCurrentServerID() && user.id != lastBanned) {
					alertify.success('<span style="color:red !important;">' + wN(user.name) + ' left or kicked.</span>');
				}else{lastBanned = 0;}
				BetterDiscordLog.log('info', 'serverMemberRemoved', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' left or was kicked' + '.');
			}
		});
		bot.on("userTypingStarted", function (user, channel) {
			if (BetterDiscordLogging.events.userTypingStarted) {
				if (debugging) {
					BetterDiscordLog.debug('userTypingStarted', arguments);
				}
				BetterDiscordLog.log('info', 'userTypingStarted', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', wN(user.name) + ' started typing in ' + wS(channel.name) + '.');
			}
		});
		bot.on("userTypingStopped", function (user, channel) {
			if (BetterDiscordLogging.events.userTypingStopped) {
				if (debugging) {
					BetterDiscordLog.debug('userTypingStopped', arguments);
				}
				BetterDiscordLog.log('info', 'userTypingStopped', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', wN(user.name) + ' stopped typing in ' + wS(channel.name) + '.');
			}
		});
		bot.on("userUnbanned", function (user, server) {
			if (BetterDiscordLogging.events.userUnbanned) {
				if (debugging) {
					BetterDiscordLog.debug('userUnbanned', arguments);
				}
				if (server.id == BetterAPI.getCurrentServerID()) {
					alertify.success(wN(user.name) + ' was unbanned.');
				}
				BetterDiscordLog.log('info', 'userUnbanned', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN(user.name) + ' was unbanned' + '.');
			}
		});
		bot.on("userBanned", function (user, server) {
			if (BetterDiscordLogging.events.userBanned) {
				if (debugging) {
					BetterDiscordLog.debug('userBanned', arguments);
				}
				if (server.id == BetterAPI.getCurrentServerID()) {
					lastBanned = user.id;
					alertify.error(wN(user.name) + ' was banned.');
				}
				BetterDiscordLog.log('info', 'userBanned', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN(user.name) + ' was banned' + '.');
			}
		});
		bot.on("voiceJoin", function (voicechannel, user) {
			if (BetterDiscordLogging.events.voiceJoin) {
				if (debugging) {
					BetterDiscordLog.debug('voiceJoin', arguments);
				}
				BetterDiscordLog.log('info', 'voiceJoin', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' joined voice channel ' + wS(voicechannel.id) + '.');
			}
		});
		bot.on("voiceStateUpdate", function (voicechannel, user) {
			if (BetterDiscordLogging.events.voiceStateUpdate) {
				if (debugging) {
					BetterDiscordLog.debug('voiceStateUpdate', arguments);
				}
				BetterDiscordLog.log('info', 'voiceStateUpdate', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' updated voice channel ' + wS(voicechannel.id) + '.');
			}
		});
		bot.on("voiceLeave", function (voicechannel, user) {
			if (BetterDiscordLogging.events.voiceLeave) {
				if (debugging) {
					BetterDiscordLog.debug('voiceLeave', arguments);
				}
				BetterDiscordLog.log('info', 'voiceLeave', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' left voice channel ' + wS(voicechannel.id) + '.');
			}
		});
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
BetterDiscordLog.prototype.onSwitch = function () {
	if (!BetterAPI.elemExists('#bdlogbutton')) {
		$('span[style="background-image:url(\'/assets/cfb80ab4c0c135cdcb4dbcf0db124c4d.svg\');"]').parent().before('<button id="bdlogbutton" type="button"><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');color:white;"></span></button>');
		$('#bdlogbutton').click(function () {
			if (!BetterAPI.elemExists('#bdlog')) {
				BetterDiscordLog.addLogWindow();
			}
			$('#bdlog').toggle();
		});
	}
};
BetterDiscordLog.prototype.getSettingsPanel = function() {
	var self = this;
	var settings = $('<div class="form" style="max-width:100%;"></div>');
	settings.append('<h1 style="font-weight: bold">Commands database:</h1>');

	var rowHtml = "";
	rowHtml += '<div class="control-group BetterDiscordLog-inputgroup">';
	rowHtml += '	<input style="width: 20%;" type="text" name="name" placeholder="Command">';
	rowHtml += '	<input style="width: 70%;" type="text" name="data" placeholder="Response">';
	rowHtml += '</div><br>';

	for (var key in BetterDiscordLog.botcommands) {
		if (!BetterDiscordLog.botcommands.hasOwnProperty(key)) continue;
		var row = $(rowHtml);
		row.find('input[name="name"]').val(key);
		row.find('input[name="data"]').val(BetterDiscordLog.botcommands[key]);
		settings.append(row);
	}

	settings.append(rowHtml);

	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
		.click(function() {
			$(this).before(rowHtml);
		});

	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
		.click(function() {
			BetterDiscordLog.botcommands = {};
			settings.find('.BetterDiscordLog-inputgroup').each(function(i, el) {
				var $e = $(el);
				var key = $e.find('input[name="name"]').val();
				var data = $e.find('input[name="data"]').val();
				if (key.trim() === "" || data.trim() === "") return;
				BetterDiscordLog.botcommands[key] = data;
			});

			self.saveDatabase();

			var $b = $(this).text('Saved!');
			setTimeout(function() {$b.text('Save');}, 1000);
		});

	settings.append(addButton);
	settings.append(saveButton);
	return settings;
};
BetterDiscordLog.prototype.saveDatabase = function() {
	window.localStorage.botcommands = btoa(JSON.stringify(BetterDiscordLog.botcommands));
};

BetterDiscordLog.prototype.loadDatabase = function() {
	if (window.localStorage.hasOwnProperty("botcommands")) {
		var data = window.localStorage.botcommands;
		BetterDiscordLog.botcommands = JSON.parse(atob(data));
	} else {
		BetterDiscordLog.botcommands = BotCommands;
	}
};
BetterDiscordLog.log = function (level, event, server, channel, msg) {
	var time = moment().format("DD.MM.YY HH:mm:ss:SSS");
	if ($('.logrow').length > 499) {
		$('.logrow:first').remove();
	}
	$('.bdserverlog').append('' + '<tr class="logrow '+level.toLowerCase()+'">' + '<td class="' + level.toLowerCase() + '">' + time + '</td>' + '<td class="' + level.toLowerCase() + '">' + level.toUpperCase() + '</td>' + '<td class="' + level.toLowerCase() + '">' + event + '</td>' + '<td class="' + level.toLowerCase() + '">' + server + '</td>' + '<td class="' + level.toLowerCase() + '">' + channel + '</td>' + '<td class="' + level.toLowerCase() + '">' + msg + '</td>' + '</tr>' + '');
	if (BetterDiscordLogging.settings.autoscroll && $('#bdlog').is(":visible")) {
		$("#bdlogbody").scrollTop($("#bdlogbody")[0].scrollHeight);
	}
};
wS = function (str) {
	return '"' + str + '"';
};
wN = function (str) {
	return '\'' + str + '\'';
};
wM = function (str) {
	return '\'\'' + str + '\'\'';
};
wID = function (str) {
	return '#' + str;
};
BetterDiscordLog.addLogWindow = function () {
	$('body').append('<div class="bd-table" id="bdlog" style="' +
	'position:fixed !important;' + 'min-width:80% !important;' +
	'max-width:80% !important;' + 'min-height:0 !important;' +
	'height:80% !important;' + 'max-height:80% !important;' +
	'left:10% !important;' + 'top:10% !important;' +
	'z-index:9999999 !important;' + 'background-color: rgba(46,49,54,0.9) !important;' +
	'margin: auto;' + 'border: 1px solid #323232;' + 'box-shadow: 0 0 5px 3px rgba(30,30,30,.5);' +
	'color: #EBEBEB;' + 'display:none;">' + '<div class="bd-alert-header">' + '<span>BetterDiscord Log</span>' +
		'<span onclick="BetterDiscordLogging.settings.autoscroll = !BetterDiscordLogging.settings.autoscroll;">(Autoscroll)</span>' +
		'<span onClick="$(\'.logrow.debug\').toggle();">[DEBUG]</span>' +
		'<span onClick="$(\'.logrow.info\').toggle();">[INFO]</span>' +
		'<span onClick="$(\'.logrow.warn\').toggle();">[WARN]</span>' +
		'<span onClick="$(\'.logrow.error\').toggle();">[ERROR]</span>' +
		'<span onClick="BetterDiscordLog.log(\'debug\', \'testEvent\', \'Test Server\', \'Test Channel\', \'This is a test log message.\');">+</span>' +
		'<span onClick="$(\'.logrow\').remove();">-</span>' +
		'<div class="bd-alert-closebtn" onclick="$(this).parent().parent().hide();">×</div>' + '</div>' +
		'<div class="bd-alert-body" id="bdlogbody" style="overflow:auto;height:100%;"></div>' +
	'</div>');
	$('#bdlogbody').append('<table id="tg-yv9oF" class="bdserverlog tg" cellspacing="0" cellpadding="0" style="' + 'min-width:100% !important;' + 'max-width:100% !important;' + 'max-height:100% !important;' + 'overflow: auto;' + '">' + '<tr>' + '<th class="tg-031e">Time</th>' + '<th class="tg-031e">Level</th>' + '<th class="tg-yw4l">Event</th>' + '<th class="tg-yw4l">Server</th>' + '<th class="tg-yw4l">Channel</th>' + '<th class="tg-yw4l">Message</th>' + '</tr>' + '</table>');
};
BetterDiscordLog.debug = function (event, argu) {
	console.info('=== ' + event + ' START ===');
	for (var arg = 0; arg < argu.length; ++arg) {
		console.log(argu[arg]);
	}
	console.warn('=== ' + event + ' STOP ===');
};
BetterDiscordLog.prototype.stop = function () {
	$('#bdlog,#bdlogbutton').remove();
};
BetterDiscordLog.prototype.unload = function () {};
BetterDiscordLog.prototype.getName = function () {
	return "BetterDiscordLog";
};
BetterDiscordLog.prototype.getDescription = function () {
	return "A Discord.js log in BetterDiscord.";
};
BetterDiscordLog.prototype.getVersion = function () {
	return "1.0";
};
BetterDiscordLog.prototype.getAuthor = function () {
	return "Bluscream, Decorater";
};
BetterDiscordLog.prototype.onMessage = function () {};
try{exports.BetterDiscordLog = BetterDiscordLog;}catch(e){console.warn('Using old version, not exporting functions.');}