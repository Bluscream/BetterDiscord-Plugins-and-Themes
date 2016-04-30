//META{"name":"Spotify"}*//
var Spotify = function () {
	'use strict';
	this.getName = function () {
		return "Spotify Plugin";
	}
	this.getDescription = function () {
		return "Allows you to use some Spotify Features.";
	}
	this.getVersion = function () {
		return "1";
	}
	this.getAuthor = function () {
		return "Bluscream";
	}
	this.client;
};
var lastURL = "";
var lastErr = "";
Spotify.prototype.load = function () {};
Spotify.prototype.start = function () {
	var saveDir = __dirname.replace('resources\\atom.asar\\renderer\\lib', 'resources');
	BetterAPI.npm('node-spotify-webhelper', saveDir, function () {
		var path = require('path');
		var nodeSpotifyWebHelper = require(path.join(saveDir, "node_modules", "node-spotify-webhelper"));
		Spotify.client = new nodeSpotifyWebHelper.SpotifyWebHelper();
		setInterval(function () {
			Spotify.client.getStatus(function (err, res) {
				if (err) {
					err = err.toString();
					if (lastErr != err) {
						lastErr = err;
						console.error(err);
					} else {
						return;
					}
				}
				if (lastURL != res.track.track_resource["location"]["og"]) {
					BetterDiscordBot.constructor.bot.sendMessage('161211170919809025', '<@134390773377400832> is now playing: ' + res.track.track_resource["location"]["og"]);
					lastURL = res.track.track_resource["location"]["og"];
				}
			});
		}, 1000);
	});
};
Spotify.prototype.onSwitch = function () {};
Spotify.prototype.onMessage = function () {};
Spotify.prototype.observer = function (e) {};
Spotify.prototype.stop = function () {};
Spotify.prototype.unload = function () {};
Spotify.prototype.getSettingsPanel = function () {
	return "<h3>Settings Panel</h3>";
};
try {
	exports.Spotify = Spotify;
} catch (e) {
	console.warn('Spotify: Using old BetterDiscord version, not exporting functions.')
}
