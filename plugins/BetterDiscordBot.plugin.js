//META{"name":"BetterDiscordBot"}*//
function BetterDiscordBot() {}
var saveDir = __dirname.slice(0, __dirname.indexOf("\\", __dirname.lastIndexOf('Discord') + "Discord".length + 1) + 1) + "resources"
var debugging = false;
var bot = true;
var BetterDiscordBotting = {
	settings : {
		enabled : true
	}
}
var BetterDiscordLogging = {
	settings : {
		enabled : true,
		autoscroll : true
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
}
function npm(name,callback) {
	require("child_process").exec("npm install --save " + name, {
		cwd : saveDir
	}, function (e, f, g) {
		console.log(e, f, g);
		callback()
	})
};
BetterDiscordBot.prototype.loadlib = function(name) {}
BetterDiscordBot.prototype.load = function() {
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.css" type="text/css">');
	$("head").append('<script src="https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.js"></script>');
	BetterDiscordBotting = BetterAPI.loadSettings('BetterDiscordBotting', BetterDiscordBotting);
	BetterDiscordLogging = BetterAPI.loadSettings('BetterDiscordLogging', BetterDiscordLogging);
}
BetterDiscordBot.prototype.unload = function() {
	var ignoreCommands = true;
	console.log("Plugin Unloaded for Bot. Not logging out but ignoring the commands.");
};
BetterDiscordBot.prototype.onSwitch = function() {
	if(!BetterAPI.elemExists('#bdlogbutton')){
		$('span[data-reactid=".0.1.1.0.2.0.4.0:0.0"]').parent().before('<button id="bdlogbutton" type="button" onclick="$(\'#bdlog\').toggle();" ><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');"></span></button>');
	}
};
var bot;
BetterDiscordBot.prototype.start = function() {
	debugging = BetterAPI.isDebug();
	BetterDiscordBot.addLogWindow();
	$('span[data-reactid=".0.1.1.0.2.0.4.0:0.0"]').parent().before('<button id="bdlogbutton" type="button">\
	<span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');color:white;"></span></button>');
	$('#bdlogbutton').click(function(){
		if(!BetterAPI.elemExists('#bdlog')){BetterDiscordBot.addLogWindow();}
		$('#bdlog').toggle();
	});
	npm('discord.js',function(){
		var Discord = require(saveDir + '\\node_modules\\discord.js');
		bot = new Discord.Client();
		console.log("BetterDiscordBot: Plugin Loaded for Bot. Starting Bot.");
		bot.loginWithToken(localStorage.token.match(/\"(.+)\"/)[1]).then(success).catch(err);
		console.log("BetterDiscordBot: Logged in.");
		var ignoreCommands = false;
		if(!channel){
			var channel = ''+BetterAPI.getCurrentTextChannelID();
		}
/* ==================================================================================================================================================================*/
		bot.on("ready", function(data){
			if(BetterDiscordLogging.events.ready){if(debugging){BetterDiscordBot.debug('ready', arguments);}
				BetterDiscordBot.log('info', 'ready', '', 'Client is ready.');
			}
		});
		bot.on("disconnected", function(data){
			if(BetterDiscordLogging.events.disconnected){if(debugging){BetterDiscordBot.debug('disconnected', arguments);}
				BetterDiscordBot.log('info', 'disconnected', '', 'Client got disconnected.');
			}
		});
		
		bot.on("raw", function(data){
			if(BetterDiscordLogging.events.raw){if(debugging){BetterDiscordBot.debug('raw', arguments);}
				BetterDiscordBot.log('info', 'raw', '', 'Got raw data.');
			}
		});
		
		bot.on("debug", function(){
			if(BetterDiscordLogging.events.debug){if(debugging){BetterDiscordBot.debug('debug', arguments);}
				BetterDiscordBot.log('debug', 'debug', '', arguments[0].capitalizeFirstLetter());
			}
		});
		bot.on("warn", function(){
			if(BetterDiscordLogging.events.warn){if(debugging){BetterDiscordBot.debug('warn', arguments);}
				BetterDiscordBot.log('warn', 'warn', '', arguments[0].capitalizeFirstLetter());
			}
		});
		bot.on("error", function(data){
			if(BetterDiscordLogging.events.error){if(debugging){BetterDiscordBot.debug('error', arguments);}
				BetterDiscordBot.log('error', 'error', '', arguments[0].capitalizeFirstLetter());
			}
		});
		
		bot.on("presence", function(olduser, newuser){
			if(BetterDiscordLogging.events.presence){if(debugging){BetterDiscordBot.debug('presence', arguments);}
				BetterDiscordBot.log('info', 'presence', '', wN(olduser.username)+' changed presence.');
			}
		});
		
		bot.on("message", function(message){
			if (ignoreCommands === false) {
				var msg = message.content; msg = msg.toLowerCase(); var prefix = '<@'+BetterAPI.getOwnID()+'> ';
				switch(msg) {
				 case prefix+'help':
					bot.sendMessage(channel, '**BetterDiscordBot** by @Decorater and Bluscream.\n\nPrefix: '+prefix+'\nCommands:`info`,`time`');break;
				 case prefix+'info':
					bot.sendMessage(channel, "Credits:\n\n`Discord` by Hammer & Chisel\n`Discord.js` by hydrabolt\n`BetterDiscord` by Jiiks\n`BetterDiscord+` by Bluscream");break;
				 case prefix+'version':
					bot.sendMessage(channel, "Discord `0.0.287` **|** BetterDiscord `0.2.7` (JS `1.61`) **|** Discord.js `"+require("discord.js/package").version+"` **|** BetterDiscordBot `"+BetterDiscordBot.prototype.getVersion()+"`");break;
				 case prefix+'ping':
					if(BetterAPI.elemExists('.voice-connection-quality-fine'))
						bot.sendMessage(channel, "Voice connection quality is fine.");
					break;
				 case prefix+'time':
					var now = new Date();bot.sendMessage(channel, 'My local time is `'+now+'`');break;
				 case prefix+'finger':
					bot.sendMessage(channel, 'echo "Ohh, yeah i like that :3"');break;
				 default:
					 break;
				}
			}
			if(BetterDiscordLogging.events.message){if(debugging){BetterDiscordBot.debug('message', arguments);}
				BetterDiscordBot.log('info', 'message', '', 'Message '+wM(message.cleanContent)+' '+wID(message.id)+' got created by '+wN(message.author.username)+'.');
			}
		});
		bot.on("messageUpdated", function(oldmessage, message){
			if(BetterDiscordLogging.events.messageUpdated){if(debugging){BetterDiscordBot.debug('messageUpdated', arguments);}
				BetterDiscordBot.log('info', 'messageUpdated', '', 'Message '+wID(oldmessage.id)+' got edited by '+wN(oldmessage.author.username)+'.');
			}
		});
		bot.on("messageDeleted", function(message, channel){
			if(BetterDiscordLogging.events.messageDeleted){if(debugging){BetterDiscordBot.debug('messageDeleted', arguments);}
				try{BetterDiscordBot.log('info', 'messageDeleted', '', 'Message '+wM(message.cleanContent)+' by '+wN(message.author.username)+' got deleted'+'.');
				}catch(e){}
			}
		});
		
		bot.on("serverCreated", function(server){
			if(BetterDiscordLogging.events.serverCreated){if(debugging){BetterDiscordBot.debug('serverCreated', arguments);}
				BetterDiscordBot.log('info', 'serverCreated', '', 'Server '+wS(server.name)+' was created'+'.');
			}
		});
		bot.on("serverUpdated", function(oldserver, server){
			if(BetterDiscordLogging.events.serverUpdated){if(debugging){BetterDiscordBot.debug('serverUpdated', arguments);}
				BetterDiscordBot.log('info', 'serverUpdated', '', 'Server '+wS(server.name)+' was edited'+'.');
			}
		});
		bot.on("serverDeleted", function(server){
			if(BetterDiscordLogging.events.serverDeleted){if(debugging){BetterDiscordBot.debug('serverDeleted', arguments);}
				BetterDiscordBot.log('info', 'serverDeleted', '', 'Server '+wS(server.name)+' was deleted'+'.');
			}
		});
		
		bot.on("channelCreated", function(channel){
			if(BetterDiscordLogging.events.channelCreated){if(debugging){BetterDiscordBot.debug('channelCreated', arguments);}
				BetterDiscordBot.log('info', 'channelCreated', '', 'Channel '+wID(channel.id)+' was created'+'.');
			}
		});
		bot.on("channelUpdated", function(oldchannel, channel){
			if(BetterDiscordLogging.events.channelUpdated){if(debugging){BetterDiscordBot.debug('channelUpdated', arguments);}
				BetterDiscordBot.log('info', 'channelUpdated', '', 'Channel '+wID(oldchannel.id)+' was edited'+'.');
			}
		});
		bot.on("channelDeleted", function(channel){
			if(BetterDiscordLogging.events.channelDeleted){if(debugging){BetterDiscordBot.debug('channelDeleted', arguments);}
				BetterDiscordBot.log('info', 'channelDeleted', '', 'Channel '+wID(channel.id)+' was deleted'+'.');
			}
		});
		
		bot.on("serverRoleCreated", function(role){
			if(BetterDiscordLogging.events.serverRoleCreated){if(debugging){BetterDiscordBot.debug('serverRoleCreated', arguments);}
				BetterDiscordBot.log('info', 'serverRoleCreated', role.server.name, 'Role <text style="color:'+role.colorAsHex()+'">\''+role.name+'\'</text> was created'+'.');
			}
		});
		bot.on("serverRoleUpdated", function(oldrole, role){
			if(BetterDiscordLogging.events.serverRoleUpdated){if(debugging){BetterDiscordBot.debug('serverRoleUpdated', arguments);}
				BetterDiscordBot.log('info', 'serverRoleUpdated', role.server.name, 'Role '+wN('<text style="color:'+oldrole.colorAsHex()+'">'+oldrole.name+'</text>')+' was edited to '+wN('<text style="color:'+role.colorAsHex()+'">'+role.name+'</text>')+'.');
			}
		});
		bot.on("serverRoleDeleted", function(role){
			if(BetterDiscordLogging.events.serverRoleDeleted){if(debugging){BetterDiscordBot.debug('serverRoleDeleted', arguments);}
				BetterDiscordBot.log('info', 'serverRoleDeleted', role.server.name, 'Role <text style="color:'+role.colorAsHex()+'">\''+role.name+'\'</text> was deleted'+'.');
			}
		});
		
		bot.on("serverNewMember", function(server, user){
			if(BetterDiscordLogging.events.serverNewMember){if(debugging){BetterDiscordBot.debug('serverNewMember', arguments);}
				if(server.id == BetterAPI.getCurrentServerID()){ alertify.notify('<span style="color:green !important;">'+wN(user.name)+' joined</span>'); }
				BetterDiscordBot.log('info', 'serverNewMember', server.name, wN(user.name)+' joined'+'.');
			}
		});
		bot.on("serverMemberUpdated", function(server, user){
			if(BetterDiscordLogging.events.serverMemberUpdated){if(debugging){BetterDiscordBot.debug('serverMemberUpdated', arguments);}
				BetterDiscordBot.act(1, "serverMemberUpdated", "info",wN(user.name)+' updated',server.id, server.name );
				BetterDiscordBot.log('info', 'serverMemberUpdated', server.name, wN(user.name)+' updated'+'.');
			}
		});
		bot.on("serverMemberRemoved", function(server, user){
			if(BetterDiscordLogging.events.serverMemberRemoved){if(debugging){BetterDiscordBot.debug('serverMemberRemoved', arguments);}
				if(server.id == BetterAPI.getCurrentServerID() && user.id != lastBanned){ alertify.success('<span style="color:red !important;">'+wN(user.name)+' left</span>'); }
				BetterDiscordBot.log('info', 'serverMemberRemoved', server.name, wN(user.name)+' left'+'.');
			}
		});
		
		bot.on("userTypingStarted", function(user, channel){
			if(BetterDiscordLogging.events.userTypingStarted){if(debugging){BetterDiscordBot.debug('userTypingStarted', arguments);}
				BetterDiscordBot.log('info', 'userTypingStarted', '', wN(user.name)+' started typing in '+wS(channel.id)+'.');
			}
		});
		bot.on("userTypingStopped", function(user, channel){
			if(BetterDiscordLogging.events.userTypingStopped){if(debugging){BetterDiscordBot.debug('userTypingStopped', arguments);}
				BetterDiscordBot.log('info', 'userTypingStopped', '', wN(user.name)+' stopped typing in '+wS(channel.id)+'.');
			}
		});
		
		bot.on("userUnbanned", function(user, server){
			if(BetterDiscordLogging.events.userUnbanned){if(debugging){BetterDiscordBot.debug('userUnbanned', arguments);}
				if(server.id == BetterAPI.getCurrentServerID()){ alertify.success(wN(user.name)+' was unbanned'); }
				BetterDiscordBot.log('info', 'userUnbanned', server.name, wN(user.name)+' was unbanned'+'.');
			}
		});
		bot.on("userBanned", function(user, server){
			if(BetterDiscordLogging.events.userBanned){if(debugging){BetterDiscordBot.debug('userBanned', arguments);}
				if(server.id == BetterAPI.getCurrentServerID()){ lastBanned = user.id;alertify.error(wN(user.name)+' was banned'); }
				BetterDiscordBot.log('info', 'userBanned', server.name, wN(user.name)+' was unbanned'+'.');
			}
		});
		
		bot.on("voiceJoin", function(voicechannel, user){
			if(BetterDiscordLogging.events.voiceJoin){if(debugging){BetterDiscordBot.debug('voiceJoin', arguments);}
				BetterDiscordBot.log('info', 'voiceJoin', '', wN(user.name)+' joined voice channel '+wS(voicechannel.id)+'.');
			}
		});
		bot.on("voiceStateUpdate", function(voicechannel, user){
			if(BetterDiscordLogging.events.voiceStateUpdate){if(debugging){BetterDiscordBot.debug('voiceStateUpdate', arguments);}
				BetterDiscordBot.log('info', 'voiceStateUpdate', '', wN(user.name)+' updated voice channel '+wS(voicechannel.id)+'.');
			}
		});
		bot.on("voiceLeave", function(voicechannel, user){
			if(BetterDiscordLogging.events.voiceLeave){if(debugging){BetterDiscordBot.debug('voiceLeave', arguments);}
				BetterDiscordBot.log('info', 'voiceLeave', '', wN(user.name)+' left voice channel '+wS(voicechannel.id)+'.');
			}
		});
/* ==================================================================================================================================================================*/
		function err2(error){
			if (error) {
				console.log(error);
				return;
			}
		}	
		function success(token){}
		function err(error){
			if (error) {
				console.log('Problem occurred while logging in! ' + error);
				return;
			}
		}
	});
};
BetterDiscordBot.act = function(s, event, level, msg, id ,name){
	if(BetterAPI.isEmpty(s)){var s = "";}
	if(BetterAPI.isEmpty(event)){var event = "";}
	if(BetterAPI.isEmpty(level)){var level = "";}
	if(BetterAPI.isEmpty(msg)){var msg = "";}
	if(BetterAPI.isEmpty(id)){var id = "";}
	if(BetterAPI.isEmpty(name)){var name = "";}
	BetterDiscordBot.log(level, event, name, msg+'.');
}
BetterDiscordBot.log = function(level, event, server, msg){
		var time = moment().format("DD.MM.YY HH:mm:ss:SSS");
		if($('.logrow').length > 499){$('.logrow:first').remove();};
		$('.bdserverlog').append('\
			<tr class="logrow">\
				<td class="'+level.toLowerCase()+'">'+time+'</td>\
				<td class="'+level.toLowerCase()+'">'+level.toUpperCase()+'</td>\
				<td class="'+level.toLowerCase()+'">'+event+'</td>\
				<td class="'+level.toLowerCase()+'">'+server+'</td>\
				<td class="'+level.toLowerCase()+'">'+msg+'</td>\
			</tr>\
		');
		if(BetterDiscordLogging.settings.autoscroll && $('#bdlog').is(":visible")){
			$("#bdlogbody").scrollTop($("#bdlogbody")[0].scrollHeight);
		}
};
wS = function(str){	return '"'+str+'"'; }
wN = function(str){	return '\''+str+'\''; }
wM = function(str){	return '\'\''+str+'\'\''; }
wID = function(str){ return '#'+str; }
BetterDiscordBot.addLogWindow = function(){
	$('body').append('<div class="bd-table" id="bdlog" style="\
		position:fixed !important;\
		min-width:80% !important;\
		max-width:80% !important;\
		min-height:0 !important;\
		height:80% !important;\
		max-height:80% !important;\
		left:10% !important;\
		top:10% !important;\
		z-index:9999999 !important;\
		background-color: rgba(46,49,54,0.9) !important;\
		margin: auto;\
		border: 1px solid #323232;\
		box-shadow: 0 0 5px 3px rgba(30,30,30,.5);\
		color: #EBEBEB;\
		display:none;">\
		<div class="bd-alert-header">\
			<span>BetterDiscord Log</span>\
			<span onclick="BetterDiscordLogging.settings.autoscroll = !BetterDiscordLogging.settings.autoscroll;">(Autoscroll)</span>\
			<span onClick="BetterDiscordBot.log(\'debug\', \'testEvent\', \'Test Server\', \'This is a test log message.\');">[Test]</span>\
			<div class="bd-alert-closebtn" onclick="$(this).parent().parent().hide();">×</div>\
		</div>\
		<div class="bd-alert-body" id="bdlogbody" style="overflow:auto;height:100%;"></div>\
	</div>');
	$('#bdlogbody').append('<table id="tg-yv9oF" class="bdserverlog tg" cellspacing="0" cellpadding="0" style="\
		min-width:100% !important;\
		max-width:100% !important;\
		max-height:100% !important;\
		overflow: auto;\
	">\
		<tr>\
			<th class="tg-031e">Time</th>\
			<th class="tg-031e">Level</th>\
			<th class="tg-yw4l">Event</th>\
			<th class="tg-yw4l">Server</th>\
			<th class="tg-yw4l">Message</th>\
		</tr>\
</table>');
}
BetterDiscordBot.debug = function(event, argu){
	console.info('=== '+event+' START ===');
	for(var arg = 0; arg < argu.length; ++ arg){
		// var arr = arguments[arg];

		// for(var i = 0; i < arr.length; ++ i)
		// {
			 // var element = arr[i];

			 // /* ... */
		// } 
		console.log(argu[arg]);
	}
	console.warn('=== '+event+' STOP ===');
}
BetterDiscordBot.prototype.stop = function() {
	var ignoreCommands = true;
	console.log("Bot Plugin Stopped.");
};
BetterDiscordBot.prototype.update = function() {
	console.log("A Fake thing here this plugin does not update for others.");
};
BetterDiscordBot.prototype.getName = function() {
	return "BetterDiscordBot";
};
BetterDiscordBot.prototype.getDescription = function() {
	return "A Discord.js bot in BetterDiscord.";
};
BetterDiscordBot.prototype.getVersion = function() {
	return "1.0";
};
BetterDiscordBot.prototype.getAuthor = function() {
	return "Bluscream, Decorater";
};