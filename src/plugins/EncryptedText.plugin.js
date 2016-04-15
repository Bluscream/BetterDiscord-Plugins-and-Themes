//META{"name":"EncryptedText"}*//
function EncryptedText() {
	this.parseChat = function(){
		$(".message-text>.markup>span:not(.EncryptedText_parsed").each(function(i,el){
			var e = $(el); var _text = e.text();
			if(!_text.startsWith('[!e]')) return;
			var base64 = _text.split('[!e]')[1];
			base64 = EncryptedText.decodeBase64(base64);
			if(!base64 || base64 == "undefined") return;
			e.html(_text.replace(_text,'<img width="16px" src="/assets/86c36b8437a0bc80cf310733f54257c2.svg"/> '+base64));
		}).addClass("EncryptedText_parsed")
	}
}
EncryptedText.prototype.load = function() {};

EncryptedText.prototype.start = function() {
	this.attachHandler();this.parseChat();
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
	var self = this;
	this.handleKeypress = function (e) {
		var code = e.keyCode || e.which;
		if(code !== 13) return;
		if(!$(this).val().startsWith('/e ')) return;
		var text = $(this).val().split('/e ');
		text = EncryptedText.encodeBase64(text[1]);
		text = '[!e]'+text;
		// var utext = text.split('[!e]');
		// utext = EncryptedText.decodeBase64(utext[1]);console.log(text);
		EncryptedText.sendTextMessage(text);
		// EncryptedText.sendTextMessage(utext);
		$(this).val("");
		e.preventDefault();
		e.stopPropagation();
	};

	// bind handlers
	el[0].addEventListener("keydown", this.handleKeypress, false);
};

EncryptedText.prototype.getSettingsPanel = function() {};

EncryptedText.encodeBase64 = function(str) { return btoa(str); }
EncryptedText.decodeBase64 = function(str) { return atob(str); }

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
}