//META{"name":"BetterAPI"}*//
function BetterAPI() {}

BetterAPI.prototype.load = function() {
	debug = 1;
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.injectCSS();
	BetterAPI.prototype.injectJS();
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.loadAPI();
	// BetterAPI.prototype.loadEvents();
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};

BetterAPI.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};

BetterAPI.prototype.start = function() {		
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};

BetterAPI.prototype.stop = function() {
	// BetterAPI.prototype.unloadEvents();
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};

BetterAPI.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
};

BetterAPI.prototype.getName = function() {
	return "BetterAPI Plugin";
};

BetterAPI.prototype.getDescription = function() {
	return "Enhances the BetterDiscord Plugin API.";
};

BetterAPI.prototype.getVersion = function() {
	return "1.0";
};

BetterAPI.prototype.getAuthor = function() {
	return "Bluscream";
};

BetterAPI.prototype.loadCore  = function() {
	
	//BetterAPI.isNumber("string");
	BetterAPI.isNumber = function(string) {
		return /^\d+$/.test(string);
	};
	
	//BetterAPI.log(dbg, "type", "pluginName", "msg");
	BetterAPI.log = function(dbg, type, pluginName, msg) {
		if ( (dbg == "debug") || (dbg == "dbg") || (dbg == 1) ) {
			if (debug == 1) {
				switch(type) {
					case "info":
						console.info("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					case "warn":
						console.warn("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					case "error":
						console.error("[BetterDiscord] " + pluginName + ": " + msg);
						break;
					default:
						console.log("[BetterDiscord] " + pluginName + ": " + msg);
				};
			} else {
				return;
			}
		} else {
			switch(type) {
				case "info":
					console.info("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "warn":
					console.warn("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				case "error":
					console.error("[BetterDiscord] " + pluginName + ": " + msg);
					break;
				default:
					console.log("[BetterDiscord] " + pluginName + ": " + msg);
			};
		};	
	};
	
	//BetterAPI.appendTo("link", "Element");
	BetterAPI.appendTo = function(link, Element){
		var $head = $("head");
		var $headlinklast = $head.find( link + ":last");
		if ($headlinklast.length){
		   $headlinklast.after(Element);
		}
		else {
		   $head.append(Element);
		};
	};
};

BetterAPI.prototype.injectCSS  = function() {
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css" type="text/css">');
};

BetterAPI.prototype.injectJS  = function() {
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js"></script>');
	$("head").append('<script src="https://cdn.rawgit.com/zenorocha/clipboard.js/v1.5.5/dist/clipboard.min.js"></script>');
 // $("head").append('<script src="https://cdn.rawgit.com/hydrabolt/discord.js/master/lib/index.js"></script>');
 // $("head").append('<script src="https://cdn.rawgit.com/izy521/discord.io/master/lib/index.js"></script>');
 // $("head").append('<script src="https://cdn.rawgit.com/qeled/discordie/master/lib/index.js"></script>');
};

BetterAPI.prototype.loadAPI  = function() {
	// BetterAPI.getUserIdByName("name");
	BetterAPI.getUserIdByName = function(name) {
		var nick = "";
		var match = "";		
		var users = $(".member-username");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			if(user.text() == name) {
				var avatarUrl = user.closest(".member").find(".avatar-small").css("background-image");
				match = avatarUrl.match(/\d+/);
				nick = user.text();
			};
		};
		if (match == "") {
            [].slice.call($('.message-group')).forEach(function (message) {
				var user = $(message).find(".user-name");
				var username = user.text();
				var comment = $(user).parents(".comment");
				var silbling = $(comment).prev();
				var avatarUrl = $(silbling).css("background-image");
				if (name == username) {
					match = avatarUrl.match(/\d+/);
					nick = user.text();
				};
			});
		};
		if ( ( match != "" ) && ( /^\d+$/.test(match) ) && ( ( match.length < 17 ) || ( match.length > 18 ) ) ) {
			BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "UID of \""+nick+"\" is \""+match+"\"");
			return match;
		} else {
			return null;
		};
	};
	// BetterAPI.getUserNameById("id");
	BetterAPI.getUserNameById = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			var url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-username").text();
			}
		}
		if (match == "") {
			var users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				var user = $(users[i]);
				var url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-username").text();
				}
			}
		};
		if (match != "") {
			return match;
		} else {
			return null;
		};
	};
	//```js
	// BetterAPI.addUserLabel("divID", "label", "<html>");
	BetterAPI.addUserLabel = function(divID, label, html) {
		console.log("Length: \""+$(divID).length+"\"");
		var divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {$('.user-popout-options').prepend(''+
			'<div id="'+divID+'"class="roles-container">'+
				'<span class="label">'+label+'</span>'+
				'<ul class="member-roles">'+
					html+
				'</ul>'+
			'</div>');
		}
		$(divID).length = 1;
	};
	//```
	// BetterAPI.addUserButton("btn", "divID", "text");
	BetterAPI.addUserButton = function(type, divID, text) {
        if ($(divID).length <= 0) {
			$('.user-popout-options').append('<button class="'+type+'" id="'+divID+'">'+text+'</button>');
		}
	};
	// BetterAPI.addSettingsTab("btn", "divID", "text");
	BetterAPI.addSettingsTab = function(type, divID, text) {
		SkypeEmos.settingsButton = null;
		SkypeEmos.settingsPanel = null;
		SkypeEmos.prototype.settings_changeTab = function(tab) {

			SkypeEmos.settings_lastTab = tab;

			var controlGroups = $("#se-control-groups");
			$(".se-tab").removeClass("selected");
			$(".se-pane").hide();
			$("#" + tab).addClass("selected");
			$("#" + tab.replace("tab", "pane")).show();

			switch (tab) {
				case "se-settings-tab":
					break;
			}
		};

		SkypeEmos.settings_updateSetting = function(checkbox) {
			var cb = $(checkbox).children().find('input[type="checkbox"]');
			var enabled = !cb.is(":checked");
			var id = cb.attr("id");
			cb.prop("checked", enabled);
			SkypeEmos.settings[id] = enabled;
			SkypeEmos.prototype.saveSettings()
			console.log("id", enabled)
		}

		SkypeEmos.settings_construct = function() {

			SkypeEmos.settingsPanel = $("<div/>", {
				id: "se-pane",
				class: "settings-inner",
				css: {
					"display": "none"
				}
			});

			var settingsInner = '' +
				'<div class="scroller-wrap">' +
				'   <div class="scroller settings-wrapper settings-panel">' +
				'       <div class="tab-bar TOP">' +
				'           <div class="tab-bar-item se-tab" id="se-settings-tab" onclick="SkypeEmos.prototype.settings_changeTab(\'se-settings-tab\');">Settings</div>' +
				'       </div>' +
				'       <div class="se-settings">' +
				'' +
				'               <div class="se-pane control-group" id="se-settings-pane" style="display:none;">' +
				'                   <ul class="checkbox-group">';

			for (var setting in SkypeEmos.settingsArray) {
				var sett = SkypeEmos.settingsArray[setting];
				var id = sett["id"];
				if (sett["implemented"]) {
					settingsInner += '' +
						'<li>' +
						'<div class="checkbox" onclick="SkypeEmos.settings_updateSetting(this);" >' +
						'<div class="checkbox-inner">' +
						'<input type="checkbox" id="' + id + '" ' + (SkypeEmos.settings[id] ? "checked" : "") + '>' +
						'<span></span>' +
						'</div>' +
						'<span>' + setting + " - " + sett["info"] +
						'</span>' +
						'</div>' +
						'</li>';
				}
			}
			settingsInner += '</ul>' +
				'               </div>' +
				' </div>' +
				' </div>' +
				'</div>'

			function show_Settings() {
				$(".tab-bar-item").removeClass("selected");
				SkypeEmos.settingsButton.addClass("selected");
				$(".form .settings-right .settings-inner").hide();

				SkypeEmos.settingsPanel.show();
				if (SkypeEmos.settings_lastTab == "") {
					SkypeEmos.prototype.settings_changeTab("se-settings-tab");
				} else {
					SkypeEmos.prototype.settings_changeTab(SkypeEmos.settings_lastTab);
				}
			}

			SkypeEmos.settingsButton = $("<div/>", {
				class: "tab-bar-item",
				text: "Skype-Emos",
				id: "se-settings-new",
				click: function() {
					setTimeout(show_Settings, 100);
				}
			});

			SkypeEmos.settingsPanel.html(settingsInner);

			function defer() {
				if ($(".btn.btn-settings").length < 1) {
					setTimeout(defer, 100);
				} else {
					$(".btn.btn-settings").first().on("click", function() {

						function innerDefer() {
							if ($(".modal-inner").first().is(":visible")) {

								SkypeEmos.settingsPanel.hide();
								var tabBar = $(".tab-bar.SIDE").first();

								$(".tab-bar.SIDE .tab-bar-item:not(#bd-settings-new)").click(function() {
									$(".form .settings-right .settings-inner").first().show();
									$("#se-settings-new").removeClass("selected");
									SkypeEmos.settingsPanel.hide();
								});
								$(".tab-bar.SIDE .tab-bar-item#bd-settings-new").click(function() {
									$("#se-settings-new").removeClass("selected");
									SkypeEmos.settingsPanel.hide();
								});

								tabBar.append(SkypeEmos.settingsButton);
								$(".form .settings-right .settings-inner").last().after(SkypeEmos.settingsPanel)
								$("#se-settings-new").removeClass("selected");
							} else {
								setTimeout(innerDefer, 100);
							}
						}
						innerDefer();
					});
				}
			}
			defer();
		};
		SkypeEmos.settingsArray = {
		"Enable Skype Emotes in Messages": {
			"id": "emote-enable",
			"info": "Enable Message Parsing",
			"default": true,
			"implemented": true
		},
		"Show Skype Emo list": {
			"id": "emote-list",
			"info": "Shows the Skype Emo list",
			"default": true,
			"implemented": false
		},
		"Show Emo Names": {
			"id": "emote-tooltip",
			"info": "Shows the Emo Names",
			"default": true,
			"implemented": false
		},
		
	};
}
	
};
BetterAPI.prototype.loadEvents  = function() {
	$('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
		BetterAPI.gatheredUserPopup = false;
		var BetterAPI_UserPopup_name = $(".user-popout").find(".username").text();
		var BetterAPI_UserPopup_id = BetterAPI.getUserIdByName(BetterAPI_UserPopup_name);
		var BetterAPI_UserPopup_nameByID = BdApi.getUserNameById(BetterAPI_UserPopup_id);
		BetterAPI.gatheredUserPopup = true;
	});
};
BetterAPI.prototype.unloadEvents  = function() {
	$('span[data-reactid=".0.4"]').off('DOMNodeInserted');
	$('body').off('DOMSubtreeModified');
};


