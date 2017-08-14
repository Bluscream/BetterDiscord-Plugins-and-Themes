//META{"name":"charCounter"}*//

var charCounter = function () {};

charCounter.prototype.start = function () {
    this.injectCss();
    this.inject();
    this.attachHandler();
};

charCounter.prototype.injectCss = function () {
    BdApi.clearCSS("charCounter");
    BdApi.injectCSS("charCounter", `
    #charcounter {
        display: block;
        position: absolute;
        right: 0; bottom: -1.1em;
        opacity: .5;
    }`);
};

charCounter.prototype.inject = function() {
    let ta = $(".content textarea").parent();
    if(!ta.length) return;
    if($("#charcounter").length) return;
    ta.append($("<span/>", { 'id': 'charcounter', 'text': `${$(".content textarea").val().length}/2000` }));
    $(".content textarea").off("keyup.charcounter").on("keyup.charCounter", e => {
        $("#charcounter").text(`${e.target.value.length}/2000`);
    });
};

charCounter.prototype.attachHandler = function() {
    var el = $('.channel-text-area-default>div>textarea');
    if (el.length == 0) return;
    this.handleKeypress = function (e) {
        var code = e.keyCode || e.which;
        if(code !== 13) return;
      	//try {
            var val = el.val();
        		if(val.length > 2000){
        			var text = val.match(/.{1,2000}/g)
              var length = text.length;
              for (var i = 0; i < length; i++) {
        			     charCounter.prototype.sendTextMessage(text[i]);
                   console.log('Sending message '+i+' ('+text[i].length+') of '+length+' ('+val.length+').')
              }
        			$(this).val("");
        			e.preventDefault();
        			e.stopPropagation();
        			return;
        		}
    	//} catch(e) { console.log("Could not find textarea!"); }
    };
    el[0].addEventListener("keydown", this.handleKeypress, false);
};

charCounter.prototype.sendTextMessage = function(text) {
	var fd = new FormData();
	fd.append('content',text);
	$.ajax({
	  type: "POST",
	  url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
	  headers: {
		  "authorization": "mfa.SLCbOcB6l8fvqVvRTU0OcCdX8I1xh3SAHHZlcb_VumfeZInpPWLk9FCKEqCp97u1qkI-1qOLMB-bK-GVBoWC"
	  },
	  data: fd,
	  processData: false,
	  contentType: false
	});
};

charCounter.prototype.load = function () {};

charCounter.prototype.unload = function () {};

charCounter.prototype.stop = function () {
    BdApi.clearCSS("charCounter");
    $(".content textarea").off("keyup.charcounter");
};

charCounter.prototype.onMessage = function () {};

charCounter.prototype.onSwitch = function () {
    this.inject();
    this.attachHandler();
};

charCounter.prototype.observer = function (e) {};

charCounter.prototype.getSettingsPanel = function () { return ""; };

charCounter.prototype.getName = function () {
    return "Character Counter";
};

charCounter.prototype.getDescription = function () {
    return "Adds a character counter to channel textarea. Fixed by square Jul '17";
};

charCounter.prototype.getVersion = function () {
    return "0.1.1";
};

charCounter.prototype.getAuthor = function () {
    return "Jiiks";
};
