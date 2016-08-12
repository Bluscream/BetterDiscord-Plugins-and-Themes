//META{"name":"AvatarHover"}*//

var _fs = require("fs");

var AvatarHover  = function() {
	this.load = function() {
		this.loadSettings();
		this.appendContainer();

		var that = this;
		$(window).keydown(function(event) {
			if(event.which == 17) that.isShown = true;
			if(event.which == 16) that.isLarge = true;
		});

		$(window).keyup(function(event) {
			if(event.which == 17) that.isShown = false;
			if(event.which == 16) that.isLarge = false;
		});

		$(window).blur(function() {
			that.isShown = false;
			that.isLarge = false;
		});

		$("#app-mount").bind("DOMSubtreeModified", function() {
			that.init();
		});
	};

	this.unload = function() {
		var e = document.getElementById("AvatarHover");
		if(e) e.parentNode.removeChild(e);
	};

	this.start = function() {
		this.isRunning = true;
		this.init();
	};

	this.stop = function() {
		this.isRunning = false;
		this.init();
	};

	this.onSwitch = function() {};
	this.onMessage = function() {};

	this.getSettingsPanel = function() {
		return this.getPanel();
	};

	this.getName = function() {
		return "AvatarHover";
	};

	this.getDescription = function() {
		return "When hovering, resize the avatar. Use Ctrl / Ctrl+Shift";
	};

	this.getAuthor = function() {
		return "noVaLue";
	};

	this.getVersion = function() {
		return "Version 0.3.0";
	};
};

AvatarHover.prototype.settings = {
	"isShown": false,
	"isLarge": false,
	"isHoverGuilds": false,
	"isHoverChannels": true,
	"isHoverFriends": true,
	"isHoverChatMessages": true,
	"isHoverChatUsers": true,
	"avatarBackgroundColor":"#303336",
	"avatarBorderRadius": "4px",
	"avatarBorderSize": "1px",
	"avatarBorderColor": "black"
};

AvatarHover.prototype.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

AvatarHover.prototype.isRunning = false;
AvatarHover.prototype.isShown = false;
AvatarHover.prototype.isLarge = false;

AvatarHover.prototype.run = function() {
	if(this.isRunning) this.init();
};

AvatarHover.prototype.appendContainer = function () {
	var that = this;
	var elem = $("<div id='AvatarHover'>");
	elem.css({
		"display:":"none", "background-size": "cover",
		"position":"absolute", "zIndex":"99999"
	});
	$("body").append(elem);
};

AvatarHover.prototype.init = function() {
	if(this.settings['isHoverGuilds']) {
		this.selector("div.guilds-wrapper", ".avatar-small");
		this.selector("div.guilds-wrapper", ".avatar-large");
	}
	if(this.settings['isHoverChannels']) {
		this.selector("div.channels-wrap", ".avatar-small");
		this.selector("div.channels-wrap", ".avatar-large");
	}
	if(this.settings['isHoverFriends']) {
		this.selector("div.friends-table", ".avatar-small");
		this.selector("div.friends-table", ".avatar-large");
	}
	if(this.settings['isHoverChatMessages']) {
		this.selector("div.messages-wrapper", ".avatar-small");
		this.selector("div.messages-wrapper", ".avatar-large");
	}
	if(this.settings['isHoverChatUsers']) {
		this.selector("div.channel-members-wrap", ".avatar-small");
		this.selector("div.channel-members-wrap", ".avatar-large");
	}
};

AvatarHover.prototype.selector = function (elem, subElemClass) {
	var that = this;
	$(elem).find(subElemClass).each(function(id, elem) {
		if(that.isRunning) {
			if($(this).data("customShowAvatar"))
				return;

			$(this).data("customShowAvatar", true);

			$(this).mouseenter(function() {
				if(that.isRunning && (that.isShown || that.settings['isShown'])) {
					that.setAvatarSize($(this));

					$("#AvatarHover").css({
						"display":"block",
						"background-color": that.settings['avatarBackgroundColor'],
						"border-radius": that.settings['avatarBorderRadius'],
						"border": that.settings['avatarBorderSize'] + " solid "+ that.settings['avatarBorderColor'],
						"background-image": $(this).css("background-image")
					});
				}
			});

			$(this).mouseleave(function() {
				if(that.isRunning)
					$("#AvatarHover").css({"display":"none"});
			});
		}else {
			if(!$(this).data("customShowAvatar"))
				return;

			$(this).data("customShowAvatar", false);
			$(this).unbind("mouseenter");
			$(this).unbind("mouseleave");
		}
	});
};

