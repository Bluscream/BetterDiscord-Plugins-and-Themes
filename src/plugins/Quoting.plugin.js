//META{"name":"DCMQuotingPlugin"}*// 
//Crossplatform script... IE 8 -> Chrome -> Better discord "support"
//This class is for hacky QUOTE INJECTION only
function DCMQuotingPlugin(){
	this.getName = function() { return "Quoting"; };
	this.getDescription = function() { return "Quoting from Discord Client Modding ported by NotGGhost."; };
	this.getVersion = function() { return "0.1.7"; };
	this.getAuthor = function() { return "NotGGhost";/*This version was modified by Bluscream.*/ };
    var ghostModId = 3;
    this.load = function(){};
    this.start = function(){
        inject();
    };
    this.unload = function(){
        removeAllEvents(document, "DOMNodeInsertedIntoDocument");
        removeAllEvents(document, "DOMNodeInserted");
    };
    this.stop = function(){
        removeAllEvents(document, "DOMNodeInsertedIntoDocument");
        removeAllEvents(document, "DOMNodeInserted");
    };
	this.onMessage = function() {};
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
	var createSpan = function(text){
        var span = document.createElement("span");
        span.setAttribute("style", "display:inline-block;font-size:big");
        span.innerText = text;
        span.className = "timestamp";
        return span;
	}
    var createButton = function(text, func, mode){
        var button = document.createElement("span");
        button.setAttribute("style", "display:inline-block;font-size:big");
        button.innerText = "["+text+"]";
		button.className = "timestamp";
		if (mode) {
			button.setAttribute("onclick", 'DCMQuoting.'+func+'(this, "'+mode+'");');
		} else {
			button.setAttribute("onclick", 'DCMQuoting.'+func+'(this);');
		}
        return button;
    };
                        //try{content.getElementsByTagName("h2")[0].appendChild(createButton("Clients", "clickedallClients"));}catch(e){}
                        //try{content.getElementsByTagName("h2")[0].appendChild(createButton("Pics", "clickallPics"));}catch(e){}
						//try{content.getElementsByTagName("h2")[0].appendChild(createSpan("|"));}catch(e){}
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
                    if ((content.className == "body") && (checkVal(content) == ghostModId)){
						try{$(content).find('h2').append(createButton("Server", "clicked", "server"));}catch(e){}
						try{$(content).find('h2').append(createButton("Channel", "clicked", "channel"));}catch(e){}
						try{$(content).find('h2').append(createButton("Client", "clicked", "client"));}catch(e){}
					}
                }
            }
        }
    };
};
DCMQuotingPlugin.prototype.onSwitch = function() {};
DCMQuotingPlugin.prototype.getSettingsPanel = function() { 
	const _repo = 'Discord-Client-Modding';
	const _path = 'blob/master/Quoting.js';
    return 'This version of "'+DCMQuotingPlugin.prototype.getName()+'" was modified by Bluscream.</br></br>'+
			'If you want the original version by <a href="https://github.com/'+DCMQuotingPlugin.prototype.getAuthor()+'">'+DCMQuotingPlugin.prototype.getAuthor()+'</a>,'+
			'&nbsp;get it from <a href="https://github.com/'+DCMQuotingPlugin.prototype.getAuthor()+'/'+_repo+'/'+_path+'">here</a>.'; 
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
            .getElementsByTagName("span")[2]
            .innerText
            .replace("Today at ", "");
        var username = body.getElementsByTagName("h2")[0]
            .getElementsByClassName("user-name")[0].innerText;
		var uid = BetterAPI.getUserIdByName(username);
        var comments = element.getElementsByClassName("comment")[0]
            .getElementsByClassName("message");
		var channel = BetterAPI.getCurrentTextChannelID();
		var server = BetterAPI.getCurrentServerName();
		if (uid){
			var uid = '<@'+uid+'>';
		}else{
			var uid = '@'+username;
		}
		if (mode == "client") {
			msg = msg + "`[" + time + "]` " + uid + " said:\n";
		} else if (mode == "channel") {
			msg = msg + "`[" + time + "]` " + uid + " said in <#"+channel+">:\n";
		} else if (mode == "server") {
			msg = msg + "`[" + time + "]` " + uid + " said in <#"+channel+"> on **"+server+"**:\n";
		} else {msg = msg + "`[" + time + "]` \"" + username + "\" said:\n";}
        var index;
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
        const oldSize = textArea.style.height;
        const newSize = textArea.scrollHeight > textArea.clientHeight ? (textArea.scrollHeight) : (textArea.value == "" ? 18 : 80);
        textArea.style.height = newSize + "px";
        textArea.onkeyup = function() {
            var key = event.keyCode || event.charCode;
            if ((key == 8 || key == 46) && (textArea.value.length <= 1))
               window.DCMQuoting.resize(this);
            if ((key == 13) && (!(event.shiftKey))) 
                textArea.style.height = "18px";
        };
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
    this.clickallPics = function(messageElement){
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
function removeAllEvents(node, event) {
    window.DCMQuoting.enabled = false;
};
function getSelectedCount(textArea){
    var options = textArea.options, count = 0;
    for (var i=0; i < options.length; i++) 
        if (options[i].selected) count++;
    return count;
}
if (!((typeof(betterDiscordIPC) !== 'undefined') && (betterDiscordIPC !== null))) {
    var str = "Warning: This Discord Quoting script is designed to work in BetterDiscord only!\nHOWEVER it is still trying to load\n\n(Discord Client Modding is deprecated)";
    console.log(str);
    alert(str);
    new DCMQuotingPlugin().start();
}
try{exports.DCMQuotingPlugin = DCMQuotingPlugin;}catch(e){console.warn('Using old version, not exporting functions.')}