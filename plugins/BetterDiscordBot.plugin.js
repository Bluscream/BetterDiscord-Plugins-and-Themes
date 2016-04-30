//META{"name":"BetterDiscordBot"}*//
var BetterDiscordBot = function() {
	BotCommands = {
		'help': 'var coms = "";'+
			'for (var key in BetterDiscordBot.botcommands) {'+
				'if (!BetterDiscordBot.botcommands.hasOwnProperty(key)){continue;}'+
				'coms = coms + "`"+key+"` ";'+
			'}'+
			'bot.sendMessage(message.channel,'+
			'"**BetterDiscordBot** by @Decorater and Bluscream.\\n'+
			'\\n'+
			'Prefix: "+prefix+"\\n'+
			'Commands: "+coms, {}, function(e,m) {'+
				'lastMessage["help"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});',
		'info': 'bot.sendMessage(message.channel,'+
			'"Credits:\\n\\n`Discord` by Hammer & Chisel\\n'+
			'`Discord.js` by hydrabolt\\n'+
			'`BetterDiscord` by Jiiks\\n'+
			'`BetterDiscord+` by Bluscream", {}, function(e,m) {'+
				'lastMessage["info"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});',
		'version': 'BetterAPI.getVersions();var coms = "";'+
			'for (var key in process.versions) {'+
				'if (!process.versions.hasOwnProperty(key)){continue;}'+
				'coms = coms + key.capitalizeFirstLetter()+": "+process.versions[key]+"\\n";'+
			'}'+
			'bot.sendMessage(message.channel,'+
			'"```"+coms+"```", {}, function(e,m) {'+
				'lastMessage["version"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});',
		'ping': 'var sendMSG;'+
			'if(BetterAPI.elemExists(".voice-connection-quality-fine")){'+
				'sendMSG = ":white_check_mark: Voice connection quality is fine.";'+
			'};'+
			'if(!BetterAPI.isEmpty(sendMSG)){ bot.sendMessage(message.channel, sendMSG, {}, function(e,m) {'+
				'lastMessage["ping"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});}',
		'time': 'bot.sendMessage(message.channel, "My local time is `" + now + "`", {}, function(e,m) {'+
				'lastMessage["time"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});',
		'finger': 'bot.sendMessage(message.channel, "echo \\"Ohh, yeah i like that :3\\"", {}, function(e,m) {'+
				'lastMessage["finger"][m.channel.id] = m;'+
				'bot.deleteMessage(m, { wait: 120000 });'+
			'});',
		'uptime': 'var _data = "**Uptime**\\n\\n";var _uptime = BetterAPI.getUptime(1);'+
				'for (var key in _uptime) {'+
					'if (!_uptime.hasOwnProperty(key)){continue;}'+
						'_data = _data + "`"+key+"`: "+_uptime[key]+"\\n";'+
				'}'+
				'bot.sendMessage(message.channel, _data, {}, function(e,m) {'+
					'lastMessage["uptime"][m.channel.id] = m;'+ 
					'bot.deleteMessage(m, { wait: 120000 });'+
					// 'setTimeout(function(){ lastMessage["uptime"][m.channel.id] = 0;bot.deleteMessage(m); }, 120000); '+
			'});',
		// 'serverinfo': '',
		// 'channelinfo': '',
		// 'userinfo': '',
	};
	this.loadDatabase();
};
var debugging = false;
var lastMessage = {};
var BetterDiscordBotting = {
	settings : {
		enabled : true,
		gifavatar : true,
		debug : true
	}
};
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
BetterDiscordBot.prototype.load = function() {};
BetterDiscordBot.prototype.start = function () {
	var _require = ['Discord.JS', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_DiscordJS.plugin.js', 'bot.ready'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert(BetterDiscordBot.prototype.getName()+' - Requirement not started!',''+
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
		BetterDiscordBotting = BetterAPI.loadSettings('BetterDiscordBotting', BetterDiscordBotting);
		BetterDiscordLogging = BetterAPI.loadSettings('BetterDiscordLogging', BetterDiscordLogging);
		BetterAPI.requireCSS("https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.css", "tableCSS");
		BetterAPI.requireJS("https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.js", "tableJS");
		debugging = BetterAPI.isDebug();
		BetterDiscordBot.addLogWindow();
		$('span[style="background-image:url(\'/assets/cfb80ab4c0c135cdcb4dbcf0db124c4d.svg\');"]').parent().before('<button id="bdlogbutton" type="button"><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');color:white;"></span></button>');
		$('#bdlogbutton').click(function () {
			if (!BetterAPI.elemExists('#bdlog')) {
				BetterDiscordBot.addLogWindow();
			}
			$('#bdlog').toggle();
		});
		toggleLog = function() {
			$('#bdlog').toggle();
		};
		var ignoreCommands = false;
		var lastBotUser = 0;
		var lastBotChannel = 0;
		var lastBanned = 0;
		bot.on("message", function (message) {
			if (BetterDiscordLogging.events.message) {
				if (debugging) { BetterDiscordBot.debug('message', arguments); }
				BetterDiscordBot.log('info', 'message', '<a href="https://discordapp.com/channels/' + message.channel.server.id + '/">' + message.channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + message.channel.server.id + '/' + message.channel.id + '">#' + message.channel.name + '</a>', 'Message ' + wM(message.cleanContent) + ' got created by ' + wN(message.author.username) + '.');
			}
			if (BetterDiscordBotting.settings.enabled) {
				if(message.channel.server){
					var prefix = '<@' + BetterAPI.getOwnID() + '> ';
				}else{
					var prefix = '!';
				}
				var msg = message.content.toLowerCase();
				var _continue = false;
				if(msg.startsWith(prefix)){
					console.info(message);
					BetterAPI.loadSettings("lastMessage", lastMessage, true);
					msg = msg.split(prefix)[1];
					args = msg.split(' ');
					cmd = args.shift();
					if(message.channel.server){
						console.info('Command \''+cmd+'\' with arguments \''+args+'\' was issued by '+message.author.name+' in channel #' + message.channel.name + ' on server ' + wS(message.channel.server.name)+'.');
					}else{
						console.info('Command \''+cmd+'\' with arguments \''+args+'\' was issued by '+message.author.name+' in channel #' + message.channel.name + ' per direct message.');
					}
					for (var key in BetterDiscordBot.botcommands) {
						if(!lastMessage[key]){lastMessage[key] = {};}
						if(lastMessage[key].hasOwnProperty(message.channel.id)){
							bot.deleteMessage(lastMessage[key][message.channel.id]);
						}
						if (!BetterDiscordBot.botcommands.hasOwnProperty(key)) continue;
						var command = key.toLowerCase();
						var action = BetterDiscordBot.botcommands[key];
						if(cmd == command){
							try{
								eval(action);
								BetterAPI.saveSettings("lastMessage", lastMessage, true);
							}catch(e){
								console.error('Bot is unable to process command '+command+'\n\n.Error Message: '+e+'\n\nAction:\n\n'+action);
								Core.prototype.alert('BetterDiscordBot - Error', 'Bot is unable to process command <span style="color:orange"><b>'+command+'</b></span>.<br><br>Error Message: <span style="color:red">'+e+'</span><br><br>Action:<br><br>'+action);
							}
						}
					}
					if(message.channel.server){
						if(cmd == 'serverinfo'){
							if(!lastMessage["serverinfo"]){lastMessage["serverinfo"] = {};}
							if(lastMessage.serverinfo.hasOwnProperty(message.channel.id)){
								bot.deleteMessage(lastMessage.serverinfo[message.channel.id]);
							}
							var server = message.channel.server;
							sname = server.name;
							sid = server.id;
							sowner = '<@'+server.owner.id+'>#'+server.owner.discriminator;
							sregion = server.region.capitalizeFirstLetter();
							sroles = server.roles;
							sicon = server.icon;uc = 0;onuc = 0;offuc = 0;
							if(sicon){ aurl = 'https://cdn.discordapp.com/icons/'+sid+'/'+sicon+'.jpg'; }
							if(server.memberCount){ uc = server.memberCount; }
							if(server.members.length){ onuc = server.members.length; }
							if(server.members.length){ offuc = server.memberCount-server.members.length; }
							var _data = '**Server Information**\n\n';
							if(sname){ _data += '`Server Name`: '+sname+'\n'; }
							if(sid){ _data += '`Server ID`: '+sid+'\n'; }
							if(aurl){ _data += '`Server Avatar`: '+aurl+'\n'; }
							if(sowner){ _data += '`Server Owner`: '+sowner+'\n'; }
							if(sregion){
								if(sregion.contains('-')){
									sregion = sregion.replaceAll('-', ' ');
									sregion = sregion.toUpperCase();
								}else{ sregion = sregion.capitalizeFirstLetter(); }
								_data += '`Server Location`: '+sregion+'\n';
							}
							if(sroles){_data += '`Roles`: '+sroles.length+'\n';}
							if(uc){ _data += '`Total users`: '+uc+'\n'; }
							if(onuc && onuc != uc){ _data += '`Online users`: '+onuc+'\n'; }
							if(offuc && offuc != uc){ _data +='`Offline users`: '+offuc+'\n'; }
							if(_data != 'NaN'){
								bot.sendMessage(message.channel, _data, {}, function(e,m) {
									lastMessage["serverinfo"][m.channel.id] = m;
									BetterAPI.saveSettings("lastMessage", lastMessage, true);
									bot.deleteMessage(m, { wait: 120000 });
								});
							}
						}
						if(cmd == 'roles'){
							if(!lastMessage["serverroles"]){lastMessage["serverroles"] = {};}
							if(lastMessage.serverroles.hasOwnProperty(message.channel.id)){
								bot.deleteMessage(lastMessage.serverroles[message.channel.id]);
							}
							var sroles = message.channel.server.roles;
							var _data = '**Server Roles**\n\n';
							if(sroles){
								for (var i = 0; i < sroles.length; i++) {
									_srole = sroles[i];
									if(_srole.name == "@everyone"){continue;}
									_data += '#'+_srole.position+': Name: `' + _srole.name+'` ID: '+sroles[i].id;
									if(_srole.color != 0)_data += ' Color: #'+_srole.color;
									_data += ' Permissions: '+_srole.permissions+'\n';
								}
							}
							if(_data != 'NaN'){
								bot.sendMessage(message.channel, _data, {}, function(e,m) {
									lastMessage["serverroles"][m.channel.id] = m;
									BetterAPI.saveSettings("lastMessage", lastMessage, true);
									bot.deleteMessage(m, { wait: 120000 });
								});
							}else{console.error('_data is empty!');}
						}
						if(cmd == 'channelinfo'){
							if(!lastMessage["channelinfo"]){lastMessage["channelinfo"] = {};}
							if(lastMessage.channelinfo.hasOwnProperty(message.channel.id)){
								bot.deleteMessage(lastMessage.channelinfo[message.channel.id]);
							}
							var channel = message.channel;
							var _data = '**Channel Information**\n\n';
							if(channel.id){
								_data += '`Channel Name`: <#'+channel.id+'>\n';
								_data += '`Channel ID`: '+channel.id+'\n';
							}
							if(_data != 'NaN'){
								bot.sendMessage(message.channel, _data, {}, function(e,m) {
									lastMessage["channelinfo"][m.channel.id] = m;
									BetterAPI.saveSettings("lastMessage", lastMessage, true);
									bot.deleteMessage(m, { wait: 120000 });
								});
							}
						}
					}
					if(cmd == 'userinfo'){
						if(!lastMessage["userinfo"]){lastMessage["userinfo"] = {};}
						if(lastMessage.userinfo.hasOwnProperty(message.channel.id)){
							bot.deleteMessage(lastMessage.userinfo[message.channel.id]);
						}
						var user;
						if(args.length < 1){
							var user = message.author;
						}else{
							if(message.channel.server){
								var user = message.mentions[1];
							}else{
								var user = message.mentions[0];
							}
						}
						if(user.bot){var _data = '**Bot Information**\n\n';
						}else{var _data = '**User Information**\n\n';}
						if(user.id){_data += '`User Name`: <@'+user.id+'>\n';}
						if(user.discriminator){_data += '`User Discriminator`: #'+user.discriminator+'\n';}
						if(user.id){_data += '`User ID`: '+user.id+'\n';
							if(user.avatar){
								_data += '`User Avatar ID`: '+user.avatar+'\n';
								_data += '`User Avatar`: https://cdn.discordapp.com/avatars/'+user.id+'/'+user.avatar+'.jpg\n';
							}
						}
						if(user.game){if(user.game.name){_data += '`Playing`: '+user.game.name+'\n';}}
						if(_data != 'NaN'){
							bot.sendMessage(message.channel, _data, {}, function(e,m) {
								lastMessage["userinfo"][m.channel.id] = m;
									BetterAPI.saveSettings("lastMessage", lastMessage, true);
								bot.deleteMessage(m, { wait: 120000 });
							});
						}
					}
				}
				if(BetterAPI.getOwnID() == 97138137679028224){
					if (BetterDiscordBotting.settings.gifavatar) {
						try{var sn = false;
						if (msg.indexOf('Uploading GIF avatars was a bug that is fixed since dec 2015. That means you can not set them anymore.') !== -1) { return; }
						if (msg.indexOf('avatar') !== -1 && msg.indexOf('gif') !== -1) { sn = true; }
						if (msg.indexOf('avatar') !== -1 && msg.indexOf('animated') !== -1) { sn = true; }
						if (msg.indexOf('profile') !== -1 && msg.indexOf('pic') !== -1&& msg.indexOf('animated') !== -1) { sn = true; }
						if (msg.indexOf('profile') !== -1 && msg.indexOf('pic') !== -1&& msg.indexOf('gif') !== -1) { sn = true; }
						if (sn && lastBotUser != message.author.id && lastBotChannel != message.channel.id) {
							try{bot.sendMessage(message.channel, '<@' + message.author.id + '> Uploading GIF avatars was a bug that is fixed since dec 2015. That means you can not set them anymore.');}catch(e){}
							try{BetterAPI.sendImage('NoGIFAvatar.GIF', 'data:image/png;base64,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', message.channel.id);}catch(e){}
							lastBotUser = message.author.id;lastBotChannel = message.channel.id;
						}}catch(e){};
					}
					try{if(message.channel.server.id == 130873964397461504){
						msg = message.content.toLowerCase();
						if(msg == ".iam gay"){ 
							bot.sendMessage(message.channel, '<@' + message.author.id + '> Yes you are');
						}
					}}catch(e){};
					try{if(message.channel.id == 170645365845000192){
						msg = message.content.toLowerCase();
						if(!msg.startsWith('[!e]') && !msg.startsWith('[!o]')){
							bot.deleteMessage(message);
						}
					}}catch(e){};
					try{if(message.author.id == 125238980722688000 || message.author.id == 170903342199865344){
						bot.deleteMessage(message, { wait: 60000 });
					}}catch(e){};
				}
			}
			});
			bot.on("ready", function (data) {
				if (BetterDiscordLogging.events.ready) {
					if (debugging) {
						BetterDiscordBot.debug('ready', arguments);
					}
					BetterDiscordBot.log('info', 'ready', '', '', 'Client is ready.');
					console.log("BetterDiscordBot: Client connected.");
				}
			});
			bot.on("disconnected", function (data) {
				if (BetterDiscordLogging.events.disconnected) {
					if (debugging) {
						BetterDiscordBot.debug('disconnected', arguments);
					}
					BetterDiscordBot.log('info', 'disconnected', '', '', 'Client got disconnected.');
					console.log("BetterDiscordBot: Client disconnected. Auto reconnecting...");
					var _int = setInterval(function(){
						bot.loginWithToken(localStorage.token.match(/\"(.+)\"/)[1]).then(clearInterval(_int)).catch (err);
					}, 5000);
					
				}
			});
			bot.on("raw", function (data) {
				if (BetterDiscordLogging.events.raw) {
					if (debugging) {
						BetterDiscordBot.debug('raw', arguments);
					}
					BetterDiscordBot.log('info', 'raw', '', '', 'Got raw data.');
				}
			});
			bot.on("debug", function () {
				if (BetterDiscordLogging.events.debug) {
					if (debugging) {
						BetterDiscordBot.debug('debug', arguments);
					}
					BetterDiscordBot.log('debug', 'debug', '', '', arguments[0].capitalizeFirstLetter());
				}
			});
			bot.on("warn", function () {
				if (BetterDiscordLogging.events.warn) {
					if (debugging) {
						BetterDiscordBot.debug('warn', arguments);
					}
					BetterDiscordBot.log('warn', 'warn', '', '', arguments[0].capitalizeFirstLetter());
				}
			});
			bot.on("error", function (data) {
				if (BetterDiscordLogging.events.error) {
					if (debugging) {
						BetterDiscordBot.debug('error', arguments);
					}
					BetterDiscordBot.log('error', 'error', '', '', arguments[0].capitalizeFirstLetter());
				}
			});
			bot.on("presence", function (olduser, newuser) {
				if (BetterDiscordLogging.events.presence) {
					if (debugging) {
						BetterDiscordBot.debug('presence', arguments);
					}
					BetterDiscordBot.log('info', 'presence', '', '', wN(olduser.username) + ' changed presence.');
				}
			});
			bot.on("messageUpdated", function (oldmessage, message) {
				if (BetterDiscordLogging.events.messageUpdated) {
					if (debugging) {
						BetterDiscordBot.debug('messageUpdated', arguments);
					}
					BetterDiscordBot.log('info', 'messageUpdated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', 'Message ' + wID(oldmessage.id) + ' got edited by ' + wN(oldmessage.author.username) + '.');
				}
			});
			bot.on("messageDeleted", function (message, channel) {
				if (BetterDiscordLogging.events.messageDeleted) {
					if (debugging) {
						BetterDiscordBot.debug('messageDeleted', arguments);
					}
					try {
						BetterDiscordBot.log('info', 'messageDeleted', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', 'Message ' + wM(message.cleanContent) + ' by ' + wN(message.author.username) + ' got deleted' + '.');
					} catch (e) {}
				}
			});
			bot.on("serverCreated", function (server) {
				if (BetterDiscordLogging.events.serverCreated) {
					if (debugging) {
						BetterDiscordBot.debug('serverCreated', arguments);
					}
					BetterDiscordBot.log('info', 'serverCreated', '', '', 'Server ' + wS(server.name) + ' was created' + '.');
				}
			});
			bot.on("serverUpdated", function (oldserver, server) {
				if (BetterDiscordLogging.events.serverUpdated) {
					if (debugging) {
						BetterDiscordBot.debug('serverUpdated', arguments);
					}
					BetterDiscordBot.log('info', 'serverUpdated', '', '', 'Server ' + wS(server.name) + ' was edited' + '.');
				}
			});
			bot.on("serverDeleted", function (server) {
				if (BetterDiscordLogging.events.serverDeleted) {
					if (debugging) {
						BetterDiscordBot.debug('serverDeleted', arguments);
					}
					BetterDiscordBot.log('info', 'serverDeleted', '', '', 'Server ' + wS(server.name) + ' was deleted' + '.');
				}
			});
			bot.on("channelCreated", function (channel) {
				if (BetterDiscordLogging.events.channelCreated) {
					if (debugging) {
						BetterDiscordBot.debug('channelCreated', arguments);
					}
					try {
						BetterDiscordBot.log('info', 'channelCreated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel <a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a> was created' + '.');
					} catch (e) {}
				}
			});
			bot.on("channelUpdated", function (oldchannel, channel) {
				if (BetterDiscordLogging.events.channelUpdated) {
					if (debugging) {
						BetterDiscordBot.debug('channelUpdated', arguments);
					}
					try {
						BetterDiscordBot.log('info', 'channelUpdated', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel ' + wN(oldchannel.name) + ' was edited to <a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>.');
					} catch (e) {}
				}
			});
			bot.on("channelDeleted", function (channel) {
				if (BetterDiscordLogging.events.channelDeleted) {
					if (debugging) {
						BetterDiscordBot.debug('channelDeleted', arguments);
					}
					try {
						BetterDiscordBot.log('info', 'channelDeleted', '<a href="https://discordapp.com/channels/' + channel.server.id + '/">' + channel.server.name + '</a>', '', 'Channel ' + wN(channel.name) + ' was deleted' + '.');
					} catch (e) {}
				}
			});
			bot.on("serverRoleCreated", function (role) {
				if (BetterDiscordLogging.events.serverRoleCreated) {
					if (debugging) {
						BetterDiscordBot.debug('serverRoleCreated', arguments);
					}
					BetterDiscordBot.log('info', 'serverRoleCreated', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role <text style="color:' + role.colorAsHex() + '">\'' + role.name + '\'</text> was created' + '.');
				}
			});
			bot.on("serverRoleUpdated", function (oldrole, role) {
				if (BetterDiscordLogging.events.serverRoleUpdated) {
					if (debugging) {
						BetterDiscordBot.debug('serverRoleUpdated', arguments);
					}
					BetterDiscordBot.log('info', 'serverRoleUpdated', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role ' + wN('<text style="color:' + oldrole.colorAsHex() + '">' + oldrole.name + '</text>') + ' was edited to ' + wN('<text style="color:' + role.colorAsHex() + '">' + role.name + '</text>') + '.');
				}
			});
			bot.on("serverRoleDeleted", function (role) {
				if (BetterDiscordLogging.events.serverRoleDeleted) {
					if (debugging) {
						BetterDiscordBot.debug('serverRoleDeleted', arguments);
					}
					BetterDiscordBot.log('info', 'serverRoleDeleted', '<a href="https://discordapp.com/channels/' + role.server.id + '">' + role.server.name + '</a>', '', 'Role <text style="color:' + role.colorAsHex() + '">\'' + role.name + '\'</text> was deleted' + '.');
				}
			});
			bot.on("serverNewMember", function (server, user) {
				if (BetterDiscordLogging.events.serverNewMember) {
					if (debugging) {
						BetterDiscordBot.debug('serverNewMember', arguments);
					}
					if (server.id == BetterAPI.getCurrentServerID()) {
						alertify.notify('<span style="color:green !important;">' + wN(user.name) + ' joined.</span>');
					}
					BetterDiscordBot.log('info', 'serverNewMember', '<a href="https://discordapp.com/channels/' + server.id + '/">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' joined' + '.');
				}
			});
			bot.on("serverMemberUpdated", function (server, user) {
				if (BetterDiscordLogging.events.serverMemberUpdated) {
					if (debugging) {
						BetterDiscordBot.debug('serverMemberUpdated', arguments);
					}
					BetterDiscordBot.log('info', 'serverMemberUpdated', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' updated' + '.');
				}
			});
			bot.on("serverMemberRemoved", function (server, user) {
				if (BetterDiscordLogging.events.serverMemberRemoved) {
					if (debugging) {
						BetterDiscordBot.debug('serverMemberRemoved', arguments);
					}
					if (server.id == BetterAPI.getCurrentServerID() && user.id != lastBanned) {
						alertify.success('<span style="color:red !important;">' + wN(user.name) + ' left or kicked.</span>');
					}else{lastBanned = 0;}
					BetterDiscordBot.log('info', 'serverMemberRemoved', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN('<a href="https://canary.discordapp.com/channels/@me/' + user.id + '">' + user.name + '</a>') + ' left or was kicked' + '.');
				}
			});
			bot.on("userTypingStarted", function (user, channel) {
				if (BetterDiscordLogging.events.userTypingStarted) {
					if (debugging) {
						BetterDiscordBot.debug('userTypingStarted', arguments);
					}
					BetterDiscordBot.log('info', 'userTypingStarted', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', wN(user.name) + ' started typing in ' + wS(channel.name) + '.');
				}
			});
			bot.on("userTypingStopped", function (user, channel) {
				if (BetterDiscordLogging.events.userTypingStopped) {
					if (debugging) {
						BetterDiscordBot.debug('userTypingStopped', arguments);
					}
					BetterDiscordBot.log('info', 'userTypingStopped', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '<a href="https://discordapp.com/channels/' + channel.server.id + '/' + channel.id + '">#' + channel.name + '</a>', wN(user.name) + ' stopped typing in ' + wS(channel.name) + '.');
				}
			});
			bot.on("userUnbanned", function (user, server) {
				if (BetterDiscordLogging.events.userUnbanned) {
					if (debugging) {
						BetterDiscordBot.debug('userUnbanned', arguments);
					}
					if (server.id == BetterAPI.getCurrentServerID()) {
						alertify.success(wN(user.name) + ' was unbanned.');
					}
					BetterDiscordBot.log('info', 'userUnbanned', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN(user.name) + ' was unbanned' + '.');
				}
			});
			bot.on("userBanned", function (user, server) {
				if (BetterDiscordLogging.events.userBanned) {
					if (debugging) {
						BetterDiscordBot.debug('userBanned', arguments);
					}
					if (server.id == BetterAPI.getCurrentServerID()) {
						lastBanned = user.id;
						alertify.error(wN(user.name) + ' was banned.');
					}
					BetterDiscordBot.log('info', 'userBanned', '<a href="https://discordapp.com/channels/' + server.id + '">' + server.name + '</a>', '', wN(user.name) + ' was banned' + '.');
				}
			});
			bot.on("voiceJoin", function (voicechannel, user) {
				if (BetterDiscordLogging.events.voiceJoin) {
					if (debugging) {
						BetterDiscordBot.debug('voiceJoin', arguments);
					}
					BetterDiscordBot.log('info', 'voiceJoin', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' joined voice channel ' + wS(voicechannel.id) + '.');
				}
			});
			bot.on("voiceStateUpdate", function (voicechannel, user) {
				if (BetterDiscordLogging.events.voiceStateUpdate) {
					if (debugging) {
						BetterDiscordBot.debug('voiceStateUpdate', arguments);
					}
					BetterDiscordBot.log('info', 'voiceStateUpdate', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' updated voice channel ' + wS(voicechannel.id) + '.');
				}
			});
			bot.on("voiceLeave", function (voicechannel, user) {
				if (BetterDiscordLogging.events.voiceLeave) {
					if (debugging) {
						BetterDiscordBot.debug('voiceLeave', arguments);
					}
					BetterDiscordBot.log('info', 'voiceLeave', '<a href="https://discordapp.com/channels/' + voicechannel.server.id + '">' + voicechannel.server.name + '</a>', voicechannel.name, wN(user.name) + ' left voice channel ' + wS(voicechannel.id) + '.');
				}
			});
			function err2(error) {
				if (error) {
					console.log(error);
					return;
				}
			}
			function success(token) {}
			function err(error) {
				if (error) {
					console.log('Problem occurred while logging in! ' + error);
					return;
				}
			}
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
BetterDiscordBot.prototype.onSwitch = function () {
	if (!BetterAPI.elemExists('#bdlogbutton')) {
		$('span[style="background-image:url(\'/assets/cfb80ab4c0c135cdcb4dbcf0db124c4d.svg\');"]').parent().before('<button id="bdlogbutton" type="button"><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');color:white;"></span></button>');
		$('#bdlogbutton').click(function () {
			if (!BetterAPI.elemExists('#bdlog')) {
				BetterDiscordBot.addLogWindow();
			}
			$('#bdlog').toggle();
		});
	}
};
BetterDiscordBot.prototype.getSettingsPanel = function() {
	var self = this;
	var settings = $('<div class="form" style="max-width:100%;"></div>');
	settings.append('<h1 style="font-weight: bold">Commands database:</h1>');

	var rowHtml = "";
	rowHtml += '<div class="control-group BetterDiscordBot-inputgroup">';
	rowHtml += '	<input style="width: 20%;" type="text" name="name" placeholder="Command">';
	rowHtml += '	<input style="width: 70%;" type="text" name="data" placeholder="Response">';
	rowHtml += '</div><br>';

	for (var key in BetterDiscordBot.botcommands) {
		if (!BetterDiscordBot.botcommands.hasOwnProperty(key)) continue;
		var row = $(rowHtml);
		row.find('input[name="name"]').val(key);
		row.find('input[name="data"]').val(BetterDiscordBot.botcommands[key]);
		settings.append(row);
	}

	settings.append(rowHtml);

	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
		.click(function() {
			$(this).before(rowHtml);
		});

	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
		.click(function() {
			BetterDiscordBot.botcommands = {};
			settings.find('.BetterDiscordBot-inputgroup').each(function(i, el) {
				var $e = $(el);
				var key = $e.find('input[name="name"]').val();
				var data = $e.find('input[name="data"]').val();
				if (key.trim() === "" || data.trim() === "") return;
				BetterDiscordBot.botcommands[key] = data;
			});

			self.saveDatabase();

			var $b = $(this).text('Saved!');
			setTimeout(function() {$b.text('Save');}, 1000);
		});

	settings.append(addButton);
	settings.append(saveButton);
	return settings;
};
BetterDiscordBot.prototype.saveDatabase = function() {
	window.localStorage.botcommands = btoa(JSON.stringify(BetterDiscordBot.botcommands));
};

BetterDiscordBot.prototype.loadDatabase = function() {
	if (window.localStorage.hasOwnProperty("botcommands")) {
		var data = window.localStorage.botcommands;
		BetterDiscordBot.botcommands = JSON.parse(atob(data));
	} else {
		BetterDiscordBot.botcommands = BotCommands;
	}
};
BetterDiscordBot.log = function (level, event, server, channel, msg) {
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
BetterDiscordBot.addLogWindow = function () {
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
		'<span onClick="BetterDiscordBot.log(\'debug\', \'testEvent\', \'Test Server\', \'Test Channel\', \'This is a test log message.\');">+</span>' +
		'<span onClick="$(\'.logrow\').remove();">-</span>' +
		'<div class="bd-alert-closebtn" onclick="$(this).parent().parent().hide();">×</div>' + '</div>' +
		'<div class="bd-alert-body" id="bdlogbody" style="overflow:auto;height:100%;"></div>' +
	'</div>');
	$('#bdlogbody').append('<table id="tg-yv9oF" class="bdserverlog tg" cellspacing="0" cellpadding="0" style="' + 'min-width:100% !important;' + 'max-width:100% !important;' + 'max-height:100% !important;' + 'overflow: auto;' + '">' + '<tr>' + '<th class="tg-031e">Time</th>' + '<th class="tg-031e">Level</th>' + '<th class="tg-yw4l">Event</th>' + '<th class="tg-yw4l">Server</th>' + '<th class="tg-yw4l">Channel</th>' + '<th class="tg-yw4l">Message</th>' + '</tr>' + '</table>');
};
BetterDiscordBot.debug = function (event, argu) {
	console.info('=== ' + event + ' START ===');
	for (var arg = 0; arg < argu.length; ++arg) {
		console.log(argu[arg]);
	}
	console.warn('=== ' + event + ' STOP ===');
};
BetterDiscordBot.prototype.stop = function () {
	var ignoreCommands = true;
	console.log("Bot Plugin Stopped.");
};
BetterDiscordBot.prototype.unload = function () {
	var ignoreCommands = true;
	console.log("Plugin Unloaded for Bot. Not logging out but ignoring the commands.");
};
BetterDiscordBot.prototype.update = function () {
	console.log("A Fake thing here this plugin does not update for others.");
};
BetterDiscordBot.prototype.getName = function () {
	return "BetterDiscordBot";
};
BetterDiscordBot.prototype.getDescription = function () {
	return "A Discord.js bot in BetterDiscord.";
};
BetterDiscordBot.prototype.getVersion = function () {
	return "1.0";
};
BetterDiscordBot.prototype.getAuthor = function () {
	return "Bluscream, Decorater";
};
BetterDiscordBot.prototype.onMessage = function () {};
try{exports.BetterDiscordBot = BetterDiscordBot;}catch(e){console.warn('Using old version, not exporting functions.');}
try{exports.BetterDiscordBot.bot = bot;}catch(e){console.warn('Using old version, not exporting functions.');}