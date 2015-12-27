//META{"name":"BetterAPI"}*//
function BetterAPI() {}
BetterAPI.prototype.load = function() {
	debug = 0;
	forceEnableTextSelection = 1;
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.injectCSS();
	BetterAPI.prototype.injectJS();
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.loadAPI();
	// BetterAPI.prototype.loadEvents();
};
BetterAPI.prototype.unload = function() {
	console.clear();
};
BetterAPI.prototype.start = function() {	
	if (forceEnableTextSelection == 1) {
		BetterAPI.EnableTextSelection();
	}	
};
BetterAPI.prototype.stop = function() {
	// BetterAPI.prototype.unloadEvents();
};
BetterAPI.prototype.update = function() {
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
						break;
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
					break;
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
	BetterAPI.EnableTextSelection = function() {
		function ats(){
			var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
			jQuery('head').append(jQuery('<style />').html(styles));
			var allowNormal=function(){ return true; };
			jQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv').unbind('contextmenu').unbind('selectstart').unbind('dragstart').unbind('mousedown').unbind('mouseup').unbind('click').attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal).attr('ondragstart',allowNormal);
		}
		function atswp(){
			if(window.jQuery){
			  ats();
			}
			else{
			  window.setTimeout(atswp,100);
			}
		}
		if(window.jQuery){
			ats();
		} else {
			var s=document.createElement('script');
			s.setAttribute('src','http://code.jquery.com/jquery-1.9.1.min.js');
			document.getElementsByTagName('body')[0].appendChild(s);
			atswp();
		}
		//BetterAPI.isNumber("string");
		BetterAPI.isNumber = function(string) {
			return /^\d+$/.test(string);
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
				break;
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
		if((match != "") && (/^\d+$/.test(match))) {
			match = ""+match;
			if( ( match.length > 16 ) || ( match.length < 18 ) ) {
				BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "UID of \""+nick+"\" is \""+match+"\" with a length of "+match.length+" chars.");
				return match;
			} else {
				return null;
			}
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
	// BetterAPI.getUserAvatarID(id);
	BetterAPI.getUserAvatarID = function(id) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var url = $(this).css("background-image");
			if(id == url.match(/\d+/)) {
				match = url.split("/").pop(-1).slice(0, -5);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){ 
				var url = $(this).css("background-image");
				if(id == url.match(/\d+/)) {
					match = url.split("/").pop(-1).slice(0, -5);
					return false;
				}        
			});
		}
		return match;
	}
	// BetterAPI.getUserAvatarURL(id);
	BetterAPI.getUserAvatarURL = function(id) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var url = $(this).css("background-image");
			if(id == url.match(/\d+/)) {
				match = url.substring(4, url.length - 1);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){ 
				var url = $(this).css("background-image");
				if(id == url.match(/\d+/)) {
					match = url.substring(4, url.length - 1);
					return false;
				}        
			});
		}
		return match;
	}
	// BetterAPI.getCurrentChannelName();
	BetterAPI.getCurrentChannelName = function() {
		return $(".active .channel-name").text()
	}
	// BetterAPI.getCurrentServerName();
	BetterAPI.getCurrentServerName = function() {
		return $(document).find("[data-reactid='.0.1.1.0.1.0.0.0.0']").text();
	}
	// BetterAPI.addUserLabel("divID", "label", "<html>");
	BetterAPI.addUserLabel = function(divID, label, html) {
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
	// BetterAPI.addUserLink(divID, id1, href1, text1, [id2, href2, text2]);
	BetterAPI.addUserLink = function(divID, id1, href1, text1, id2, href2, text2) {
        var divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			if (id2 == "0" || href2 == "0" || text2 == "0") {
				$('.user-popout-options').append(''+
				'<div id="'+divID+'" style="font-size:x-small;padding-top:5px;">'+
				'<a href="'+href1+'" id="'+id1+'">'+text1+'</a>');
			} else {
				$('.user-popout-options').append(''+
				'<div id="'+divID+'" style="font-size:x-small;padding-top:5px;">'+
				'<a href="'+href1+'" id="'+id1+'">'+text1+'</a>'+
				'<a href="'+href2+'" id="'+id2+'" style="float:right">'+text2+'</a></div>');
			}
		}
	};
	// BetterAPI.addUserButton("btn", "divID", "text");
	BetterAPI.addUserButton = function(type, divID, text) {
        var divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {$('.user-popout-options').append('<button class="'+type+'" id="'+divID+'">'+text+'</button>');}
	};
	// BetterAPI.addSettingsTab("btn", "divID", "text");
	// BetterAPI.addSettingsTab = function(type, id, title, text) {
		// BetterAPI.settingsButton = null;
		// BetterAPI.settingsPanel = null;
		// BetterAPI.prototype.settings_changeTab = function(tab) {
			// BetterAPI.settings_lastTab = tab;
			// var controlGroups = $("#se-control-groups");
			// $(".se-tab").removeClass("selected");
			// $(".se-pane").hide();
			// $("#" + tab).addClass("selected");
			// $("#" + tab.replace("tab", "pane")).show();
			// switch (tab) {
				// case "se-settings-tab":
					// break;
			// }
		// };
		// BetterAPI.settings_updateSetting = function(checkbox) {
			// var cb = $(checkbox).children().find('input[type="checkbox"]');
			// var enabled = !cb.is(":checked");
			// var id = cb.attr("id");
			// cb.prop("checked", enabled);
			// BetterAPI.settings[id] = enabled;
			// BetterAPI.prototype.saveSettings()
			// 
		// }
		// BetterAPI.settings_construct = function() {
			// BetterAPI.settingsPanel = $("<div/>", {
				// id: "se-pane",
				// class: "settings-inner",
				// css: {
					// "display": "none"
				// }
			// });
			// var settingsInner = '' +
				// '<div class="scroller-wrap">' +
				// '   <div class="scroller settings-wrapper settings-panel">' +
				// '       <div class="tab-bar TOP">' +
				// '           <div class="tab-bar-item se-tab" id="se-settings-tab" onclick="BetterAPI.prototype.settings_changeTab(\'se-settings-tab\');">Settings</div>' +
				// '       </div>' +
				// '       <div class="se-settings">' +
				// '' +
				// '               <div class="se-pane control-group" id="se-settings-pane" style="display:none;">' +
				// '                   <ul class="checkbox-group">';
			// for (var setting in BetterAPI.settingsArray) {
				// var sett = BetterAPI.settingsArray[setting];
				// var id = sett["id"];
				// if (sett["implemented"]) {
					// settingsInner += '' +
						// '<li>' +
						// '<div class="checkbox" onclick="BetterAPI.settings_updateSetting(this);" >' +
						// '<div class="checkbox-inner">' +
						// '<input type="checkbox" id="' + id + '" ' + (BetterAPI.settings[id] ? "checked" : "") + '>' +
						// '<span></span>' +
						// '</div>' +
						// '<span>' + setting + " - " + sett["info"] +
						// '</span>' +
						// '</div>' +
						// '</li>';
				// }
			// }
			// settingsInner += '</ul>' +
				// '               </div>' +
				// ' </div>' +
				// ' </div>' +
				// '</div>'
			// function show_Settings() {
				// $(".tab-bar-item").removeClass("selected");
				// BetterAPI.settingsButton.addClass("selected");
				// $(".form .settings-right .settings-inner").hide();
				// BetterAPI.settingsPanel.show();
				// if (BetterAPI.settings_lastTab == "") {
					// BetterAPI.prototype.settings_changeTab("se-settings-tab");
				// } else {
					// BetterAPI.prototype.settings_changeTab(BetterAPI.settings_lastTab);
				// }
			// }
			// BetterAPI.settingsButton = $("<div/>", {
				// class: "tab-bar-item",
				// text: "Skype-Emos",
				// id: "se-settings-new",
				// click: function() {
					// setTimeout(show_Settings, 100);
				// }
			// });
			// BetterAPI.settingsPanel.html(settingsInner);
			// function defer() {
				// if ($(".btn.btn-settings").length < 1) {
					// setTimeout(defer, 100);
				// } else {
					// $(".btn.btn-settings").first().on("click", function() {
						// function innerDefer() {
							// if ($(".modal-inner").first().is(":visible")) {
								// BetterAPI.settingsPanel.hide();
								// var tabBar = $(".tab-bar.SIDE").first();
								// $(".tab-bar.SIDE .tab-bar-item:not(#bd-settings-new)").click(function() {
									// $(".form .settings-right .settings-inner").first().show();
									// $("#se-settings-new").removeClass("selected");
									// BetterAPI.settingsPanel.hide();
								// });
								// $(".tab-bar.SIDE .tab-bar-item#bd-settings-new").click(function() {
									// $("#se-settings-new").removeClass("selected");
									// BetterAPI.settingsPanel.hide();
								// });
								// tabBar.append(BetterAPI.settingsButton);
								// $(".form .settings-right .settings-inner").last().after(BetterAPI.settingsPanel)
								// $("#se-settings-new").removeClass("selected");
							// } else {
								// setTimeout(innerDefer, 100);
							// }
						// }
						// innerDefer();
					// });
				// }
			// }
			// defer();
		// };
		// BetterAPI.settingsArray = {
		// "Enable Skype Emotes in Messages": {
			// "id": "emote-enable",
			// "info": "Enable Message Parsing",
			// "default": true,
			// "implemented": true
		// },
		// "Show Skype Emo list": {
			// "id": "emote-list",
			// "info": "Shows the Skype Emo list",
			// "default": true,
			// "implemented": false
		// },
		// "Show Emo Names": {
			// "id": "emote-tooltip",
			// "info": "Shows the Emo Names",
			// "default": true,
			// "implemented": false
		// },
	// };
// }
	// BetterAPI.changeUserInfo("email", "password", "nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
	BetterAPI.changeUserInfo = function(email, password, nickname, avatar) {
		$.ajax({
		method:"patch",
		url:"https://discordapp.com/api/users/@me",
		headers: {authorization: localStorage.token.match(/\"(.+)\"/)[1]},
		data:{
				"avatar": avatar,
				"email": email,
				"password": password,
				"username": nickname
			}
		})
	};
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