//META{"name":"DCMQuotingPlugin"}*// 
function DCMQuotingPlugin(){
    var ghostModId = 2;
    this.load = function(){};
    this.start = function(){
        inject();
		createCharCounter();
    };
    this.unload = function(){
        removeAllEvents(document, "DOMNodeInsertedIntoDocument");
        removeAllEvents(document, "DOMNodeInserted");
    };
    this.stop = function(){
        removeAllEvents(document, "DOMNodeInsertedIntoDocument");
        removeAllEvents(document, "DOMNodeInserted");
    };
    var checkVal = function(a){
        if (typeof a == "undefined")
            return 300;
        if (typeof a.getElementsByTagName("h2")[0] == "undefined")
            return 300;
        return a.getElementsByTagName("h2")[0].childNodes.length;
    };
    var inject = function(){
        window.DCMQuoting.enabled = true;
        document.addEventListener("DOMNodeInsertedIntoDocument", function() {
            update();
        }, false);
        document.addEventListener("DOMNodeInserted", function() {
            update();
        }, false);
    };
	createCharCounter = function() {
		if ($('.charcount-display').length <= 0) {
			$(document).find("[data-reactid='.0.1.1.0.2.1.0.1.0.0.1']").charcount({
				maxLength: 2000,
				position: 'before'
			});
			$('.charcount-display').css("font-size", "small");
		}
	}
	var createSpan = function(text){
        var span = document.createElement("span");
        span.setAttribute("style", "display:inline-block;font-size:big");
        span.innerText = text;
        return span;
	}
    var createButton = function(text, func, mode){
        var span = document.createElement("span");
        span.setAttribute("style", "display:inline-block;font-size:big");
        span.innerText = "["+text+"]";
		if (mode) {
			span.setAttribute("onclick", 'DCMQuoting.'+func+'(this, "'+mode+'");');
		} else {
			span.setAttribute("onclick", 'DCMQuoting.'+func+'(this);');
		}
        return span;
    };
	var createEditButton = function() {
		// <div class="btn-item" data-reactid=".0.4.$=11=2$13434-popout.0.0">Edit</div>
	}
    var update = function(){
        if ((typeof(document.getElementsByClassName("messages")[0]) !== 'undefined') 
            && (document.getElementsByClassName("messages")[0] !== null)
            && (window.DCMQuoting.enabled)) {
            var elements = document.getElementsByClassName("messages")[0]
                .getElementsByTagName("div");
            for (var i = 0, im = elements.length; im > i; i++) {
                var element = elements[i]
                    .getElementsByTagName("span");
                for (var ia = 0, ima = element.length; ima > ia; ia++) {
                    var content = element[ia].parentElement.parentElement;
                    if ((content.className == "body") && (checkVal(content) == ghostModId)) {
                        content.getElementsByTagName("h2")[0].appendChild(createSpan("| Quote: "));
                        content.getElementsByTagName("h2")[0].appendChild(createButton("Server", "clicked", "server"));
                        content.getElementsByTagName("h2")[0].appendChild(createButton("Channel", "clicked", "channel"));
                        content.getElementsByTagName("h2")[0].appendChild(createButton("Client", "clicked", "client"));
                        content.getElementsByTagName("h2")[0].appendChild(createSpan(" | "));
                        // content.getElementsByTagName("h2")[0].appendChild(createButton("Hide", "clickedHide"));
                        content.getElementsByTagName("h2")[0].appendChild(createButton("All clients", "clickedallClients"));
					}
                }
            }
        }
    };
};
DCMQuotingPlugin.prototype.getName = function() { 
    return "Quoting Plugin"; 
}; 
DCMQuotingPlugin.prototype.onSwitch = function() { 
	createCharCounter();
}; 
DCMQuotingPlugin.prototype.getDescription = function() { 
    return "Quoting for Discord"; 
}; 
DCMQuotingPlugin.prototype.getVersion = function() { 
    return "0.1.8"; 
}; 
DCMQuotingPlugin.prototype.getAuthor = function() { 
    return "Ghost"; //This version was modified by Bluscream.
}; 
DCMQuotingPlugin.prototype.getSettingsPanel = function() {
	const _author = 'NotGGhost';
	const _repo = 'Discord-Client-Modding';
	const _path = 'blob/master/Quoting.js';
    return 'This version of "'+DCMQuotingPlugin.prototype.getName()+'" was modified by Bluscream.</br></br>\
		If you want the original version by <a href="https://github.com/'+_author+'">'+_author+'</a>,'+
			' get it from <a href="https://github.com/'+_author+'/'+_repo+'/'+_path+'">here</a>.'; 
}; 
var CDCMQuoting = function(){
    this.enabled = true;
    this.getMessage = function(element, mode) {
        var msg = "";
        while (!(element.classList.contains("message-group")))
            element = element.parentElement;
        var body = element.getElementsByClassName("first")[0]
            .getElementsByClassName("body")[0];
        var time = body.getElementsByTagName("h2")[0]
            .getElementsByTagName("span")[0]
            .innerText
            .replace("Today at ", "");
        var username = body.getElementsByTagName("h2")[0]
            .getElementsByClassName("user-name")[0].innerText;
		var uid = BetterAPI.getUserIdByName(username);
        var comments = element.getElementsByClassName("comment")[0]
            .getElementsByClassName("message");
		var channel = BetterAPI.getCurrentChannelID();
		var server = BetterAPI.getCurrentServerName();
        var index;
		if (uid){
			var uid = '<@'+uid+'>';
		}else{
			var uid = '@'+username;
		}
		if (mode == "client") {
			var msg = msg + "`[" + time + "]` " + uid + " said:\n";
		} else if (mode == "channel") {
			var msg = msg + "`[" + time + "]` " + uid + " said in <#"+channel+">:\n";
		} else if (mode == "server") {
			var msg = msg + "`[" + time + "]` " + uid + " said in <#"+channel+"> on **"+server+"**:\n";
		} else {
			var msg = msg + "`[" + time + "]` \"" + uid + "\" said:\n";
		}
        for (index = 0; index < comments.length; ++index) {
            var text = ">" + comments[index].getElementsByClassName("markup")[0]
                .innerText
                .replace("(edited)", "")
                .replace("\n\r", "")
                .replace("_", "");
            if (!(text == ""))
                msg = msg + text + "\n";
        }
		// var msg = msg + "```";
        return msg;
    };
    this.resize = function(textArea){
        textArea.onkeydown = function() {
            var key = event.keyCode || event.charCode;
            if(key == 8 || key == 46)
               window.DCMQuoting.resize(this);
        };
        textArea.style.height = textArea.scrollHeight > textArea.clientHeight ? (textArea.scrollHeight) + "px" : (textArea.value == "" ? "18px" : "80px");
    }
    this.clicked = function(messageElement, mode){
        var textArea = document.getElementsByTagName("textarea")[0];
        const message = window.DCMQuoting.getMessage(messageElement, mode);
        const oldMsg = textArea.value;
        var quote = (oldMsg == "" ? oldMsg : oldMsg + "\n") + message + "\n";    //append if text is already in the text box
        if ((typeof(betterDiscordIPC) !== 'undefined') && (betterDiscordIPC !== null)) { 
            $(textArea).focus().val("").val(quote);
        } else {
            textArea.value = quote;
        }
        window.DCMQuoting.resize(textArea);
        textArea.scrollTop = textArea.scrollHeight;
    };
    this.clickedallClients = function(messageElement){
		var quote = "";
        var textArea = document.getElementsByTagName("textarea")[0];
        var clients = BetterAPI.getClientUIDList();
		for (i = 0; i < clients.length; ++i) {
			var quote = quote + "<@" + clients[i] + "> ";
		}
        const oldMsg = textArea.value;
        if ((typeof(betterDiscordIPC) !== 'undefined') && (betterDiscordIPC !== null)) { 
            $(textArea).focus().val("").val(quote);
        } else {
            textArea.value = quote;
        }
        window.DCMQuoting.resize(textArea);
        textArea.scrollTop = textArea.scrollHeight;
    };
    this.clickedHide = function(messageElement){
        while (!(messageElement.classList.contains("message-group")))
            messageElement = messageElement.parentElement;
		var comments = messageElement.getElementsByClassName("comment")[0]
            .getElementsByClassName("message");
        $(message).css('display', 'none');
    };
};
window.DCMQuoting = new CDCMQuoting();
//TODO: http://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-events-of-a-dom-object 
function removeAllEvents(node, event) {
    window.DCMQuoting.enabled = false;
};
if (!((typeof(betterDiscordIPC) !== 'undefined') && (betterDiscordIPC !== null))) {
    new DCMQuotingPlugin().start();
}