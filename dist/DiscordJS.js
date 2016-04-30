(function() {
	discordJS = {};
	discordJS.token = localStorage.token.match(/\"(.+)\"/)[1];
	discordJS.ready = false;
	BetterAPI.log(0, "info", "Discord.JS", "Loading...");
	
	var saveDir = __dirname.replace('resources\\atom.asar\\renderer\\lib', 'resources');
	// var saveDir = __dirname.replace('plugins', 'resources');
	// var saveDir = __dirname.slice(0, __dirname.indexOf("\\", __dirname.lastIndexOf('Discord') + "Discord".length + 1) + 1) + "resources";
	BetterAPI.npm('path', saveDir);
	BetterAPI.npm('discord.js', saveDir, function () {
		var path = require('path');
		var Discord = require(path.join(saveDir, "node_modules", "discord.js"));//saveDir + '\\node_modules\\discord.js
		discordJS = new Discord.Client();
		console.log("Discord.JS: Plugin Loaded for Bot. Starting Bot.");
		discordJS.loginWithToken(discordJS.token).then(success).catch (err);
		console.log("Discord.JS: Logged in.");
		bot.on("ready", function (data) {
			console.log("BetterDiscordBot: Client connected.");
			discordJS.ready = true;
		});
		bot.on("disconnected", function (data) {
			console.log("BetterDiscordBot: Client disconnected. Auto reconnecting...");
			discordJS.ready = false;
			var _int = setInterval(function(){
				bot.loginWithToken(discordJS.token).then(clearInterval(_int)).catch(err);
			}, 5000);
		});
	});
	BetterAPI.log(0, "info", "Discord.JS", "Successfully loaded.");
})();