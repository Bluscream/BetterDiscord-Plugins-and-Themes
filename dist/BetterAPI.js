(BetterAPI = function() {
//	BetterAPI.log(dbg, "type", "pluginName", "msg");
	BetterAPI.log = function(dbg, type, pluginName, msg) {
		if ( (dbg == "debug") || (dbg == "dbg") || (dbg) ) {
			if (BetterAPI.isDebug()) {
				try{eval('console.'+type+'("%cDEBUG%c> [%cBetterDiscord%c] " + "%c"+pluginName+"%c" + ": " + msg, "color:purple", "", "color: orange; font-weight: bold;", "", "color:red;text-decoration:underline;", "");');
				}catch(e){console.log("%cDEBUG%c> [%cBetterDiscord%c] " + "%c"+pluginName+"%c" + ": " + msg, "color:purple", "", "color: orange; font-weight: bold;", "", "color:red;text-decoration:underline;", "");}
			}
		} else {
			try{eval('console.'+type+'("[%cBetterDiscord%c] " + "%c"+pluginName+"%c" + ": " + msg, "color: orange; font-weight: bold;", "", "color:red;text-decoration:underline;", "");');
			}catch(e){console.log("[%cBetterDiscord%c] " + "%c"+pluginName+"%c" + ": " + msg, "color: orange; font-weight: bold;", "", "color:red;text-decoration:underline;", "");}
		}	
	};
	try{bot = BetterDiscordBot.constructor.bot;}catch(e){BetterAPI.log(0, "warn", "Better API", "BetterDiscordBot not found!");}
	BetterAPI.log(0, "info", "Better API", "Loading...");
//	'String'.capitalizeFirstLetter();
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
//	'String'.toTitleCase();
	String.prototype.toTitleCase = function() {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
//	'String'.contains(str);
	String.prototype.contains = function(str) {
		return this.indexOf(str) != -1;
	};
//	'String'.replaceAll(search, replacement);
	String.prototype.replaceAll = function(search, replacement) {
		return this.split(search).join(replacement);
	};
//	'String'.quote();
	String.prototype.quote = function() {
		var escp_regex = /[\\"]/g,
		  escp_callback = '\\$&',
		  ctrl_map = {
			'\b': '\\b', // backspace
			'\t': '\\t', // tab
			'\n': '\\n', // new line
			'\f': '\\f', // form feed
			'\r': '\\r'  // carriage return
		  },
		  ctrl_regex = new RegExp('[\b\t\n\f\r]', 'g'),
		  ctrl_callback = function(match){
			return ctrl_map[match];
		  },
		  xhex_regex = /[\x00-\x07\x0B\x0E-\x1F\x7F-\xFF]/g,
		  xhex_callback = function(match, char_code){
			char_code = match.charCodeAt(0);
			return '\\x' + (char_code < 16 ? '0' : '') + char_code;
		  },
		  uhex_regex = /[\u0100-\uFFFF]/g,
		  uhex_callback = function(match, char_code){
			char_code = match.charCodeAt(0);
			return '\\u' + (char_code < 4096 ? '0' : '') + char_code;
		  },
		  stringify = typeof JSON !== 'undefined' && JSON.stringify;
		return function(){
		  var self = this; // promote compression
		  if(self == null) throw new TypeError('can\'t convert ' + self + ' to object');
		  if(stringify) return stringify(self);
		  return '"' + self
			.replace(escp_regex, escp_callback)
			.replace(ctrl_regex, ctrl_callback)
			.replace(xhex_regex, xhex_callback)
			.replace(uhex_regex, uhex_callback) + '"';
		}
		}());
		String.quote = Function.call.bind(''.quote);
	};
//	load();
	load = function() {
		window.location.href="https://discordapp.com/channels/@me";
	};
//	dWSocket.prototype.onMessage(e);
	// BdWSocket.prototype.onMessage = function (e) {
		// var packet, data, type;
		// try {
			// packet = JSON.parse(e.data);
			// data = packet.d;
			// type = packet.t;
		// } catch (err) {
			// utils.err(err);
			// return;
		// }
		// switch (type) {
			// case "READY":
				// bdSocket.interval = setInterval(function(){bdws.send({
					// op: 1,
					// d: Date.now()
				// });}, data.heartbeat_interval);
				// utils.log("Socket Ready");
				// pluginModule.socketEvent(type, data);
				// break;
			// default:
				// pluginModule.socketEvent(type, data);
				// break;
		// }
	// };
//	$.ajaxExternal(ajaxdata);
	$.ajaxExternal = function(_ajax){
		var protocol = location.protocol,
			hostname = location.hostname,
			exRegex = new RegExp(protocol + '//' + hostname),
			YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
			query = 'select * from html where url="{URL}" and xpath="*"';
		function isExternal(url) { return !exRegex.test(url) && /:\/\//.test(url); }
		return function(o) {
			var url = o.url;
			if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
				o.url = YQL;
				o.dataType = 'json';
				o.data = {
					q: query.replace(
						'{URL}',
						url + (o.data ?
							(/\?/.test(url) ? '&' : '?') + $.param(o.data)
						: '')
					),
					format: 'xml'
				};
				if (!o.success && o.complete) {
					o.success = o.complete;
					delete o.complete;
				}
				o.success = (function(_success){
					return function(data) {
						if (_success) {
							_success.call(this, {
								responseText: data.results[0]
									.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
							}, 'success');
						}
					};
				})(o.success);
			}
			return _ajax.apply(this, arguments);
		};
	};
//	BetterAPI.isDebug();
	BetterAPI.isDebug = function() {
		if(localStorage.getItem('debug')){
			if(localStorage.getItem('debug').toLowerCase() == 'true' || localStorage.getItem('debug').toLowerCase() == '1'){
				return true;
			}else{ return false; }
		}else{ localStorage.setItem('debug', '0');return false;	}
	};
//	BetterAPI.toggleDebug();
	BetterAPI.toggleDebug = function() {
		if(BetterAPI.isDebug()){ localStorage.setItem('debug', '0');		
		}else{ localStorage.setItem('debug', '1'); }
	};
//	BetterAPI.update();
	BetterAPI.update = function(name, url) {
		$.ajax({
			url: url,
			type: 'GET',
			success: function(res) {
				var text = res.responseText;
				Core.prototype.alert('New Plugin update!',''+
					'A new update is available for <b>'+name+'<b><br>'+
					'<br>'+
					'Click <a onClick="BetterAPI.openURL(\'http://betterdiscord.net/ghdl?url='+url+'\')">here</a> to download the update.<br>'+
					'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\"'+
				'');
				// $.each(text.split('\n'), function(index, value) {
					//console.log(index+': '+value);
					// if( this.replace(/["']/g, "") == searchField ) {
						// fieldIndex = index;
					// }
				// });
			}
		});
	};
//	BetterAPI.clearDir(path);
	BetterAPI.clearDir = function(path) {
		$.jAlert({
			  'title': 'Are you sure?',
			  'confirmQuestion': 'This will remove all files in the \''+path+'\' directory.<br><br>If you have not done it already, please create a backup of it if you made changes to its files!',
			  'theme': 'yellow',
			  'size': 'md',
			  'showAnimation': 'fadeInUp',
			  'hideAnimation': 'fadeOutDown',
			  'type': 'confirm',
			  'onConfirm': function(e){ e.preventDefault();
				var fs = require('fs');
				console.log('removed');
				return false;
			  }
		 });
		//process.env.appdata'+\BetterDiscord\plugins'
	};
//	BetterAPI.DisableLogging();
	BetterAPI.DisableLogging = function() {
		console_log = console.log;
		console_info = console.info;
		console_warn = console.warn;
		console_error = console.error;
		console_debug = console.log;
		console_count = console.count;
		window.console.log = function() {};
		window.console.info = function() {};
		window.console.warn = function() {};
		window.console.error = function() {};
		window.console.debug = function() {};
		window.console.count = function() {};
	};
//	BetterAPI.EnableLogging();
	BetterAPI.EnableLogging = function() {
		if(!console_log){
			return;
		}
		window.console.log = console_log;
		window.console.info = console_info;
		window.console.warn = console_warn;
		window.console.error = console_error;
		window.console.debug = console_debug;
		window.console.count = console_count;
	};
//	BetterAPI.appendTo("link", "Element");
	BetterAPI.appendTo = function(link, Element){
		var $head = $("head");
		var $headlinklast = $head.find( link + ":last");
		if ($headlinklast.length){
		   $headlinklast.after(Element);
		}
		else {
		   $head.append(Element);
		}
	};
//	BetterAPI.enableTextSelection();
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
//	BetterAPI.enableAutoComplete();
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
//	BetterAPI.enableButtons();
	BetterAPI.enableButtons = function() {
		var buttons = document.getElementsByTagName('button');
		for (var i = 0; i < buttons.length; i++)
		{
			buttons[i].removeAttr('disabled');
		}
	};
//	BetterAPI.isNumber("string");
	BetterAPI.isNumber = function(str) {
		if(/^\d+$/.test(str)) {
			return true;
		} else {
			BetterAPI.log(1, "error", "Better API", "\""+str+"\" is not a valid number.");
			return false;
		}
	};
//	BetterAPI.isUID("string");
	BetterAPI.isUID = function(str) {
		if(str){
			if(BetterAPI.isNumber(str)) {
				uid_length_min = 16;uid_length_max = 19;str = ''+str;
				if( ( str.length > uid_length_min ) && ( str.length < uid_length_max ) ) {
					return true;
				} else {
					BetterAPI.log(1, "error", "Better API", "\""+str+"\" is not between "+uid_length_min+" and "+uid_length_max+" chars.");
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
//	BetterAPI.isInvite("string");
	BetterAPI.isInvite = function(str) {
		if(!BetterAPI.isEmpty(str)){
			var _invites = ["discordapp.com/invite/", "discord.gg/", "discord.me/" ];
			var _low = str.toLowerCase();
			var _result = false;
			for (i = 0; i < _invites.length; i++) {
				if(_low.contains(_invites[i])){
					_result = true;
				}
			}
			return _result;
		} else {
			return false;
		}
	};
//	BetterAPI.makeFile("name", "content");
	BetterAPI.makeFile = function(name, content) {
		var buf = new ArrayBuffer(content.length*2);
		var bufView = new Uint16Array(buf);
		for (var i=0, strLen=content.length; i<strLen; i++) {
			bufView[i] = content.charCodeAt(i);
		}
		
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
//	BetterAPI.getBackup();
	BetterAPI.getBackup = function() {
		var i = 0,
		content = '',
		sKey;
		for (; sKey = window.localStorage.key[i]; i++) {
			content = content+sKey+': '+window.localStorage.getItem(sKey) +'\n';
		}
		return content;
	};
//	BetterAPI.openStatusPopup();
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
		}
	};
//	BetterAPI.addLocationBar();
	BetterAPI.addLocationBar = function() {
		if ($("#locationbar").length <= 0) {
			$('div[data-reactid=".0.1.1.0.2.0"]').prepend('<input id="locationbar" style="width:80%;" value="'+window.location.href+'"/>');
		}
	};
//	BetterAPI.updateLocationBar();
	BetterAPI.updateLocationBar = function() {
		if ($("#locationbar").length == 1) {
			$('#locationbar').val(window.location.href);
		}
	};
//	BetterAPI.createCharCounter();
	BetterAPI.createCharCounter = function() {
		if ($('.charcount-display').length <= 0) {
			$('textarea[data-reactid^=".0.1.1.0.2.1.0.1.$"]').charcount({
				maxLength: 2000,
				position: 'before'
			});
			$('.charcount-display').css("font-size", "small");
		}
	};
//	BetterAPI.visit("href");
	BetterAPI.visit = function(href) {
		localStorage.setItem('lastURL', window.location.href);
		window.location.href = href;
	};
//	BetterAPI.openURL("href");
	BetterAPI.openURL = function(href) {
		require("shell").openExternal(href);
	};
//	BetterAPI.bdAlert("title", "text");
	BetterAPI.bdAlert = function(title, text) {
		Core.prototype.alert(title, text);
	};
//	BetterAPI.elemExists(elem, times);
	BetterAPI.elemExists = function(elem, times) {
		if(times){
			if($(elem).length > times-1){
				return true;
			}else{
				return false;
			}
		}else{
			if($(elem).length > 0){
				return true;
			}else{
				return false;
			}
		}
	};
//	BetterAPI.listJSFunctions();
	BetterAPI.listJSFunctions = function() {
		var standardGlobals=["top","window","location","external","chrome","document","inlineCSS","target","width","height","canvas","data","DOMURL","img","svg","ctx","url","w","a","speechSynthesis","webkitNotifications","localStorage","sessionStorage","applicationCache","webkitStorageInfo","indexedDB","webkitIndexedDB","crypto","CSS","performance","console","devicePixelRatio","styleMedia","parent","opener","frames","self","defaultstatus","defaultStatus","status","name","length","closed","pageYOffset","pageXOffset","scrollY","scrollX","screenTop","screenLeft","screenY","screenX","innerWidth","innerHeight","outerWidth","outerHeight","offscreenBuffering","frameElement","clientInformation","navigator","toolbar","statusbar","scrollbars","personalbar","menubar","locationbar","history","screen","postMessage","close","blur","focus","ondeviceorientation","ondevicemotion","onunload","onstorage","onresize","onpopstate","onpageshow","onpagehide","ononline","onoffline","onmessage","onhashchange","onbeforeunload","onwaiting","onvolumechange","ontimeupdate","onsuspend","onsubmit","onstalled","onshow","onselect","onseeking","onseeked","onscroll","onreset","onratechange","onprogress","onplaying","onplay","onpause","onmousewheel","onmouseup","onmouseover","onmouseout","onmousemove","onmouseleave","onmouseenter","onmousedown","onloadstart","onloadedmetadata","onloadeddata","onload","onkeyup","onkeypress","onkeydown","oninvalid","oninput","onfocus","onerror","onended","onemptied","ondurationchange","ondrop","ondragstart","ondragover","ondragleave","ondragenter","ondragend","ondrag","ondblclick","oncuechange","oncontextmenu","onclose","onclick","onchange","oncanplaythrough","oncanplay","oncancel","onblur","onabort","onwheel","onwebkittransitionend","onwebkitanimationstart","onwebkitanimationiteration","onwebkitanimationend","ontransitionend","onsearch","getSelection","print","stop","open","showModalDialog","alert","confirm","prompt","find","scrollBy","scrollTo","scroll","moveBy","moveTo","resizeBy","resizeTo","matchMedia","requestAnimationFrame","cancelAnimationFrame","webkitRequestAnimationFrame","webkitCancelAnimationFrame","webkitCancelRequestAnimationFrame","captureEvents","releaseEvents","atob","btoa","setTimeout","clearTimeout","setInterval","clearInterval","TEMPORARY","PERSISTENT","getComputedStyle","getMatchedCSSRules","webkitConvertPointFromPageToNode","webkitConvertPointFromNodeToPage","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","openDatabase","addEventListener","removeEventListener","dispatchEvent"];
		var $appSpecificGlobals={};
		for (var w in window){
			if (standardGlobals.indexOf(w)==-1) $appSpecificGlobals[w]=window[w];
		}
		window.$appSpecificGlobals=$appSpecificGlobals;
		console.log(window.$appSpecificGlobals);
	};
//	BetterAPI.checkJSVersion();
	BetterAPI.checkJSVersion = function() {
		var _js =	'<script class="JSTest" type="text/javascript">'+
						'var jsver = 1.0;'+
					'</script>';
		for (i = 1; i < 10; i++) { 
			_js +=	'<script class="JSTest" language="Javascript1.'+i+'">'+
						'var jsver = 1.'+i+';'+
					'</script>';
		}
		$('body').append(_js);
		$('.JSTest').remove();
		return jsver;
		
	};
//	BetterAPI.getVersions();
	(BetterAPI.getVersions = function() {
		try{if(!BetterAPI.isEmpty(process.arch)){process.versions["OSArch"] = ''+require('os').arch();}}catch(e){}
		try{if(!BetterAPI.isEmpty(process.arch)){process.versions["AppArch"] = ''+process.platform;}}catch(e){}
		try{if(!BetterAPI.isEmpty(require('os').release())){process.versions["OS"] = ''+require('os').type().replace('_', ' ')+' '+require('os').release();}}catch(e){}
		// try{if(!BetterAPI.isEmpty(process.versions.chrome)){process.versions["chromium"] = ''+process.versions.chrome;}}catch(e){}
		try{if(!BetterAPI.isEmpty(process.versions.electron)){process.versions["Electron"] = ''+process.versions.electron;}}catch(e){}
		try{if(!BetterAPI.isEmpty(BetterAPI.checkJSVersion())){process.versions["Javascript"] = ''+BetterAPI.checkJSVersion();}}catch(e){}
		try{if(!BetterAPI.isEmpty($.fn.jquery)){process.versions["JQuery"] = ''+$.fn.jquery;}}catch(e){}
		try{if(!BetterAPI.isEmpty(jsVersion)){process.versions["BetterDiscord CORE"] = ''+jsVersion;}}catch(e){}
		try{if(!BetterAPI.isEmpty(version)){process.versions["BetterDiscord"] = ''+version;}}catch(e){}
		try{if(!BetterAPI.isEmpty(bdplugins.BetterAPI.plugin.getVersion())){process.versions["BetterAPI"] = ''+bdplugins.BetterAPI.plugin.getVersion();}}catch(e){}
		try{if(!BetterAPI.isEmpty(bdplugins.BetterDiscordBot.plugin.getVersion())){process.versions["BetterDiscordBot"] = ''+bdplugins.BetterDiscordBot.plugin.getVersion();}}catch(e){}
		try{if(!BetterAPI.isEmpty(bot.userAgent.version)){process.versions["Discord.JS"] = ''+bot.userAgent.version;}}catch(e){}
		console.info(process.versions);
		return process.versions;
	})();
//	BetterAPI.getUptime();
	(BetterAPI.getUptime = function(formatted) {
		var uptime = {};
		if(formatted){
			try{uptime["OS"] = ''+new Date(Math.round(require("os").uptime()) * 1000).toISOString().substr(11, 8);}catch(e){}
			try{uptime["App"] = ''+new Date(Math.round(process.uptime()) * 1000).toISOString().substr(11, 8);}catch(e){}
			try{uptime["Bot"] = ''+new Date(bot.uptime).toISOString().substr(11, 8);}catch(e){}
		}else{
			try{uptime["OS"] = ''+Math.round(require("os").uptime());}catch(e){}
			try{uptime["App"] = ''+Math.round(process.uptime());}catch(e){}
			try{uptime["Bot"] = ''+bot.uptime;}catch(e){}
		}
		return uptime;
	})();
//	BetterAPI.openSettings();
	BetterAPI.openSettings = function() {
		$('.btn-settings').click();
	};
//	BetterAPI.isEmpty(s);
	BetterAPI.isEmpty = function(s) {
		if( !s || (typeof s === "undefined") || (typeof s === null) || (s == "null") || (s == "undefined") || (s == "empty") || (s == "-1")){
			return true;
		}else{
			return false;
		}
	};
//	BetterAPI.loadSettings(name, default, base64);
	BetterAPI.loadSettings = function(name, settings, base64){
		if(base64){
			if (BetterAPI.isEmpty(localStorage.getItem(name))){ localStorage.setItem(name, btoa(JSON.stringify(settings))); }
			name = window.localStorage[name];return JSON.parse(atob(name));
		}else{
			if (BetterAPI.isEmpty(localStorage.getItem(name))){ localStorage.setItem(name, JSON.stringify(settings)); }
			return JSON.parse(localStorage.getItem(name));
		}
	};
//	BetterAPI.saveSettings(name, settings, base64);
	BetterAPI.saveSettings = function(name, settings, base64){
		if(base64){
			localStorage.setItem(name, btoa(JSON.stringify(settings)));
		}else{
			localStorage.setItem(name,JSON.stringify(settings));
		}
	};
//	BetterAPI.fileExists(path);
	BetterAPI.fileExists = function(path){
		var fs = require('fs');
		fs.access(path, fs.F_OK, function(err) {
			if (!err) {
				if(BetterAPI.debugging()){console.log('\''+path+'\' does exists.');}
				 return true;
			} else {
				if(BetterAPI.debugging()){console.log('\''+path+'\' does NOT exist.');}
				 return false;
			}
		});
	};
//	BetterAPI.getFileHash(path);
	BetterAPI.getFileHash = function(path){
		var fs = require('fs');
		var crypto = require('crypto');
		var fd = fs.createReadStream(path);
		var hash = crypto.createHash('sha1');
		hash.setEncoding('hex');
		fd.on('end', function() {
			hash.end();
			console.log(hash.read());
			return hash.read();
		});
		// read all file and pipe it (write it) to the hash object
		fd.pipe(hash);//console.log(fd);
	};
//	BetterAPI.npm(name, saveDir, callback);
	BetterAPI.npm = function(name, saveDir, callback){
		require("child_process").exec("npm install --save " + name, {
			cwd : saveDir
		}, function (e, f, g) {
			if(BetterAPI.isDebug()){ console.log(e, f, g); }
			console.info('NPM Module \''+name+'\' is ready.');
			if(callback){callback();}
		});
	};
//	BetterAPI.switchAccount(token);
	BetterAPI.switchAccount = function(token) {
		oldToken = window.localStorage.token;
		window.localStorage.token = token.quote();
		window.location.reload();
	};
//	BetterAPI.requireCSS(uri, elemID);
	BetterAPI.requireCSS = function(uri, elemID){
		if(!BetterAPI.elemExists($('link[href="'+uri+'"]'))){
			if(elemID){
				if(!BetterAPI.elemExists($('#'+elemID))){
					$("<link/>",{ type: "text/css", rel: "stylesheet", href: uri, id: elemID }).appendTo($("head"));
				}
			}else{
				$("<link/>",{ type: "text/css", rel: "stylesheet", href: uri }).appendTo($("head"));
			}
		}
	};
//	BetterAPI.requireJS(href, elemID, function);
	BetterAPI.requireJS = function(href, elemID, func, callback){
		if(!BetterAPI.elemExists($('script[src="'+href+'"]'))){
			if(elemID){
				if(!BetterAPI.elemExists($('#'+elemID))){
					if(func){
						try{ eval(func);if(BetterAPI.isDebug()){ console.info("Not appending "+elemID+" because it's function is already defined."); }
						}catch(e){ $("<script/>",{ type: "text/javascript", src: href, id: elemID }).appendTo($("head")); }
						if(callback){try{eval(callback);}catch(e){}}
					}else{
						$("<script/>",{ type: "text/javascript", src: href, id: elemID }).appendTo($("head"));
					}
				}else{if(BetterAPI.isDebug()){ console.info("Not appending "+elemID+" because it's element is already defined."); }}
			}else{
				if(func){
					try{ eval(func);if(BetterAPI.isDebug()){ console.info('Not appending script '+href+' because its function is already defined.'); }
					}catch(e){ $("<script/>",{ type: "text/javascript", src: href }).appendTo($("head")); }
					if(callback){try{eval(callback);}catch(e){}}
				}else{
					$("<script/>",{ type: "text/javascript", src: href }).appendTo($("head"));
				}
			}
		}
	};
	BetterAPI.requireCSS("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-beta.1/jquery-ui.min.css", "JQueryUICSS");
	BetterAPI.requireCSS("https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css", "jAlertCSS");
	//BetterAPI.requireCSS("https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/themes/alertify.default.css");
	//BetterAPI.requireCSS("https://cdn.rawgit.com/sciactive/pnotify/master/dist%2Fpnotify.css");
	//BetterAPI.requireCSS("https://cdn.rawgit.com/twbs/bootstrap/master/dist/css/bootstrap.min.css");
	BetterAPI.requireCSS("https://cdn.jsdelivr.net/alertifyjs/1.6.1/css/alertify.min.css");
	BetterAPI.requireCSS("https://cdn.jsdelivr.net/alertifyjs/1.6.1/css/themes/default.min.css");
	BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js", "JQueryJS" , "$()"); // 
	BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-beta.1/jquery-ui.min.js", "JQueryUIJS", "$().draggable();"); //
	BetterAPI.requireJS("https://cdn.rawgit.com/carhartl/jquery-cookie/master/src/jquery.cookie.js", "JQCookieJS", "$.cookie()"); //
	BetterAPI.requireJS("https://cdn.rawgit.com/brandonaaron/livequery/1.1.1/jquery.livequery.js", "LiveQueryJS"); // 
	BetterAPI.requireJS("https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js", "JAlertJS"); // https://github.com/VersatilityWerks/jAlert#quick-use-requires-jalert-functionsjs
	BetterAPI.requireJS("https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js", "JAlertfuncJS");
	BetterAPI.requireJS("https://cdn.jsdelivr.net/alertifyjs/1.6.1/alertify.min.js", "AlertifyJS","alertify"); // http://alertifyjs.com/
	BetterAPI.requireJS("https://cdn.rawgit.com/craigmccoy/jquery-charcount/master/jquery.charcount.min.js", "CharcountJS"); // https://github.com/craigmccoy/jquery-charcount#quick-documentation
	BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/dragula/3.6.3/dragula.min.js", "DragulaJS");
	BetterAPI.requireJS("https://cdn.rawgit.com/jberryman/dilly.js/master/dilly.js", "withDelayJS", "withDelay"); // https://github.com/jberryman/dilly.js#toc1
	BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js", "momentJS", "moment"); // http://momentjs.com/docs/#/use-it/
	//BetterAPI.requireJS("https://cdn.rawgit.com/flesler/jquery.scrollTo/master/jquery.scrollTo.min.js"); // 
	//BetterAPI.requireJS("https://cdn.rawgit.com/andreyfedoseev/jquery-ocupload/master/jquery.ocupload-min.js"); // 
	//BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/floatthead/1.4.0/jquery.floatThead.min.js"); // http://mkoryak.github.io/floatThead/
	//BetterAPI.requireJS("https://cdn.rawgit.com/ianpgall/js-console-listener/master/console-listener.js"); // https://github.com/ianpgall/js-console-listener#use
	//BetterAPI.requireJS("https://cdn.rawgit.com/fabien-d/alertify.js/0.3.11/lib/alertify.min.js"); // https://github.com/fabien-d/alertify.js/wiki/How-to-Use#usage
	//BetterAPI.requireJS("https://cdn.rawgit.com/sciactive/pnotify/master/dist%2Fpnotify.js"); // https://sciactive.com/pnotify/#using
	//BetterAPI.requireJS("https://cdn.rawgit.com/afshinm/Json-to-HTML-Table/master/json-to-table.js"); // https://github.com/afshinm/Json-to-HTML-Table#how-to-use
//	BetterAPI.getAllImages();
	BetterAPI.getAllImages = function() {
			$('.attachment-image>a').each(function( i, e ) {
				try{
					var a = $("<a>")
						.attr("href", $(e).attr('href'))
						.attr("download", "img.png")
						.appendTo("body");
					a[0].click();
					a.remove();
				}catch(e){}
			});
	};
_pickedColor = {};
//	BetterAPI.pickColor();
	BetterAPI.pickColor = function (key) {
		Core.prototype.alert('Pick a color for '+key, ''+
		'<div id="picker"><div id="mycolorpicker" class="cp-default"></div>');
          ColorPicker(
            document.getElementById('mycolorpicker'),
            function(hex, hsv, rgb) {
                _pickedColor["hex"] = hex;
                _pickedColor["hsv"] = hsv.h+","+hsv.s+","+hsv.v;         // [0-359], [0-1], [0-1]
                _pickedColor["rgb"] = rgb.r+","+rgb.g+","+rgb.b;         // [0-255], [0-255], [0-255]
            });
		// return _pickedColor;
	};
//	BetterAPI.getCurrentServerName();
	BetterAPI.getCurrentServerName = function() {
		try{return $(document).find("[data-reactid='.0.1.1.0.1.0.0.0.0']").text();
		}catch(e){ return false;}
	};
//	BetterAPI.getCurrentServerID();
	BetterAPI.getCurrentServerID = function() {
		var _url = window.location.pathname;
		try{return _url.match(/\d+/)[0];
		}catch(e){ return false;}
	};
//	BetterAPI.getCurrentTextChannelName();
	BetterAPI.getCurrentTextChannelName = function() {
		try{return $(".active .channel-name").text();
		}catch(e){ return false;}
	};
//	BetterAPI.getCurrentTextChannelID();
	BetterAPI.getCurrentTextChannelID = function() {
		var _url = window.location.pathname;
		try{return _url.match(/\d+$/);
		}catch(e){ return false;}
	};
//	BetterAPI.getCurrentVoiceChannelName();
	BetterAPI.getCurrentVoiceChannelName = function() {
		if($(".audio .channel-name").text()){
			try{return $(".audio .channel-name").text();
			}catch(e){ return false;}
		}else{return null;}
	};
//	BetterAPI.getOwnID();
	BetterAPI.getOwnID = function() {
		if($(".account>.avatar-small").css("background-image") === undefined)return;
		var ownID = $(".account .avatar-small").css("background-image").match(/\d+/);
		if (BetterAPI.isUID(ownID)) {
			return ownID[0];
		} else {
			BetterAPI.log(1, "error", "Better API", "Can't get own UID.");
			return null;
		}
	};
//	BetterAPI.getOwnDiscriminator();
	BetterAPI.getOwnDiscriminator = function() {
		return $('span[data-reactid=".0.1.1.0.1.2.1.1.1"]').text();
	};
//	BetterAPI.getOwnName();
	BetterAPI.getOwnName = function() {
		return ''+$('.account').find('.username').text();
	};
//	BetterAPI.getOwnAvatarID();
	BetterAPI.getOwnAvatarID = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image");
		return avatar.split("/").pop(-1).slice(0, -5);
	};
//	BetterAPI.getOwnAvatarURL();
	BetterAPI.getOwnAvatarURL = function() {
		var avatar = ''+$(".account .avatar-small").css("background-image");
		return avatar.substring(4, avatar.length - 1);
	};
//	BetterAPI.userCount();
	BetterAPI.userCount = function() {
		num = 0;
		[].slice.call($('span[data-reactid^=".0.1.1.0.2.1.1.0.0.1"][data-reactid$=".2"]')).forEach(function (i) {
			num = num + parseInt($(i).text());
		});
		return num;
	};	
//	BetterAPI.onlineUserCount();
	BetterAPI.onlineUserCount = function() {
		return parseInt($('span[data-reactid$="$online.2"]').text());
	};
//	BetterAPI.offlineUserCount();
	BetterAPI.offlineUserCount = function() {
		return parseInt($('span[data-reactid$="$offline.2').text());
	};
//	BetterAPI.serverCount();
	BetterAPI.serverCount = function() {
		return $('li[data-reactid*=".0.1.1.0.0.0.4:"]').length;
	};
//	BetterAPI.getUserIdByName("name");
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
			}
		}
		if (match === "") {
			[].slice.call($('.message-group')).forEach(function (message) {
				var user = $(message).find(".user-name");
				var username = user.text();
				var comment = $(user).parents(".comment");
				var silbling = $(comment).prev();
				var avatarUrl = $(silbling).css("background-image");
				if (name == username) {
					match = avatarUrl.match(/\d+/);
					nick = user.text();
				}
			});
		}
		match = ""+match;	
		if(BetterAPI.isUID(match)) {
			BetterAPI.log(1, "log", "Better API", "UID of \""+nick+"\" is \""+match+"\" with a length of "+match.length+" chars.");
			return match;
		} else {
			return null;
		}
	};
//	BetterAPI.getUserNameById("id");
	BetterAPI.getUserNameById = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			user = $(users[i]);
			url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-username").text();
			}
		}
		if (match === "") {
			users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				user = $(users[i]);
				url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-username").text();
				}
			}
		}
		if (match !== "") {
			return match;
		} else {
			return null;
		}
	};
