//META{"name":"DCMQuotingPlugin"}*// 
/*
  NON-Crossplatform script
*/
//This class is for hacky QUOTE INJECTION only
function DCMQuotingPlugin(){
    var ghostModId = 2;
    this.load = function(){
        inject();
    };
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
    var createSpan = function(){
        var span = document.createElement("span");
        span.setAttribute("style", "display:inline-block");
        span.innerText = "[Quote]";
        span.setAttribute("onclick", "DCMQuoting.clicked(this);");
        return span;
    };
    //Still no good way to get all messages with BetterDiscord (afaik meaning I'm probably wrong)... copy OP whilst using a mod id (mod id = expected amount of ghosts scripted installed + 2)
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
                    if ((content.className == "body") && (checkVal(content) == ghostModId))
                        content.getElementsByTagName("h2")[0].appendChild(createSpan())
                }
            }
        }
    };
};
DCMQuotingPlugin.prototype.getName = function() { 
    return "Quoting"; 
}; 
DCMQuotingPlugin.prototype.getDescription = function() { 
    return "Quoting from Discord Client Modding ported by NotGGhost"; 
}; 
DCMQuotingPlugin.prototype.getVersion = function() { 
    return "0.1.7"; 
}; 
DCMQuotingPlugin.prototype.getAuthor = function() { 
    return "Ghost"; 
}; 
DCMQuotingPlugin.prototype.getSettingsPanel = function() { 
    return '<center><img src="https://s14.postimg.org/6w6z0pdpd/NJa3g_V_1.png"></img><br><b style="font-size: 40px;"> Nothing to see here yet... </b></center>'; 
}; 
var CDCMQuoting = function(){
    this.enabled = true;
    this.getMessage = function(element) {
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
		// var uid = BetterAPI.getUserIdByName(username);
        var comments = element.getElementsByClassName("comment")[0]
            .getElementsByClassName("message");
		var channel = BetterAPI.getCurrentChannelName();
		var server = BetterAPI.getCurrentServerName();
        var index;
		var msg = msg + "`[" + time + "]`: \"" + username + "\" said in #"+channel+" on **"+server+"**: ```\n";
        for (index = 0; index < comments.length; ++index) {
            var text = comments[index].getElementsByClassName("markup")[0]
                .innerText
                .replace("(edited)", "")
                .replace("\n\r", "")
                .replace("_", "");
            if (!(text == ""))
                msg = msg + text + "\n";
        }
		var msg = msg + "```";
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
    this.clicked = function(messageElement){
        var textArea = document.getElementsByTagName("textarea")[0];
        const message = window.DCMQuoting.getMessage(messageElement);
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
};
window.DCMQuoting = new CDCMQuoting();
//TODO: http://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-events-of-a-dom-object 
function removeAllEvents(node, event) {
    window.DCMQuoting.enabled = false;
};
if (!((typeof(betterDiscordIPC) !== 'undefined') && (betterDiscordIPC !== null))) {
    var str = "Warning: This Discord Quoting script is designed to work in BetterDiscord only!\nHOWEVER it is still trying to load\n\n(Discord Client Modding is deprecated)";
    alert(str);
    new DCMQuotingPlugin().start();
}