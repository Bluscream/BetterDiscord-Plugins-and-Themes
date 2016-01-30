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
		console.log("Plugin Loaded for Bot. Starting Bot.");
		bot.login("email", "password").then(success).catch(err);
		console.log("Logged in.");

		var ignoreCommands = false;
		bot.on("message", function(message){
		if (ignoreCommands === false) {
				if(message.content === "#commands")
					bot.sendMessage(channel, "Available Commands:\n**#nazimods**\n**#type**\nMade in Discord.js by @Decorater.");
				if(message.content === "#nazimods")
					bot.sendMessage(channel, "http://i.imgur.com/ySUKYG0.png https://abal.moe/u/nazidanny2.png https://abal.moe/u/nazidanny1.png http://i.imgur.com/MpTQmZZ.png https://cdn.discordapp.com/attachments/81384788765712384/132702701363527681/Screenshot_from_2016-01-01_203301.png");
				if(message.content === "#type")
					bot.startTyping(channel, err2);
				if(message.content === ".abal")
					bot.sendMessage(channel, "i just grabbed the logs for this entire server since its inception yesterday")
			}
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


