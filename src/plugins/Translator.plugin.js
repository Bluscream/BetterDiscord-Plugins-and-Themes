//META{"name":"Translator"}*//
var Translator = function () {
	this.getName = function(){ return "Translator"; };
	this.getDescription = function(){ return "/t in the chat to translate your text to english."; };
	this.getVersion = function(){ return "0.0.1"; };
	this.getAuthor = function(){ return "Bluscream"; };
};
var _settings = {
	"from": "de",
	"to": "en"
};
var MsTranslator;var client;

Translator.prototype.load = function () {
	BetterAPI.loadSettings("translator", _settings);
	//BetterAPI.requireJS('https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/indev/dist/jsapi.js', 'GoogleAPI');
};
Translator.prototype.start = function () {
	//google.load("language",1);
	BetterAPI.npm('mstranslator', __dirname.replace('resources\\atom.asar\\renderer\\lib','resources'), function(){
		MsTranslator = require('mstranslator');
		client = new MsTranslator({
			client_id: "gtranslator-blu",
			client_secret: "XWQyyjLA8s4mbReLuIVMzArwqO+BwDM/5Yxv+cumwdM="
		}, true);
	});
	this.attachHandler();
};

Translator.prototype.attachHandler = function() {
	var el = $('.channel-textarea textarea');
	if (el.length == 0) return;
	var self = this;
	this.handleKeypress = function (e) {
		var code = e.keyCode || e.which;
		if (code !== 13) return;
		var text = $(this).val();
		if(!text.startsWith('/t')){return;}
		text = text.replace('/t', '');
		
		//google.language.translate(text,"de","en",this.sendTextMessage(data));
		var params = {
		  text: text,
		  from: _settings.from,
		  to: _settings.to
		};
		client.translate(params, function(err, data) {
		  self.sendTextMessage(data);
		});
		$(this).val("");

		e.preventDefault();
		e.stopPropagation();
	};
	el[0].addEventListener("keydown", this.handleKeypress, false);
};
Translator.prototype.sendTextMessage = function(text) {
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
Translator.prototype.onMessage = function () {};
Translator.prototype.onSwitch = function () {
	this.attachHandler();
};
Translator.prototype.observer = function (e) {};

Translator.prototype.stop = function () {};
Translator.prototype.unload = function () {};

Translator.prototype.getSettingsPanel = function () {
	var self = this;
	var settings = $('<div class="form"></div>');
    var _data = '<h3>Translator</h3>';
	_data += '<input style="width: 40%;" type="text" id="trfrom" name="from" placeholder="From Language (Ex: de)">';
	_data += '<input style="width: 40%;" type="text" id="trto" name="to" placeholder="To Language (Ex: en)"><br><br>';
	
	var _saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
	.click(function() {
		_settings.from = $('#trfrom').val();
		_settings.to = $('#trto').val();
		BetterAPI.saveSettings('translator', _settings);

		var $b = $(this).text('Saved!');
		setTimeout(function() {$b.text('Save');}, 1000);
	});
	settings.append(_data);
	// $('#trfrom').val(_settings.from);
	// $('#trto').val(_settings.to);
	settings.append(_saveButton);
	return settings;
};

try{exports.Translator = Translator;}catch(e){console.warn('Using old version, not exporting functions.');}