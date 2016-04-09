//META{"name":"BetterDiscordLog"}*//
function BetterDiscordLog() {}
// You need Discord.js (https://github.com/hydrabolt/discord.js/archive/master.zip) in %localappdata%\Discord\app-<VERSION>\resources\node_modules\discord.js\ folder to use this.

var saveDir = __dirname.slice(0, __dirname.indexOf("\\", __dirname.lastIndexOf('Discord') + "Discord".length + 1) + 1) + "resources"
var BetterDiscordLogging = {
	settings : {
		html : true,
		console : true,
		notification : false,
		currentServer : false
	},
	events : {
		ready : false,
		disconnected : true,
		raw : false,
		presence : false,
		debug : false,
		warn : true,
		error : true,
		message : false,
		messageUpdated : false,
		messageDeleted : false,
		serverCreated : false,
		serverUpdated : true,
		serverDeleted : false,
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
BetterDiscordLog.prototype.loadlib = function(name) {}
BetterDiscordLog.prototype.load = function() {};
BetterDiscordLog.prototype.unload = function() {
	var ignoreCommands = true;
	console.log("Plugin Unloaded for Bot. Not logging out but ignoring the commands.");
};
BetterDiscordLog.prototype.start = function() {
	npm('discord.js',function(){
		var Discord = require(saveDir + '\\node_modules\\discord.js');
		var bot = new Discord.Client();
		console.log("BetterDiscordLog: Plugin Loaded for Bot. Starting Bot.");
		bot.loginWithToken(localStorage.token.match(/\"(.+)\"/)[1]).then(success).catch(err);
		console.log("BetterDiscordLog: Logged in.");
		
		if(BetterDiscordLogging.settings.html){
			BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.css" type="text/css">');
			$("head").append('<script src="https://cdn.rawgit.com/Bluscream/BetterDiscord/master/table.js"></script>');
			$('body').append('<div class="bd-alert" id="bdlog" style="display:none;width: 800px !important;height: 910px !important;top: 50px !important;"><div class="bd-alert-header"><span>BetterDiscord</span> <span onClick="BetterDiscordLog.log(\'debug\', \'testEvent\', \'This is a test log message.\');">Log</span><div class="bd-alert-closebtn" onclick="$(this).parent().parent().hide();">×</div></div><div class="bd-alert-body" id="bdlogbody"></div></div>');
			$('#bdlogbody').append('<table id="tg-yv9oF" class="bdserverlog tg" style="min-width:100% !important;">\
				<tr>\
					<th class="tg-031e">Time</th>\
					<th class="tg-031e">Level</th>\
					<th class="tg-yw4l">Event</th>\
					<th class="tg-yw4l">Message</th>\
				</tr>\
			</table>');
			$('span[data-reactid=".0.1.1.0.2.0.4.0:0.0"]').parent().before('<button type="button" onclick="$(\'#bdlog\').toggle();" ><span style="background-image:url(\'https://cdn3.iconfinder.com/data/icons/file-format-2/512/log_.log_file_file_format_document_extension_format-128.png\');"></span></button>');
		}
		
		if(BetterDiscordLogging.events.ready){
			bot.on("ready", function(){
				BetterDiscordLog.act(0, "ready", "info", 'Client is ready');
			});
		}
		if(BetterDiscordLogging.events.disconnected){
			bot.on("disconnected", function(){
				BetterDiscordLog.act(0, "disconnected", "error", 'Client got disconnected' );
			});
		}
		
		if(BetterDiscordLogging.events.raw){
			bot.on("raw", function(data){
				BetterDiscordLog.act(0, "raw", "info", data);
			});
		}
		
		if(BetterDiscordLogging.events.presence){
			bot.on("presence", function(olduser, newuser){
				BetterDiscordLog.act(0, "presence", "info", wN(olduser.username)+' changed presence' );
				console.log(olduser);console.log(newuser);
			});
		}
		
		if(BetterDiscordLogging.events.debug){
			bot.on("debug", function(){
				BetterDiscordLog.act(0, "debug", "debug", 'Client is debugging');
			});
		}
		if(BetterDiscordLogging.events.warn){
			bot.on("warn", function(){
				BetterDiscordLog.act(0, "warn", "warn", 'Client got a warning' );
			});
		}
		if(BetterDiscordLogging.events.error){
			bot.on("error", function(data){if(debug){console.log(data);}
				BetterDiscordLog.act(0, "error", "error", data );
			});
		}
		
		if(BetterDiscordLogging.events.message){
			bot.on("message", function(message){if(debug){console.log(message);}
				BetterDiscordLog.act(0, "message", "info", 'Message '+wM(message.cleanContent)+' '+wID(message.id)+' got created by '+wN(message.author.username) );
			});
		}
		if(BetterDiscordLogging.events.messageUpdated){
			bot.on("messageUpdated", function(oldmessage, message){if(debug){console.log(message);}
				BetterDiscordLog.act(0, "messageUpdated", "warn", 'Message '+wID(oldmessage.id)+' got edited by '+wN(oldmessage.author.username) );
			});
		}
		if(BetterDiscordLogging.events.messageDeleted){
			bot.on("messageDeleted", function(message, channel){if(debug){console.log(message);}
				BetterDiscordLog.act(0, "messageDeleted", "error", 'Message '+wM(message.cleanContent)+' '+wID(message.id)+' got deleted by '+wN(channel.client.username) );
			});
		}
		
		if(BetterDiscordLogging.events.serverCreated){
			bot.on("serverCreated", function(server){
				BetterDiscordLog.act(0, "serverCreated", "info",'Server '+wS(server.name)+' was created' );
			});
		}
		if(BetterDiscordLogging.events.serverUpdated){
			bot.on("serverUpdated", function(oldserver, server){
				BetterDiscordLog.act(0, "serverUpdated", "warn",'Server '+wS(server.name)+' was edited' );
			});
		}
		if(BetterDiscordLogging.events.serverDeleted){
			bot.on("serverDeleted", function(server){
				BetterDiscordLog.act(0, "serverDeleted", "error",'Server '+wS(server.name)+' was deleted' );
			});
		}
		
		if(BetterDiscordLogging.events.channelCreated){
			bot.on("channelCreated", function(channel){
				BetterDiscordLog.act(0, "channelCreated", "info",'Channel '+wID(channel.id)+' was created' );
			});
		}
		if(BetterDiscordLogging.events.channelUpdated){
			bot.on("channelUpdated", function(oldchannel, channel){
				BetterDiscordLog.act(0, "channelUpdated", "warn",'Channel '+wID(oldchannel.id)+' was edited' );
			});
		}
		if(BetterDiscordLogging.events.channelDeleted){
			bot.on("channelDeleted", function(channel){
				BetterDiscordLog.act(0, "channelDeleted", "error",'Channel '+wID(channel.id)+' was deleted' );
			});
		}
		
		if(BetterDiscordLogging.events.serverRoleCreated){
			bot.on("serverRoleCreated", function(role){
				BetterDiscordLog.act(1, "serverRoleCreated", "info",'Role '+wN(role.name)+' was created',role.server.id, role.server.name );
			});
		}
		if(BetterDiscordLogging.events.serverRoleUpdated){
			bot.on("serverRoleUpdated", function(oldrole, role){
				BetterDiscordLog.act(1, "serverRoleUpdated", "warn",'Role '+wN(role.name)+' was edited',role.server.id, role.server.name );
			});
		}
		if(BetterDiscordLogging.events.serverRoleDeleted){
			bot.on("serverRoleDeleted", function(role){
				BetterDiscordLog.act(1, "serverRoleDeleted", "error",'Role '+wN(role.name)+' was deleted',role.server.id, role.server.name );
			});
		}
		
		if(BetterDiscordLogging.events.serverNewMember){
			bot.on("serverNewMember", function(server, user){
				BetterDiscordLog.act(1, "serverNewMember", "info",wN(user.name)+' joined',server.id, server.name );
			});
		}
		if(BetterDiscordLogging.events.serverMemberUpdated){
			bot.on("serverMemberUpdated", function(server, user){
				BetterDiscordLog.act(1, "serverMemberUpdated", "warn",wN(user.name)+' updated',server.id, server.name );
			});
		}
		if(BetterDiscordLogging.events.serverMemberRemoved){
			bot.on("serverMemberRemoved", function(server, user){
				BetterDiscordLog.act(1, "serverMemberRemoved", "error",wN(user.name)+' left',server.id, server.name );
			});
		}
		
		if(BetterDiscordLogging.events.userTypingStarted){
			bot.on("userTypingStarted", function(user, channel){
				BetterDiscordLog.act(0, "userTypingStarted", "info",wN(user.name)+' started typing in '+wS(channel.id) );
			});
		}
		if(BetterDiscordLogging.events.userTypingStopped){
			bot.on("userTypingStopped", function(user, channel){
				BetterDiscordLog.act(0, "userTypingStopped", "error",wN(user.name)+' stopped typing in '+wS(channel.id) );
			});
		}
		
		if(BetterDiscordLogging.events.userUnbanned){
			bot.on("userUnbanned", function(user, server){
				BetterDiscordLog.act(1, "userUnbanned", "info",wN(user.name)+' was unbanned',server.id, server.name );
			});
		}
		if(BetterDiscordLogging.events.userBanned){
			bot.on("userBanned", function(user, server){
				BetterDiscordLog.act(1, "userBanned", "error",wN(user.name)+' was banned',server.id, server.name );
			});
		}
		
		if(BetterDiscordLogging.events.voiceJoin){
			bot.on("voiceJoin", function(voicechannel, user){
				BetterDiscordLog.act(0, "voiceJoin", "info", wN(user.name)+' joined voice channel '+wS(voicechannel.id), null, null );
			});
		}
		if(BetterDiscordLogging.events.voiceStateUpdate){
			bot.on("voiceStateUpdate", function(voicechannel, user){
				BetterDiscordLog.act(0, "voiceStateUpdate", "warn", wN(user.name)+' voice updated '+wS(voicechannel.id), null, null );
			});
		}
		if(BetterDiscordLogging.events.voiceLeave){
			bot.on("voiceLeave", function(voicechannel, user){
				//BetterDiscordLog.react("voiceLeave", server, client);
				BetterDiscordLog.act(0, "voiceLeave", "error", wN(user.name)+' left voice channel '+wS(voicechannel.id), null, null );
			});
		}

		function err2(error){
			if (error) {
				console.log(error);
				return;
			}
		}
		
		function success(token){
		//	console.log('Token: ' + token);
		}

		function err(error){
			if (error) {
				console.log('Problem occurred while logging in! ' + error);
				return;
			}
		}
	});
};
BetterDiscordLog.prototype.stop = function() {
	bot.off("ready");bot.off("disconnected");bot.off("raw");bot.off("presence");
	bot.off("debug");bot.off("warn");bot.off("error");
	bot.off("message");bot.off("messageUpdated");bot.off("messageDeleted");
	bot.off("serverCreated");bot.off("serverUpdated");bot.off("serverDeleted");
	bot.off("channelCreated");bot.off("channelUpdated");bot.off("channelDeleted");
	bot.off("serverRoleCreated");bot.off("serverRoleUpdated");bot.off("serverRoleDeleted");
	bot.off("serverNewMember");bot.off("serverMemberUpdated");bot.off("serverMemberRemoved");
	bot.off("userTypingStarted");bot.off("userTypingStopped");
	bot.off("voiceJoin");bot.off("voiceStateUpdate");bot.off("voiceLeave");
	bot.off("userUnbanned");bot.off("userBanned");
	console.log("Bot Plugin Stopped.");
};
BetterDiscordLog.prototype.update = function() {
	console.log("A Fake thing here this plugin does not update for others.");
};
BetterDiscordLog.prototype.getName = function() {
	return "BetterDiscordLog";
};
BetterDiscordLog.prototype.getDescription = function() {
	return "A Discord.js bot in BetterDiscord.";
};
BetterDiscordLog.prototype.getVersion = function() {
	return "1.0";
};
BetterDiscordLog.prototype.getAuthor = function() {
	return "Bluscream, Decorater";
};

BetterDiscordLog.log = function(level, event, msg){
		var time = null;var time = new Date().getTime();
		if($('.logrow').length > 23){$('.logrow:first').remove();};
		$('.bdserverlog>tbody').append('\
			<tr class="logrow">\
				<td>'+time+'</th>\
				<td>'+level.toUpperCase()+'</th>\
				<td>'+event+'</th>\
				<td>'+msg+'</th>\
			</tr>\
		');
};

wS = function(str){
	return '"'+str+'"';
}
wN = function(str){
	return '\''+str+'\'';
}
wM = function(str){
	return '\'\''+str+'\'\'';
}
wID = function(str){
	return '#'+str;
}
// BetterDiscordLog.act(event, level, msg, id, name);
BetterDiscordLog.act = function(s, event, level, msg, id ,name){
	if(typeof lastname == "undefined" || lastname == "undefined"){var s = 0;}
	if(BetterDiscordLogging.settings.console){
		if(BetterDiscordLogging.settings.currentServer && s){
			if(id == BetterAPI.getCurrentServerID()){
				BetterAPI.log(0, level, 'Logger', msg);
			}
		}else{
			BetterAPI.log(0, level, 'Logger', msg+' on '+wS(name)+'.');
		}
	}
	if(BetterDiscordLogging.settings.notification){
		if(BetterDiscordLogging.settings.currentServer && s){
			if(id == BetterAPI.getCurrentServerID()){
				if(level == "error"){
					alertify.error(msg);
				}else{ alertify.success(msg); }
			}
		}else{
			if(level == "error"){
				alertify.error(msg+' on '+name+'.');
			}else{ alertify.success(msg+' on '+wS(name)+'.'); }
		}
	}
	if(BetterDiscordLogging.settings.html){
		if(BetterDiscordLogging.settings.currentServer && s){
			if(id == BetterAPI.getCurrentServerID()){
				BetterDiscordLog.log(level, event, msg);
			}
		}else{
			BetterDiscordLog.log(level, event, msg+' on '+wS(name)+'.');
		}
	}
}
// BetterDiscordLog.act = function(event, level, type, action, server, channel, ){
	// if(BetterDiscordLogging.settings.console){
		// if(BetterDiscordLogging.settings.currentServer || s){
			// if(id == BetterAPI.getCurrentServerID()){
				// BetterAPI.log(0, level, 'Logger', msg);
			// }
		// }else{
			// BetterAPI.log(0, level, 'Logger', msg+' on '+name+'.');
		// }
	// }
// }