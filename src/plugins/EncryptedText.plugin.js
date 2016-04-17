//META{"name":"EncryptedText"}*//

var BetterAPI = BetterAPI || bdplugins.BetterAPI.plugin.constructor;

var EncryptedText = function() {
	this.loadDatabase();
};

var _settings = {
	"default":"QWxsb3dzIHlvdSB0byBzZW5kIGVuY3J5cHRlZCB0ZXh0cw=="
}

EncryptedText.prototype.parseChat = function(){
	$(".message-text>.markup>span:not(.EncryptedText_parsed").each(function(i,el){
		var e = $(el); var _text = e.text();var base64;var _decoded;var decoded;var key;
		if(_text.startsWith('[!o]')){
			try{base64 = _text.split(/\[!o\](.+)?/)[1];}catch(e){BetterAPI.log(0, "error", EncryptedText.prototype.getName(), "base64 = _text.split(/\\[!o\\](.+)?/)[1];");return;}
			try{decoded = EncryptedText.decodeBase64(base64);}catch(e){BetterAPI.log(0, "error", EncryptedText.prototype.getName(), "decoded = EncryptedText.decodeBase64(base64);");return;}
			if(decoded){
				if(!BetterAPI.isEmpty(decoded)){
					e.attr('title', base64);e.html(_text.replace(_text,'<img width="16px" src="/assets/d72f52ce6c418c5c8fd5faac0e8c36ff.svg"/> '+decoded));e.addClass("EncryptedText_parsed");
				}
			}else{
				console.log('Could not decode: '+base64);
				e.attr('title', _text);e.html(_text.replace(_text,'<img width="16px" src="//i.gyazo.com/433bbcfd804defd4417f54d83aaa71b3.png"/> <b>[BASE64]</b> '+base64));
			}
		}
		if(_text.startsWith('[!e]')){
			try{base64 = _text.split(/\[!e\](.+)?/)[1];}catch(e){BetterAPI.log(0, "error", EncryptedText.prototype.getName(), "base64 = _text.split(/\\[!e\\](.+)?/)[1];");return;}
			for (var key in EncryptedText.keyStore) {
					try{ _decoded = EncryptedText.decryptBase64(base64, EncryptedText.keyStore[key]);/*console.log('Decoded: '+_decoded)*/
					}catch(e){BetterAPI.log(0, "error", EncryptedText.prototype.getName(), "Unable to decrypt \""+base64+"\" with key "+key);continue;}
					if(_decoded){
						if(!BetterAPI.isEmpty(_decoded)){
							decoded = '<b>'+key.toUpperCase()+' ></b> '+_decoded;
							break;
						}
					}
				
			}
			if(decoded){
				if(!BetterAPI.isEmpty(decoded)){
					e.attr('title', base64);e.html(_text.replace(_text,'<img width="16px" src="/assets/86c36b8437a0bc80cf310733f54257c2.svg"/> '+decoded));e.addClass("EncryptedText_parsed");
				}
			}else{
				console.log('Could not decode: '+base64);
				e.attr('title', _text);e.html(_text.replace(_text,'<img width="16px" src="//i.gyazo.com/433bbcfd804defd4417f54d83aaa71b3.png"/> <b>[AES]</b> '+base64));
			}
		}
	});
};

EncryptedText.prototype.load = function() {};

EncryptedText.prototype.start = function() {
	var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert('Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 500);'+
				'">here</a> to enable it.<br>'+
			'');
			return null;
		}
		BetterAPI.requireJS('https://cdn.rawgit.com/sytelus/CryptoJS/master/rollups/aes.js', 'AESJS', 'CryptoJS.AES.encrypt("Message", "Secret Passphrase");');
		this.attachHandler();this.parseChat();
	}else{
		Core.prototype.alert('Required plugin not found!',''+
			'A requirement is missing: <b>'+_require[0]+'</b><br>'+
			'<br>'+
			'Click <a style=""href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
			'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
		'');
		return null;
	}
_require = null;
};

EncryptedText.prototype.onSwitch = function() {
	this.attachHandler();this.parseChat();
};
EncryptedText.prototype.onMessage = function() {
	this.parseChat();
};
EncryptedText.prototype.observer = function(e) {
    if (e.target.getAttribute('class') != null) {
        if (e.target.getAttribute('class').indexOf('comment') != -1) {
            if (e.addedNodes.length > 0) {
                if (e.addedNodes[0].className.indexOf('message') != 1) {
                    this.parseChat();
                }
            }
        }
    }
};

EncryptedText.prototype.stop = function() {};

EncryptedText.prototype.unload = function() {};

EncryptedText.prototype.getName = function() {
	return "Encrypted Text";
};

EncryptedText.prototype.getDescription = function() {
	return "Allows you to send encrypted texts";
};

EncryptedText.prototype.getVersion = function() {
	return "1";
};

EncryptedText.prototype.getAuthor = function() {
	return "EhsanKia, Bluscream";
};