AvatarHover.prototype.setAvatarSize = function(self) {
	var newWidth = this.isLarge || this.settings['isLarge'] ? 256 : 128,
	newHeight = this.isLarge || this.settings['isLarge'] ? 256 : 128;

	var offset = self.offset();
	var width = self.width();
	var height = self.height();

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	var AvatarX = offset.left + (width - newWidth)/2;
	var AvatarY = windowHeight-height < offset.top + newHeight ? offset.top - newHeight : offset.top + height;
	AvatarX = AvatarX < 0 ? 0 : AvatarX;
	AvatarX = AvatarX + width > windowWidth ? windowWidth - width : AvatarX;

	$("#AvatarHover").css({
		"top": AvatarY + "px",
		"left": AvatarX + "px",
		"width": newWidth + "px",
		"height": newHeight + "px"
	});
};

AvatarHover.prototype.setSettings = function() {
	var bgColor = $('#avatarBGColor').val();
	var borderRad = $('#avatarBorderRadius').val();
	var borderSize = $('#avatarBorderSize').val();
	var borderColor = $('#avatarBorderColor').val();

	this.settings['avatarBackgroundColor'] = bgColor == "" ? "#303336": bgColor;
	this.settings['avatarBorderRadius'] = borderRad == "" ? "4px": borderRad;
	this.settings['avatarBorderSize'] = borderSize == "" ? "1px": borderSize;
	this.settings['avatarBorderColor'] = borderColor == "" ? "black": borderColor;
	this.settings['isShown'] = $('#avatarIsShown').is(':checked');
	this.settings['isLarge'] = $('#avatarIsLarge').is(':checked');
	this.settings['isHoverGuilds'] = $('#avatarIsHoverGuilds').is(':checked');
	this.settings['isHoverChannels'] = $('#avatarIsHoverChannels').is(':checked');
	this.settings['isHoverFriends'] = $('#avatarIsHoverFriends').is(':checked');
	this.settings['isHoverChatMessages'] = $('#avatarIsHoverChatMessages').is(':checked');
	this.settings['isHoverChatUsers'] = $('#avatarIsHoverChatUsers').is(':checked');

	this.saveSettings();
	this.init();

	$("#bd-psm-id").remove();
};

AvatarHover.prototype.saveSettings = function() {
	var settings = this.getSettingsFile();
	try { _fs.writeFileSync(settings, JSON.stringify(this.settings)); }catch(ex) {}
};

AvatarHover.prototype.loadSettings = function() {
	var settings = this.getSettingsFile();
	try {
		var tmpSettings = JSON.parse(_fs.readFileSync(settings));

		if(this.size(this.settings) == this.size(tmpSettings))
			this.settings = tmpSettings;
	}catch(ex) {}
};

AvatarHover.prototype.getSettingsFile = function() {
	var _os = process.platform;
	var _dataPath = _os == "win32" ? process.env.APPDATA : _os == 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local';
	_dataPath += "/BetterDiscord";
	var _userFile = _dataPath + "/avatar.json";
	return _userFile;
};

