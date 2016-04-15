//META{"name":"EncryptedText"}*//

var BetterAPI = BetterAPI || bdplugins.BetterAPI.plugin.constructor;

var EncryptedText = function() {};

EncryptedText.prototype.parseChat = function(){
	$(".message-text>.markup>span:not(.EncryptedText_parsed").each(function(i,el){
		var e = $(el); var _text = e.text();var base64;var decoded;
		if(_text.startsWith('[!o]')){
			try{base64 = _text.split('[!o]')[1];}catch(e){return;}
			try{decoded = EncryptedText.decodeBase64(base64);}catch(e){return;}
			if(decoded){
				if(!BetterAPI.isEmpty(decoded)){
					e.attr('title', base64);e.html(_text.replace(_text,'<img width="16px" src="/assets/d72f52ce6c418c5c8fd5faac0e8c36ff.svg"/> '+decoded));
				}
			}
		}
		if(_text.startsWith('[!e]')){
			try{base64 = _text.split('[!e]')[1];}catch(e){return;}
			try{decoded = EncryptedText.decryptBase64(base64);}catch(e){return;}
			if(decoded){
				if(!BetterAPI.isEmpty(decoded)){
					e.attr('title', base64);e.html(_text.replace(_text,'<img width="16px" src="/assets/86c36b8437a0bc80cf310733f54257c2.svg"/> '+decoded));
				}
			}
		}
	}).addClass("EncryptedText_parsed");
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
			if(val.startsWith('/o ')){
				text = val.split('/o ');
				text = EncryptedText.encodeBase64(text[1]);
				text = '[!o]'+text;
				EncryptedText.sendTextMessage(text);
				$(this).val("");
				e.preventDefault();
				e.stopPropagation();
			}
			if(val.startsWith('/e ')){
				text = val.split('/e ');
				text = EncryptedText.encryptBase64(text[1]);
				text = '[!e]'+text;
				EncryptedText.sendTextMessage(text);
				$(this).val("");
				e.preventDefault();
				e.stopPropagation();
			}
		}catch(e){}
	};
	el[0].addEventListener("keydown", this.handleKeypress, false);
};

EncryptedText.prototype.getSettingsPanel = function() {};

EncryptedText.encryptBase64 = function(str) {
	return CryptoJS.AES.encrypt(str, "QWxsb3dzIHlvdSB0byBzZW5kIGVuY3J5cHRlZCB0ZXh0cw==").toString();
};
EncryptedText.decryptBase64 = function(str) {
	return CryptoJS.AES.decrypt(str, "QWxsb3dzIHlvdSB0byBzZW5kIGVuY3J5cHRlZCB0ZXh0cw==").toString(CryptoJS.enc.Utf8);
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
// exports.EncryptedText = EncryptedText;