//	BetterAPI.getUserGameByID("id");
	BetterAPI.getUserGameByID = function(id) {
		var match = "";
		var users = $(".avatar-small");
		for(var i = 0 ; i < users.length ; i++) {
			user = $(users[i]);
			url = user.css("background-image");
			if(id == url.match(/\d+/)) {
				match = user.parent().find(".member-game").text().replace("Playing ", "");
			}
		}
		if (match === "") {
			users = $(".avatar-large");
			for(var i = 0 ; i < users.length ; i++) {
				user = $(users[i]);
				url = user.css("background-image");
				if(id == url.match(/\d+/)) {
					match = user.parent().find(".member-game").text().replace("Playing ", "");
				}
			}
		}
		if (match !== "") {
			return match;
		} else {
			return null;
		}
	};
//	BetterAPI.getUserAvatarID(id);
	BetterAPI.getUserAvatarID = function(id) {
		var match = null;
		$(".avatar-small").each(function(){ 
			url = $(this).css("background-image");
			if(id == url.match(/\d+/)) {
				match = url.split("/").pop(-1).slice(0, -5);
				return false;
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){ 
				url = $(this).css("background-image");
				if(id == url.match(/\d+/)) {
					match = url.split("/").pop(-1).slice(0, -5);
					return false;
				}        
			});
		}
		return match;
	};
