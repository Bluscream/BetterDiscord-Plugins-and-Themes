//META{"name":"webSock"}*//

function webSock() {}

OPCODE_DISPATCH = 0;
OPCODE_HEARTBEAT = 1;
OPCODE_IDENTIFY = 2;
OPCODE_STATUS_UPDATE = 3;
OPCODE_VOICE_STATE_UPDATE = 4;
OPCODE_VOICE_SERVER_PING = 5;
OPCODE_RESUME = 6;
OPCODE_REDIRECT = 7;
OPCODE_REQUEST_GUILD_MEMBERS = 8;

CONNECTING = 0;
OPEN = 1;
CLOSING = 2;
CLOSED = 3;


webSock.internal={}
webSock.prototype.load = function() {
	//Called when plugin is loaded
};

webSock.prototype.unload = function() {
	//Called when plugin is unloaded
};

webSock.prototype.start = function() {
	
	var token = localStorage.token.match(/\"(.+)\"/)[1];
	webSock.headers = {authorization:token}
	console.log(token);
	$.ajax({
			method:"get",
			url:"https://discordapp.com/api/gateway",
			headers:webSock.headers,
			success:function(data){
				var gateway = data.url;
				console.log(gateway);
				webSock.ws = new WebSocket(gateway);
				webSock.ws.onopen = function(){
					webSock.sendData(OPCODE_IDENTIFY,{
							"token": token,
							"v": 3,
							"properties": {
									"$os": "DiscordClient",
									"$browser": "BetterDiscordWebsock",
									"$device": "",
									"$referrer":" https://discordapp.com/@me",
									"$referring_domain":"discordapp.com"
							},
							"large_threshold":100,
					})
				}
				webSock.ws.onmessage=function(evt){
						var reply = JSON.parse(evt.data);
						if (reply.seq != null) {
							this.seq = reply.seq;
						  }
						  var d = reply.d;
						if (reply.op == OPCODE_DISPATCH){
							if(reply.t=="READY"){
								webSock.internal.readyData = d;
								webSock.internal.userData = d.user;
								webSock.internal.sessionID = d.s
								webSock.internal.private_channels = d.private_channels
								webSock.internal.idle_since = null;
								webSock.internal.game_id = null;
								webSock.internal.heartbeat = setInterval(webSock.sendHeartbeat,d.heartbeat_interval)
								webSock.internal.state = d.read_state
								webSock.internal.guilds = d.guilds
								webSock.internal.messages = [];
							}else if(reply.t == "MESSAGE_CREATE"){
								var d = reply.d;
								
							
							}
						}
					}
			},
			dataType:"JSON"
		})
	
};

webSock.prototype.stop = function() {
	//Called when plugin is stopped
};

webSock.prototype.getName = function() {
    return "BetterDiscordWebsock";
};

webSock.prototype.getDescription = function() {
    return "Simple websocket plugin that can be used to read/write socket data";
};

webSock.prototype.getVersion = function() {
    return "1.0";
};

webSock.prototype.getAuthor = function() {
    return "Megamit/Mitchell";
};

/* webSock.prototype.getSettingsPanel = function() {
	return '<h3>Test Plugin</h3>';
}; */

webSock.sendData = function(opcode,data){	
	webSock.ws.send(JSON.stringify({op: opcode, d: data}));
}
webSock.sendMessage = function(){
	
}
webSock.sendHeartbeat = function(){
	webSock.sendData (OPCODE_HEARTBEAT, Date.now())
}

webSock.setStatus = function(game, idle){
	webSock.sendData (OPCODE_STATUS_UPDATE, {
                "idle_since": idle?idle:null,
                "game": {name:game}
		})
}