EncryptedText.prototype.attachHandler = function() {
	var el = $('.channel-textarea textarea');
	if (el.length == 0) return;
	var val;
	this.handleKeypress = function (e) {
		var code = e.keyCode || e.which;
		if(code !== 13) return;
		var text;
		try{var val = $('.channel-textarea textarea').val();
			if(val == '/ad'){
				EncryptedText.sendTextMessage(':lock: To decrypt the encrypted messages you need the **EncryptedText** Plugin for _BetterDiscord_ :lock:\nhttp://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/EncryptedText.plugin.js');
				$(this).val("");
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			if(val.startsWith('/o ')){
				text = val.split('/o ');
				text = EncryptedText.encodeBase64(text[1]);
				text = '[!o]'+text;
				EncryptedText.sendTextMessage(text);
				$(this).val("");
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			if(val.startsWith('/e ')){
				text = val.split(/\/e\s(.+)?/)[1];
				var _text = text.split(/\s(.+)?/);
				if(EncryptedText.keyStore.hasOwnProperty(_text[0])){
					text = EncryptedText.encryptBase64(_text[1], EncryptedText.keyStore[_text[0]]);
					text = '[!e]'+text;
					EncryptedText.sendTextMessage(text);
					$(this).val("");
					e.preventDefault();
					e.stopPropagation();
					return;
				}else{
					var _keys = "";var i = 1;
					for (var key in EncryptedText.keyStore) {
						if (!EncryptedText.keyStore.hasOwnProperty(key) || key === undefined || key == "undefined") continue;
						if(i == 1){_keys = key;i = 0;}else{ _keys = _keys+"/"+key; }
					}
					$('.jAlert').remove();$('.ja_wrap').remove();
					alert('Encrypted Text Plugin Syntax', '/e &lt;'+_keys+'&gt; &lt;MESSAGE>&gt;');
					e.preventDefault();
					return;
				}
			}
		}catch(e){ BetterAPI.log(0, "error", EncryptedText.prototype.getName(), "Could not find textarea!"); }
	};
	el[0].addEventListener("keydown", this.handleKeypress, false);
};

EncryptedText.prototype.getSettingsPanel = function() {
	var self = this;
	var settings = $('<div class="form"></div>');
	settings.append('<h1 style="font-weight: bold">Key database:</h1>');

	var rowHtml = "";
	rowHtml += '<div class="control-group EncryptedText-inputgroup">';
	rowHtml += '	<input style="width: 40%;" type="text" name="name" placeholder="Name">';
	rowHtml += '	<input style="width: 40%;" type="text" name="data" placeholder="Data">';
	rowHtml += '</div><br>';

	for (var key in EncryptedText.keyStore) {
		if (!EncryptedText.keyStore.hasOwnProperty(key)) continue;
		var row = $(rowHtml);
		row.find('input[name="name"]').val(key);
		row.find('input[name="data"]').val(EncryptedText.keyStore[key]);
		settings.append(row);
	}

	settings.append(rowHtml);

	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
		.click(function() {
			$(this).before(rowHtml);
		});

	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
		.click(function() {
			EncryptedText.keyStore = {};
			settings.find('.EncryptedText-inputgroup').each(function(i, el) {
				var $e = $(el);
				var key = $e.find('input[name="name"]').val();
				var data = $e.find('input[name="data"]').val();
				if (key.trim() === "" || data.trim() === "") return;
				EncryptedText.keyStore[key] = data;
			});

			self.saveDatabase();

			var $b = $(this).text('Saved!');
			setTimeout(function() {$b.text('Save');}, 1000);
		});

	settings.append(addButton);
	settings.append(saveButton);
	return settings;
};

EncryptedText.prototype.saveDatabase = function() {
	window.localStorage.keyStore = btoa(JSON.stringify(EncryptedText.keyStore));
};

EncryptedText.prototype.loadDatabase = function() {
	if (window.localStorage.hasOwnProperty("keyStore")) {
		var data = window.localStorage.keyStore;
		EncryptedText.keyStore = JSON.parse(atob(data));
	} else {
		EncryptedText.keyStore = _settings;
	}
};


EncryptedText.encryptBase64 = function(str, key) {
	if(key){ return CryptoJS.AES.encrypt(str, key).toString(); }
};
EncryptedText.decryptBase64 = function(str, key) {
	if(key){ return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8); }
};

EncryptedText.encodeBase64 = function(str) { return btoa(str); };
EncryptedText.decodeBase64 = function(str) { return atob(str); };

EncryptedText.sendTextMessage = function(text) {
	var fd = new FormData();
	fd.append('content',text);
	$.ajax({
	  type: "POST",
	  url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
	  headers: {
		  "authorization": localStorage.token.slice(1, -1)
	  },
	  data: fd,
	  processData: false,
	  contentType: false
	});
};
exports.EncryptedText = EncryptedText;