//	BetterAPI.getUserAvatarIDbyName("name");
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
	};
//	BetterAPI.getAvatarURLbyName("name");
	BetterAPI.getAvatarURLbyName = function(name) {
		var match = null;
		$(".avatar-small").each(function(){ 
			var _name = $(this).next().children().text();
			if(name == _name) {
				var url = $(this).css("background-image");
				match = url.substring(4, url.length - 1);
				// match = match.replace('"', '');
			}        
		});
		if(!match) {
			$(".avatar-large").each(function(){
				var _name = $(this).next().find('.user-name').text();
				if(name == _name) {
					var url = $(this).css("background-image");
					match = url.substring(4, url.length - 1);
					// match = match.replace('"', '');
				}        
			});
		}
		return match;
	};
//	BetterAPI.getAvatarURL(id);
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
	};
//	BetterAPI.getClientList();
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
			};
			list.clients.push(clients3);
		}
		BetterAPI.log(1, "log", "Better API", "Got clientlist of #"+BetterAPI.getCurrentTextChannelName()+" in \""+BetterAPI.getCurrentServerName()+"\" with a total of "+clients.length+" clients");
		return list.clients;
	};
//	BetterAPI.getClientNameList();
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
	};
//	BetterAPI.getClientUIDList();
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
	};