AvatarHover.prototype.getPanel = function() {
	return '<style>' +
	 	'fieldset.avatarSettings { border-radius: 4px 10px 4px 10px; border:1px solid black;'+
	 	'	border-left:0px; background-color: #19232F; color:white; margin-top:10px }'+
	 	'fieldset.avatarSettings legend { border-radius:10px 30px 0px 0px; border:1px solid black;'+
	 	'	border-right:0px; text-indent:4px; padding:3px; padding-left:0px; padding-right:0px;'+
	 	'	width:100%; font-weight:bold; background-color: #122334 }'+

		'table.avatarSettings { width:90%; margin:5px; }'+
		'table.avatarSettings td:last-child { text-align:center }'+
		'table.avatarSettings label { color:white; font-weight:700; text-indent: 4px }'+
		'table.avatarSettings hr { border:1px solid white }'+
		'table.avatarSettings button { padding:3px; border-radius: 4px; font-weight:bold; background-color: #BFF5F7 }'+
		'table.avatarSettings button:hover { background-color: #97E6B2 }'+
		'table.avatarSettings input { width: 100px }'+
		'</style>' +
		'<fieldset class="avatarSettings"><legend>AvatarHover Settings:</legend>' +
		'<table class="avatarSettings">' +
		'<tr><td width="50%"><label for="avatarBGColor">Avatar BG Color: </label></td>'+
				'<td><input type="color" placeholder="#012345" id="avatarBGColor" value="'+
				this.settings['avatarBackgroundColor']+
				'"></td></tr>' +
        '<tr><td><hr></td><td></td></tr>'+
        '<tr><td><label for="avatarBorderRadius">Avatar BorderRadius: </label></td>'+
				'<td><input type="text" placeholder="0px" id="avatarBorderRadius" value="'+
				this.settings['avatarBorderRadius']+
				'"></td></tr>' +
		'<tr><td><hr></td><td></td></tr>'+
       	'<tr><td><label for="avatarBorderSize">Avatar BorderSize: </label></td>'+
				'<td><input type="text" placeholder="1px" id="avatarBorderSize" value="'+
				this.settings['avatarBorderSize']+
				'"></td></tr>' +
		'<tr><td><hr></td><td></td></tr>'+
    	'<tr><td><label for="avatarBorderColor">Avatar BorderColor: </label></td>'+
				'<td><input type="color" placeholder="0px" id="avatarBorderColor" value="'+
				this.settings['avatarBorderColor']+
				'"></td></tr>' +

    	'<tr><td><hr></td><td></td></tr>'+
    	'<tr><td><label for="avatarIsShown">Avatar Force Show: </label></td>'+
				'<td><input type="checkbox" id="avatarIsShown" '+
				(this.settings['isShown'] ? "checked": "")+
				'></td></tr>' +
    	'<tr><td><label for="avatarIsLarge">Avatar Force Large: </label></td>'+
				'<td><input type="checkbox" id="avatarIsLarge" '+
				(this.settings['isLarge'] ? "checked": "")+
				'></td></tr>' +

		'<tr><td><hr></td><td></td></tr>'+
		'<tr><td><label for="avatarIsHoverGuilds">Hover Guilds: </label></td>'+
				'<td><input type="checkbox" id="avatarIsHoverGuilds" '+
				(this.settings['isHoverGuilds'] ? "checked": "")+
				'></td></tr>' +
		'<tr><td><label for="avatarIsHoverChannels">Hover Channels/DM Users: </label></td>'+
				'<td><input type="checkbox" id="avatarIsHoverChannels" '+
				(this.settings['isHoverChannels'] ? "checked": "")+
				'></td></tr>' +
		'<tr><td><label for="avatarIsHoverFriends">Hover Friends List: </label></td>'+
				'<td><input type="checkbox" id="avatarIsHoverFriends" '+
				(this.settings['isHoverFriends'] ? "checked": "")+
				'></td></tr>' +
		'<tr><td><label for="avatarIsHoverChatMessages">Hover Chat Messages: </label></td>'+
				'<td><input type="checkbox" id="avatarIsHoverChatMessages" '+
				(this.settings['isHoverChatMessages'] ? "checked": "")+
				'></td></tr>' +
		'<tr><td><label for="avatarIsHoverChatUsers">Hover Chat Users: </label></td>'+
				'<td><input type="checkbox" id="avatarIsHoverChatUsers" '+
				(this.settings['isHoverChatUsers'] ? "checked": "")+
				'></td></tr>' +

    	'<tr><td><hr></td><td><hr></td></tr>'+
    	'<tr><td></td><td>'+
    	'<button '+
       		'style="border:1px solid blue"'+
        	'onclick="BdApi.getPlugin(\'AvatarHover\').setSettings()"'+
        '>Apply</button></td></tr></table>'+
        '</fieldset>'+
        '<script> $("fieldset.avatarSettings").ready(function () { '+
        '	$("#bd-psm-s").css({"background-color": "transparent"}); '+
        '	$("#bd-psm-s").parent().css({"background-color": "transparent"}); '+
        '	$("#bd-psm-s").parent().parent().css({'+
        '		"background-color": "transparent", "box-shadow":"0 0 10px 5px rgba(150,200,100,.75)"'+
        '	});'+
        '});</script>';
};

try{exports.AvatarHover=AvatarHover;}catch(e){console.warn('AvatarHover: Using old version, not exporting functions.');}
