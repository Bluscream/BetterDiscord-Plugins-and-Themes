//META{"name":"webSock"}*//

/*
	HUGE graditude to izy521 and other contributors to https://github.com/izy521/discord.io for most of the work in how to processing websocket messages.
	I am far to lazy to do this myself. so large functions are copy pasted. Although many things were surprisingly similar already.
*/
var util = require("util");
var EE = require("events").EventEmitter;
function webSock() {
	//construction
	var self = this,
		ws,token,uIDToDM;
	EE.call(self);
	this.log = function(){
		var args = Array.prototype.slice.call(arguments);
		args.unshift("%c[webSock]", 'font-weight: bold;color: green;');
		console.log.apply(console,args);
	}
	this.init = function(){
		token = localStorage.token.match(/\"(.+)\"/)[1];
		self.headers ={authorization:token}
		self.opcode = {}
		self.opcode.DISPATCH = 0;
		self.opcode.HEARTBEAT = 1;
		self.opcode.IDENTIFY = 2;
		self.opcode.STATUS_UPDATE = 3;
		self.opcode.VOICE_STATE_UPDATE = 4;
		self.opcode.VOICE_SERVER_PING = 5;
		self.opcode.RESUME = 6;
		self.opcode.REDIRECT = 7;
		self.opcode.REQUEST_GUILD_MEMBERS = 8;

		CONNECTING = 0;
		OPEN = 1;
		CLOSING = 2;
		CLOSED = 3;
		self.servers = {};
		self.internal = {};
		self.users = {};
		self.directMessages = {};
		uIDToDM = {}
	}
	this.fetchGateway = function(fn){
		self.log(self.headers);
		
		$.ajax({
				method:"get",
				url:"https://discordapp.com/api/gateway",
				headers:self.headers,
				dataType:"JSON",
				success:function(data){
					self.gateway = data.url
					if(fn)fn();
				}
		})
	}
	this.connect = function() {
		self.fetchGateway(self.WSstart)
	}
	this.WSstart=function(){
		ws = new WebSocket(self.gateway);
		self.log("connecting to '"+self.gateway+"'");
		ws.onopen = self.WSopen
		ws.onmessage= self.WSmessage
		ws.onerror = self.WSerror
		ws.onclose = self.WSclose
	}
	this.WSopen=function(){
			self.log("completing handshake")
			self.identify();
		}
	this.WSerror=function(){
		self.log("Websocket Error")
		ws.onclose()
	}
	this.WSclose=function(){
			self.log("WebSocket Connection Terminated")
			self.connected=false;
		}
	this.q=function(evt){
		var reply = JSON.parse(evt.data);
		if (reply.seq != null) {
			this.seq = reply.seq;
		 }
		var d = reply.d;
		if (reply.op == self.opcode.DISPATCH){
		
			if(reply.t=="READY"){
				self.connected = true;
				self.internal.readyData = d;
				self.internal.userData = d.user;
				self.internal.sessionID = d.s
				self.internal.private_channels = d.private_channels
				self.internal.idle_since = null;
				self.internal.game_id = null;
				self.internal.heartbeat = setInterval(self.sendHeartbeat,d.heartbeat_interval)
				self.internal.state = d.read_state
				for (var user in d.user) {
					self.users[user] = reply.d.user[user];
				}
				getServerInfo(reply.d.guilds, function() {
					getDirectMessages(reply.d.private_channels);
					self.emit('ready', reply);
				});
			}else if(reply.t == "MESSAGE_CREATE"){
				var d = reply.d;
			}
		}
	}
	this.identify = function(){
		ws.send(JSON.stringify({
			op: self.opcode.IDENTIFY,
			d: {
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
				}
			}));
	}
	this.sendData = function(opcode,data){
		if (this.connected){
			ws.send(JSON.stringify({op: opcode, d: data}));
			self.log(`{${opcode}}->`)
		}else{
			self.log(`{${opcode}}-||`)
		}
	}
	this.sendMessage = function(){
		//not implimented
	}
	this.sendHeartbeat = function(){
		self.sendData (self.opcode.HEARTBEAT, Date.now())
	}

	this.setStatus = function(game, idle){
		this.sendData (self.opcode.STATUS_UPDATE, {
					"idle_since": idle?idle:null,
					"game": {name:game}
			})
	}
	//internal only functions
	function getServerInfo(servArr, callback) {
		self.servers = {};
		for (var server=0; server<servArr.length; server++) {
			var serverID = servArr[server].id;

			var channelArr = servArr[server].channels;
			var memberArr = servArr[server].members;
			var presenceArr = servArr[server].presences;
			var roleArr = servArr[server].roles;
			var voiceArr = servArr[server].voice_states;

			self.servers[serverID] = {};

			for (var key in servArr[server]) {
				self.servers[serverID][key] = servArr[server][key];
			}

			self.servers[serverID].channels = {}; //Turning these three into objects for easy search, instead of their original arrays
			self.servers[serverID].members = {};
			self.servers[serverID].roles = {};

			channelArr.forEach(function(channel) {
				channel.members = {};
				self.servers[serverID].channels[channel.id] = channel;
			});

			memberArr.forEach(function(member) {
				self.servers[serverID].members[member.user.id] = member;
			});

			presenceArr.forEach(function(presence) {
				var uID = presence.user.id;
				for (var pkey in presence) {
					if (pkey !== "user") {
						try {
							self.servers[serverID].members[uID][pkey] = presence[pkey];
						} catch (e) {}
					}
				}
			});

			roleArr.forEach(function(role) {
				self.servers[serverID].roles[role.id] = role;
			});

			voiceArr.forEach(function(vs) {
				var channelID = vs.channel_id;
				var userID = vs.user_id;
				if (self.servers[serverID].channels[channelID]) {
					self.servers[serverID].channels[channelID].members[userID] = vs;
					self.servers[serverID].members[userID].voice_channel_id = channelID;
				}
			});
		}
		callback();
	}
	function getDirectMessages(DMArray) {
		for (var DM=0; DM<DMArray.length; DM++) {
			self.directMessages[DMArray[DM].id] = DMArray[DM];
			uIDToDM[DMArray[DM].recipient.id] = DMArray[DM].id;
			//self.directMessages[DMArray[DM].recipient.id] = DMArray[DM];
		}
	}
	
	this.init();
}
util.inherits(webSock, EE);
webSock.prototype.stop = function() {
	//Called when plugin is stopped
};

webSock.prototype.getName = function() {
    return "Websocket";
};

webSock.prototype.getDescription = function() {
    return "Simple websocket plugin that can be used to read/write socket data.";
};

webSock.prototype.getVersion = function() {
    return "1.0";
};

webSock.prototype.start = function(){
	this.connect();
}

webSock.prototype.getAuthor = function() {
    return "Megamit/Mitchell";
};
webSock.prototype.load = function() {
	//Called when plugin is loaded
};

webSock.prototype.unload = function() {
	//Called when plugin is unloaded
};

/* webSock.prototype.getSettingsPanel = function() {
	return '<h3>Test Plugin</h3>';
}; */