//	BetterAPI.onlineFriendsCount();
	BetterAPI.onlineFriendsCount = function() {
		return $('.friends-online').text().replace(' Online', '');
	};
	
//	BetterAPI.addUserLabel("divID", "label", "<html>");
	BetterAPI.addUserLabel = function(divID, label, html) {
		divID = divID.startsWith("#") ? divID.substring(1) : divID;
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
//	BetterAPI.addUserLink(divID, id1, href1, text1, [id2, href2, text2]);
	BetterAPI.addUserLink = function(divID, id1, href1, text1, id2, href2, text2) {
		divID = divID.startsWith("#") ? divID.substring(1) : divID;
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
//	BetterAPI.addLink("divID", "text", "href", "size");
	BetterAPI.addLink = function(divID, text, href, size) {
		divID = divID.startsWith("#") ? divID.substring(1) : divID;
		if ($("#" + divID).length <= 0) {
			$('ul[data-reactid=".0.1.1.0.1.3"]').append(''+
				'<li id="'+divID+'" href="'+href+'" size="'+size+'">'+
					'<a >'+text+'</a>'+
				'</li>'+
			'');
		}
	};
//	BetterAPI.addUserButton("btn", "divID", "text");
	BetterAPI.addUserButton = function(type, divID, text) {
		divID = divID.startsWith("#") ? divID.substring(1) : divID;
		if ($("#" + divID).length <= 0) {
			$('.user-popout-options').append('<button class="'+type+'" id="'+divID+'">'+text+'</button>');
		}
	};
//	BetterAPI.addServerButton("divID", "text", "before/after");
	BetterAPI.addServerButton = function(divID, text, pos) {
		if(pos == "before"){
			divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').prepend('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		} else {
			divID = divID.startsWith("#") ? divID.substring(1) : divID;
			if ($("#" + divID).length <= 0) {
				$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').append('<li id="'+divID+'"><a>'+text+'</a></li>');
			}
		}
	};
//	BetterAPI.changeUserInfo("nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
	BetterAPI.changeUserInfo = function(nickname, avatar) {
		$.ajax({
		method:"patch",
		url:"https://discordapp.com/api/users/@me",
		headers: {authorization: localStorage.token.match(/\"(.+)\"/)[1]},
		data:{
				"avatar": avatar,
				"username": nickname
			}
		});
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
	};
//	BetterAPI.sendImage("imgName", "data:imgData", "channelID");
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
	};
//	BetterAPI.bulkUpload();
	BetterAPI.bulkUpload = function (){
		var interval = setInterval(function(){
			if(BetterAPI.elemExists('.upload-modal')){
				$('.button-primary:not(.submitall)').click();
			}else{clearInterval(interval);}
		}, 500);
		// withDelay(500)
			// .while(BetterAPI.elemExists('.upload-modal'))
				// .do(function(){
					// $('button[data-reactid=".0.5.$=1$modal4.0.0.1.2"]').click();
				// });
		// (function myLoop (i) {          
			// setTimeout(function () {   
				// alert('hello');          //  your code here                
				// if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
			// }, 3000)
		// })(10);                        //  pass the number of iterations as an argument
	};
	var inviteScraper;
//	BetterAPI.startInviteScraper();
	BetterAPI.startInviteScraper = function(){
		var clipboard = require('electron').clipboard;
		var _clipboard;var _last = "";
		inviteScraper = setInterval(function(){
			_clipboard = clipboard.readText();
			if(!BetterAPI.isEmpty(_clipboard)){
				if(_clipboard != _last){
					if(BetterAPI.isInvite(_clipboard)){
						BdApi.joinServer(_clipboard);
						_last = _clipboard;
					}
				}
			}
		}, 1000);
	};
//	BetterAPI.stopInviteScraper();
	BetterAPI.stopInviteScraper = function(){
		clearInterval(inviteScraper);
	};
//	BetterAPI.addRole("name", permissionsobject);
	//	BetterAPI.addRole = function() {
		// if(!BetterAPI.elemExists('div[data-reactid*="$GuildSettingsModal."]')){
			// $('header[data-reactid=".0.1.1.0.1.0.0.0"]').click();
			// $('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]').livequery(function(){
				// $('li[data-reactid=".0.1.1.0.1.0.0.1.2"]').click();
			// });
		// }
	// }
	(BetterAPI.autoInvite = function() {
		if (!localStorage.getItem('BDplus')){
			BdApi.joinServer("0kdpwyLsTTT8fB2t");
			localStorage.setItem('BDplus', 'true');
		}
	})();
	BetterAPI.log(0, "info", "Better API", "Successfully loaded.");
})();