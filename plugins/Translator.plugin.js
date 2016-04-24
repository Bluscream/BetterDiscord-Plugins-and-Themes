//META{"name":"Translator"}*//
var Translator = function () {
	this.getName = function(){ return "Translator"; }
	this.getDescription = function(){ return "/t in the chat to translate your text to english."; }
	this.getVersion = function(){ return "0.0.1"; }
	this.getAuthor = function(){ return "Bluscream"; }
};

Translator.prototype.load = function () {
	// BetterAPI.requireJS('https://www.google.com/jsapi?key=AIzaSyCkwZEjs3S9TTlSbeRgkBYJaPBJlIWomgs', 'GoogleAPI')
	// $('body').append('<script type="text/javascript">document.domain = "google.com";</script><script type="text/javascript" src="https://www.google.com/jsapi?key=AIzaSyCkwZEjs3S9TTlSbeRgkBYJaPBJlIWomgs" id="GoogleAPI"></script>');
	 // window.addEventListener("message", receiveMessage, false);
	 // function receiveMessage(event){
		// console.log(event);
	 // }
	 // window.parent.postMessage('https://www.google.com/jsapi?key=AIzaSyCkwZEjs3S9TTlSbeRgkBYJaPBJlIWomgs','*');
	var _data = $.ajaxExternal({
		url: "https://www.google.com/jsapi?key=AIzaSyCkwZEjs3S9TTlSbeRgkBYJaPBJlIWomgs",
		// beforeSend: function( xhr ) {
		// xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	});
	eval(_data);
};
Translator.prototype.start = function () {
	google.load("language",1);
	this.attachHandler();
};

Translator.prototype.attachHandler = function() {
	var el = $('.channel-textarea textarea');
	if (el.length == 0) return;
	var self = this;
	// Handler to catch key events
	this.handleKeypress = function (e) {
		var code = e.keyCode || e.which;
		if (code !== 13) return;
		var text = $(this).val();
		if(!text.startsWith('/t')){return;}
		text = text.replace('/t', '');
		
		google.language.translate(text,"de","en",this.sendTextMessage(data));
		
		$(this).val("");

		e.preventDefault();
		e.stopPropagation();
	};

	// bind handlers
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
    return "<h3>Settings Panel</h3>";
};

try{exports.Translator = Translator;}catch(e){console.warn('Using old version, not exporting functions.')}