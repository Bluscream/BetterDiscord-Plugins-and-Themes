//META{"name":"BetterDiscordBot"}*//

function BetterDiscordBot() {}

var saveDir = __dirname.slice(0, __dirname.indexOf("\\", __dirname.lastIndexOf('Discord') + "Discord".length + 1) + 1) + "resources"

function npm(name,callback) {
	require("child_process").exec("npm install --save " + name, {
		cwd : saveDir
	}, function (e, f, g) {
		console.log(e, f, g);
		callback()
	})
};

BetterDiscordBot.prototype.loadlib = function(name) {
	
}

BetterDiscordBot.prototype.load = function() {

};

BetterDiscordBot.prototype.unload = function() {
	var ignoreCommands = true;
	console.log("Plugin Unloaded for Bot. Not logging out but ignoring the commands.");
};

BetterDiscordBot.prototype.start = function() {
	npm('discord.js',function(){
		var Discord = require(saveDir + '\\node_modules\\discord.js');
		var bot = new Discord.Client();
		console.log("BetterDiscordBot: Plugin Loaded for Bot. Starting Bot.");
		// var email = localStorage.getItem('email');var pw = localStorage.getItem('password');
		// if(!email || (email == "") || email == "undefined"){
			// alertify.prompt("BetterDiscordBot: Enter your email.", function (e, str) {
				// if (e) { localStorage.setItem('email', str); }
			// }, "example@example.com");
		// }
		// if(!pw || (pw == "") || pw == "undefined"){
			// alertify.prompt("BetterDiscordBot: Enter your password.", function (e, str) {
				// if (e) { localStorage.setItem('password', str); }
			// }, "example");
		// }
		// email = localStorage.getItem('email');pw = localStorage.getItem('password');
		// bot.login(email, pw).then(success).catch(err);
		bot.loginWithToken(localStorage.token.match(/\"(.+)\"/)[1]).then(success).catch(err);
		console.log("BetterDiscordBot: Logged in.");
		if(!channel){
			var channel = ''+BetterAPI.getCurrentTextChannelID();
		}
		var ignoreCommands = false;
		bot.on("message", function(message){
			if(localStorage.getItem(debug)=='1'){
				console.info('New message recieved in channel #'+channel+': '+message.content);
			}
			if (ignoreCommands === false) {
				var msg = message.content; msg = msg.toLowerCase(); var prefix = '<@'+BetterAPI.getOwnID()+'> ';
				switch(msg) {
				 case prefix+'help':
					bot.sendMessage(channel, '**BetterDiscordBot**\n\nPrefix: '+prefix+'\nCommands:\n`info`,`time`\n\nBy @Decorater and Bluscream.');
					break;
				 case prefix+'info':
					bot.sendMessage(channel, "Credits:\n\n`Discord` by Hammer & Chisel\n`Discord.js` by hydrabolt\n`BetterDiscord` by Jiiks\n`BetterDiscord+` by Bluscream")
					break;
				 case prefix+'time':
					var now = new Date();bot.sendMessage(channel, 'My local time is `'+now+'`')
					break;
				 default:
					 break;
				}
			 }
		});
		bot.on("userBanned", function(server, client){
			console.log(server);console.log(client);
		});
		bot.on("userUnbanned", function(server, client){
			console.log(server);console.log(client);
		});
		bot.on("serverNewMember", function(server, client){
			console.log(server);console.log(client);
		});
		bot.on("serverMemberRemoved", function(server, client){
			console.log(server);console.log(client);
		});

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
	return "Decorater";
};


