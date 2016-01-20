//META{"name":"TwitchTools"}*//

function TwitchTools() {}

TwitchTools.prototype.load = function()
{
};

TwitchTools.prototype.unload = function()
{
};

TwitchTools.prototype.start = function()
{
	this.game = null;
	this.username = localStorage.username || '';
	
	var self = this;
	this._e = setInterval(function() { self.checkTwitch(); }, 15000);
	this.checkTwitch();
};

TwitchTools.prototype.stop = function()
{
	clearInterval(this._e);
};

TwitchTools.prototype.getName = function()
{
    return "TwitchTools";
};

TwitchTools.prototype.getDescription = function()
{
    return "Tools for twitch streamers";
};

TwitchTools.prototype.getVersion = function()
{
    return "1.0";
};

TwitchTools.prototype.getAuthor = function()
{
    return "authorblues";
};

TwitchTools.prototype.checkTwitch = function()
{
	var self = this;
	if (this.username && this.username.length > 0)
		$.get('https://api.twitch.tv/kraken/streams?&channel=' + this.username, function(data)
		{
			var game = null;
			if (data.streams.length > 0)
				game = data.streams[0].game;
			self.setPlaying(game);
		},
		'jsonp');
};

TwitchTools.prototype.onSwitch = function()
{
	this.setPlayingTag(this.game);
}

TwitchTools.prototype.setPlaying = function(game)
{
	self.game = game;
	BdApi.setPlaying(game);
	this.setPlayingTag(game);
}

TwitchTools.prototype.setPlayingTag = function(game)
{
	var ownID = ''+$(".account .avatar-small").css("background-image").match(/\d+/);
	var users = $(".member-username");
	
	$('#owngame').remove();
	if (!game || !game.length) return;
	for (var i = 0; i < users.length; i++)
	{
		var user = $(users[i]);
		var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
		if (avatarUrl.match(/\d+/) == ownID) {
			user.parent().append(
				'<div class="member-game" id="owngame">'+
				'<span>Playing </span>'+
				'<strong>'+game+'</strong>'
			);
		}
    }
};

TwitchTools.prototype.updateSettings = function()
{
	this.username = document.getElementById('twitchUsername').value;
	localStorage.username = this.username;
	this.checkTwitch();
};

TwitchTools.prototype.getSettingsPanel = function()
{
	return '<label for="twitchUsername">Twitch Username: </label> ' + 
		'<input type="text" placeholder="" name="twitchUsername" id="twitchUsername" value="'+this.username+'">' + 
		'<button onclick="BdApi.getPlugin(\'TwitchTools\').updateSettings()">Update</button>';
};