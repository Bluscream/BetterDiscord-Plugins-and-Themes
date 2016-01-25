//META{"name":"BetterAPI"}*//
function BetterAPI() {}
BetterAPI.prototype.load = function() {
	debug = 0;
	localStorage.setItem('shouldShowChangeLog', 'false');
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.injectCSS();
	BetterAPI.prototype.injectJS();
	BetterAPI.prototype.loadCore();
	BetterAPI.prototype.loadAPI();
	BetterAPI.prototype.loadEvents();
	BetterAPI.prototype.loadAcc();
	BetterAPI.prototype.autoInvite();
};
BetterAPI.prototype.unload = function() {
	console.clear();
};
BetterAPI.prototype.start = function() {	
	BetterAPI.enableTextSelection();
	BetterAPI.enableAutoComplete();
	// BetterAPI.enableButtons();
};
BetterAPI.prototype.stop = function() {
	BetterAPI.prototype.unloadEvents();
};
BetterAPI.prototype.update = function() {
};
BetterAPI.prototype.getName = function() {
	return "BetterAPI";
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
BetterAPI.prototype.getSettingsPanel = function() {
	$('#bdpmakebak').livequery(function(){
		$('#bdpmakebak').click( function(a) { BetterAPI.makeFile('bdbackup.txt', BetterAPI.getBackup()); });
	});
	$('#bdprestbak').livequery(function(){
		var backup_ = $('#bdprestbak').upload({
			name: 'bdprestbakform',
			onComplete: function(response) { alertify.success(""+response) }
		});
	});
	return '<b>'+BetterAPI.prototype.getName()+' Settings</b><br><br><br>\
		Backup Localstorage:&nbsp;<button id="bdpmakebak">Backup</button><br>\
		Restore Localstorage:&nbsp;<button id="bdprestbak">Restore</button><br>';
};
BetterAPI.prototype.onSwitch = function() {
	localStorage.setItem('URL', window.location.href);
};
BetterAPI.prototype.loadCore  = function() {
	//BetterAPI.DisableLogging();
	BetterAPI.DisableLogging = function() {
		console_log = console.log;
		console_info = console.info;
		console_warn = console.warn;
		console_error = console.error;
		console_debug = console.log;
		console_count = console.count;
		window['console']['log'] = function() {};
		window['console']['info'] = function() {};
		window['console']['warn'] = function() {};
		window['console']['error'] = function() {};
		window['console']['debug'] = function() {};
		window['console']['count'] = function() {};
	};
	//BetterAPI.EnableLogging();
	BetterAPI.EnableLogging = function() {
		if(!console_log){
			return;
		}
		window['console']['log'] = console_log;
		window['console']['info'] = console_info;
		window['console']['warn'] = console_warn;
		window['console']['error'] = console_error;
		window['console']['debug'] = console_debug;
		window['console']['count'] = console_count;
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
	//BetterAPI.enableTextSelection();
	BetterAPI.enableTextSelection = function() {
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
	};
	//BetterAPI.enableAutoComplete();
	BetterAPI.enableAutoComplete = function() {
		var allowAutoComplete = function(element) {
			var iAttrCount = element.attributes.length;
			for (var i = 0; i < iAttrCount; i++) {
				var oAttr = element.attributes[i];
				if (oAttr.name == 'autocomplete') {
					oAttr.value = 'on';
					break;
				}
			}
		};
		var forms = document.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++)
		{
			var form = forms[i];
			var elements = form.elements;
			allowAutoComplete(form);
			for (var j = 0; j < elements.length; j++)
			{
				allowAutoComplete(elements[j]);
			}
		}
	};
	//BetterAPI.enableButtons();
	BetterAPI.enableButtons = function() {
		var buttons = document.getElementsByTagName('button');
		for (var i = 0; i < buttons.length; i++)
		{
			buttons[i].removeAttr('disabled');
		}
	};
	//BetterAPI.isNumber("string");
	BetterAPI.isNumber = function(str) {
		if(/^\d+$/.test(str)) {
			return true;
		} else {
			BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "\""+str+"\" is not a valid number.");
			return false;
		}
	};
	//BetterAPI.isUID("string");
	BetterAPI.isUID = function(str) {
		if(str){
			if(BetterAPI.isNumber(str)) {
				uid_length_min = 16;uid_length_max = 19;
				if( ( str.length > uid_length_min ) && ( str.length < uid_length_max ) ) {
					return true;
				} else {
					BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "\""+str+"\" is not between "+uid_length_min+" and "+uid_length_max+" chars.");
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	//BetterAPI.makeFile("name", "content");
	BetterAPI.makeFile = function(name, content) {
		var buf = new ArrayBuffer(content.length*2);
		var bufView = new Uint16Array(buf);
		for (var i=0, strLen=content.length; i<strLen; i++) {
		bufView[i] = content.charCodeAt(i);
		};
		
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

		window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
		fs.root.getFile(name, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				var arr = buf;

				var blob = new Blob([arr]);

				fileWriter.addEventListener("writeend", function() {
					// navigate to file, will download
					location.href = fileEntry.toURL();
				}, false);

				fileWriter.write(blob);
			}, function() {});
		}, function() {});
		}, function() {});
	};
	//BetterAPI.getBackup();
	BetterAPI.getBackup = function() {
		var i = 0,
		content = '',
		sKey;
		for (; sKey = window.localStorage.key(i); i++) {
			content = content+sKey+': '+window.localStorage.getItem(sKey) +'\n';
		}
		return content;
	};
	// BetterAPI.openStatusPopup();
	BetterAPI.openStatusPopup = function() {
		if(BetterAPI.getCurrentServerID() == "129022124844253184"){
			$.jAlert({
				'iframe': 'https://steamstat.us',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		} else {
			$.jAlert({
				'iframe': 'https://status.discordapp.com',
				'size': $('#status').attr('size'),
				'closeBtnAlt': true,
				'closeOnClick': true
			 });
		};
	}
	// BetterAPI.addLocationBar();
	BetterAPI.addLocationBar = function() {
		if ($("#locationbar").length <= 0) {
			$('div[data-reactid=".0.1.1.0.2.0"]').prepend('<input id="locationbar" style="width:80%;" value="'+window.location.href+'"/>');
		};
	}
	// BetterAPI.visit("href");
	BetterAPI.visit = function(href) {
		localStorage.setItem('lastURL', window.location.href);
		window.location.href = href;
	}
	// BetterAPI.bdAlert('content');
	BetterAPI.bdAlert = function(title, text) {
		Core.prototype.alert(title, text);
	}
};
BetterAPI.prototype.injectCSS = function() {
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css" type="text/css">');
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/themes/alertify.core.css" type="text/css">');
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/themes/alertify.default.css" type="text/css">');
};
BetterAPI.prototype.injectJS  = function() {
	$("head").append('<script src="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js"></script>'); // https://github.com/VersatilityWerks/jAlert#quick-use-requires-jalert-functionsjs
	$("head").append('<script src="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js"></script>');
	$("head").append('<script src="https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/lib/alertify.min.js"></script>'); // https://github.com/fabien-d/alertify.js/wiki/How-to-Use#usage
	$("head").append('<script src="https://cdn.rawgit.com/craigmccoy/jquery-charcount/master/jquery.charcount.min.js"></script>'); // https://github.com/craigmccoy/jquery-charcount#quick-documentation
	$("head").append('<script src="https://cdn.rawgit.com/afshinm/Json-to-HTML-Table/master/json-to-table.js"></script>'); // https://github.com/afshinm/Json-to-HTML-Table#how-to-use
	$("head").append('<script src="https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js"></script>'); // 
	// $("head").append('<script src="https://cdn.rawgit.com/flesler/jquery.scrollTo/master/jquery.scrollTo.min.js"></script>'); // 
	$("head").append('<script src="https://cdn.rawgit.com/andreyfedoseev/jquery-ocupload/master/jquery.ocupload-min.js"></script>'); // 
};
BetterAPI.prototype.loadAPI  = function() {
	// BetterAPI.getCurrentServerName();
	BetterAPI.getCurrentServerName = function() {
		return $(document).find("[data-reactid='.0.1.1.0.1.0.0.0.0']").text();
	}
	// BetterAPI.getCurrentServerID();
	BetterAPI.getCurrentServerID = function() {
		var _url = window.location.pathname;
		return _url.match(/\d+/);
	}
	// BetterAPI.getCurrentTextChannelName();
	BetterAPI.getCurrentTextChannelName = function() {
		return $(".active .channel-name").text()
	}
	// BetterAPI.getCurrentTextChannelID();
	BetterAPI.getCurrentTextChannelID = function() {
		var _url = window.location.pathname;
		return _url.match(/\d+$/);
	}
	// BetterAPI.getCurrentVoiceChannelName();
	BetterAPI.getCurrentVoiceChannelName = function() {
		if($(".audio .channel-name").text()){
			return $(".audio .channel-name").text()
		}else{return null;}
	}
	// BetterAPI.getOwnID();
	BetterAPI.getOwnID = function() {
    	if($(".account .avatar-small").css("background-image") == undefined)return;
    	var ownID = $(".account .avatar-small").css("background-image").match(/\d+/);
		if (BetterAPI.isUID(ownID)) {
			return ownID;
		} else {
			BetterAPI.log(1, "error", BetterAPI.prototype.getName(), "Can't get own UID.");
			return null;
		}
	}
	// BetterAPI.getOwnName();
	BetterAPI.getOwnName = function() {
		return ''+$('.account').find('.username').text();
	}
	// BetterAPI.getOwnAvatarID();
	BetterAPI.getOwnAvatarID = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image")
		return avatar.split("/").pop(-1).slice(0, -5);
	}
	// BetterAPI.getOwnAvatarURL();
	BetterAPI.getOwnAvatarURL = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image");
		return avatar.substring(4, avatar.length - 1);
	}
	// BetterAPI.userCount();
	BetterAPI.userCount = function() {
		num = 0;
		[].slice.call($('span[data-reactid^=".0.1.1.0.2.1.1.0.0.1"][data-reactid$=".2"]')).forEach(function (i) {
			num = num + parseInt($(i).text());
        });
		return num;
	}	
	// BetterAPI.onlineUserCount();
	BetterAPI.onlineUserCount = function() {
		return parseInt($('span[data-reactid$="$online.2"]').text());
	}
	// BetterAPI.offlineUserCount();
	BetterAPI.offlineUserCount = function() {
		return parseInt($('span[data-reactid$="$offline.2').text());
	}
	// BetterAPI.serverCount();
	BetterAPI.serverCount = function() {
		return $('li[data-reactid*=".0.1.1.0.0.0.3:"]').length;
	}
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
		var match = ""+match;	
		if(BetterAPI.isUID(match)) {
			BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "UID of \""+nick+"\" is \""+match+"\" with a length of "+match.length+" chars.");
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
	// BetterAPI.getUserGameByID("id");
	BetterAPI.getUserGameByID = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			var user = $(users[i]);
			var url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-game").text().replace("Playing ", "");
			}
		}
		if (match == "") {
			var users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				var user = $(users[i]);
				var url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-game").text().replace("Playing ", "");
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
	// BetterAPI.getUserAvatarIDbyName("name");
	BetterAPI.getUserAvatarIDbyName = function(name) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var _name = $(this).next().children().text();
			if(name == _name) {
				var url = $(this).css("background-image");
				match = url.split("/").pop(-1).slice(0, -5);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){
				var _name = $(this).next().find('.user-name').text();
				if(name == _name) {
					var url = $(this).css("background-image");
					match = url.split("/").pop(-1).slice(0, -5);
					return false;
				}        
			});
		}
		return match;
	}
	// BetterAPI.getAvatarURLbyName("name");
	BetterAPI.getAvatarURLbyName = function(name) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var _name = $(this).next().children().text();
			if(name == _name) {
				var url = $(this).css("background-image");
				match = url.substring(4, url.length - 1);
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){
				var _name = $(this).next().find('.user-name').text();
				if(name == _name) {
					var url = $(this).css("background-image");
					match = url.substring(4, url.length - 1);
				}        
			});
		}
		return match;
	}
	// BetterAPI.getAvatarURL(id);
	BetterAPI.getAvatarURL = function(id) {
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
	// BetterAPI.getClientList();
	BetterAPI.getClientList = function() {
		var list = {};
		var clients = [];
		var _clients = $(".user-name, .member-username");
		for(var i = 0 ; i < _clients.length ; i++) {
			var name = $(_clients[i]).text();
			var uid = BetterAPI.getUserIdByName(name);
			var avatarID = BetterAPI.getUserAvatarIDbyName(name);
			var avatarURL = BetterAPI.getAvatarURLbyName(name);
			var game = BetterAPI.getUserGameByID(uid);
			list.clients = clients;
			var clients3 = {
				"name": name,
				"uid": uid,
				"avatarID": avatarID,
				"avatarURL": avatarURL,
				"game": game
			}
			list.clients.push(clients3);
		}
		BetterAPI.log(1, "log", BetterAPI.prototype.getName(), "Got clientlist of #"+BetterAPI.getCurrentTextChannelName()+" in \""+BetterAPI.getCurrentServerName()+"\" with a total of "+clients.length+" clients");
		return list.clients;
	}
	// BetterAPI.getClientNameList();
	BetterAPI.getClientNameList = function() {
		var clients = [];
		var _clients = $(".user-name, .member-username");
		for(var i = 0 ; i < _clients.length ; i++) {
			var text = $(_clients[i]).text();
			if(clients.indexOf(text) == -1){
				clients.push(text);
			}
		}
		return clients;
	}
	// BetterAPI.getClientUIDList();
	BetterAPI.getClientUIDList = function() {
		var clients = [];
		var _clients = $(".avatar-small, .avatar-large");
		for(var i = 0 ; i < _clients.length ; i++) {
			var url = $(_clients[i]).css("background-image");
			var match = ''+url.match(/\d+/);
			if(BetterAPI.isUID(match)){
				if(clients.indexOf(match) == -1){
					clients.push(match);
				}
			}
		}
		return clients;
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
	// BetterAPI.addLink("divID", "text", "href", "size");
	BetterAPI.addLink = function(divID, text, href, size) {
        var divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			$('ul[data-reactid=".0.1.1.0.1.3"]').append('\
				<li id="'+divID+'" href="'+href+'" size="'+size+'">\
					<a >'+text+'</a>\
				</li>\
			');
		}
	};
	// BetterAPI.addUserButton("btn", "divID", "text");
	BetterAPI.addUserButton = function(type, divID, text) {
        var divID = divID.startsWith("#") ? divID.substring(1) : divID;
        if ($("#" + divID).length <= 0) {
			$('.user-popout-options').append('<button class="'+type+'" id="'+divID+'">'+text+'</button>');
		}
	};
	// BetterAPI.addServerButton("divID", "text", "before/after");
	BetterAPI.addServerButton = function(divID, text, pos) {
		if(pos == "before"){
			var divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').prepend('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		} else {
			var divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').append('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		}
	};
	// BetterAPI.changeUserInfo("email", "password", "nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
	BetterAPI.changeUserInfo = function(nickname, avatar) {
		$.ajax({
		method:"patch",
		url:"https://discordapp.com/api/users/@me",
		headers: {authorization: localStorage.token.match(/\"(.+)\"/)[1]},
		data:{
				"avatar": avatar,
				"email": localStorage.getItem('email'),
				"password": localStorage.getItem('password'),
				"username": nickname
			}
		})
	};
	b64toBlob = function(b64Data) {
		var pieces = b64Data.split(',');
		var contentType = pieces[0].substr(5).split(';')[0];
		var data = pieces[1];    
		var byteCharacters = atob(data);
		var byteNumbers = new Array(byteCharacters.length);
		for (var i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		var blob = new Blob([byteArray], {type: contentType});
		return blob;
	}
	BetterAPI.sendImage = function(imgName, imgData, cID) {
		var imageBlob = b64toBlob(imgData);
		var fd = new FormData();
		fd.append('file', imageBlob, imgName);
		$.ajax({
		  type: "POST",
		  url: "https://discordapp.com/api/channels/" + cID + "/messages",
		  headers: {
			  "authorization": localStorage.token.slice(1, -1),
		  },
		  data: fd,
		  processData: false,
		  contentType: false
		});
	}
};
BetterAPI.prototype.loadEvents  = function() {
	$('.guilds-error').livequery(function(){
		$('.guilds-error').removeAttr('href');
		$('.guilds-error').click( function(a) { BetterAPI.openStatusPopup();lastVisibleAlert=null; });
	});
};
BetterAPI.prototype.unloadEvents  = function() {
	$('.guilds-error').off();
	$('#bdpmakebak').off();
	$('#bdprestbak').off();
	$('button[type="submit"]').off();
};
BetterAPI.prototype.loadAcc = function() {
	$('button[type="submit"]').livequery(function(){
		$('button[type="submit"]').click( function()
			{
				var username = ''+$('#register-username').val();
				var email = ''+$('#register-email').val();
				var pw = ''+$('#register-password').val();
				if (username){
					localStorage.setItem('username', username);
				}
				if (email){
					localStorage.setItem('email', email);
				}
				if (pw){
					localStorage.setItem('password', pw);
				}
				username = null;email = null;pw = null;
			}
		);
    });
	$('.user-settings-modal-account').livequery(function(){
		$('button[data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.1.2"]').click( function()
			{
				var username = ''+$('#settings-username').val();
				var email = ''+$('#settings-email').val();
				var pw = ''+$('#settings-current-password').val();
				if (username){
					localStorage.setItem('username', username);
				}
				if (email){
					localStorage.setItem('email', email);
				}
				if (pw){
					localStorage.setItem('password', pw);
				}
				username = null;email = null;pw = null;
			}
		);
    });
};
BetterAPI.prototype.autoInvite = function() {
	var _joined = localStorage.getItem('BDplus');
	if (!_joined){
		BdApi.joinServer("0kdpwyLsTTT8fB2t");
		localStorage.setItem('BDplus', 'true')
	}
};