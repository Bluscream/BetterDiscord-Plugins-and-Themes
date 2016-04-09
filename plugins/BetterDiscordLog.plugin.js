//META{"name":"BetterDiscordLog"}*//

function BetterDiscordLog() {}

var saveDir = __dirname.slice(0, __dirname.indexOf("\\", __dirname.lastIndexOf('Discord') + "Discord".length + 1) + 1) + "resources"

function npm(name,callback) {
	require("child_process").exec("npm install --save " + name, {
		cwd : saveDir
	}, function (e, f, g) {
		console.log(e, f, g);
		callback()
	})
};

BetterDiscordLog.prototype.loadlib = function(name) {
	
}

BetterDiscordLog.prototype.load = function() {

};

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
		bot.on("userBanned", function(server, client){
			console.log(server.id+' = '+BetterAPI.getCurrentServerID());
			if(server.id == BetterAPI.getCurrentServerID()){
				alertify.error(client.username+' was banned.');
			}
		});
		bot.on("userUnbanned", function(server, client){
			console.log(server.id+' = '+BetterAPI.getCurrentServerID());
			if(server.id == BetterAPI.getCurrentServerID()){
				alertify.success(client.username+' was unbanned.');
			}
		});
		bot.on("serverNewMember", function(server, client){
			console.log(server.id+' = '+BetterAPI.getCurrentServerID());
			if(server.id == BetterAPI.getCurrentServerID()){
				alertify.notify(client.username+' joined.');
			}
		});
		bot.on("serverMemberRemoved", function(server, client){
			console.log(server.id+' = '+BetterAPI.getCurrentServerID());
			if(server.id == BetterAPI.getCurrentServerID()){
				alertify.notify(client.username+' left.');
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

BetterDiscordLog.prototype.stop = function() {
	var ignoreCommands = true;
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
	return "Decorater";
};


