//META{"name":"BetterAPI"}*//
BetterAPI = function() {
	this.getName = function(){ return "BetterAPI"; }
	this.getDescription = function(){ return "Enhances the BetterDiscord Plugin API."; }
	this.getVersion = function(){ return "1.0"; }
	this.getAuthor = function(){ return "Bluscream"; }
};
BetterAPI.prototype.load = function() {
	// BetterAPI.requireJS(href, elemID, function);
	BetterAPI.requireJS = function(href, elemID, func, callback){
		if(!BetterAPI.elemExists($('script[src="'+href+'"]'))){
			if(elemID){
				if(!BetterAPI.elemExists($('#'+elemID))){
					if(func){
						try{ eval(func);if(BetterAPI.isDebug()){ console.log("Not appending "+elemID+" because it's function is already defined."); }
						}catch(e){ $("<script/>",{ type: "text/javascript", src: href, id: elemID }).appendTo($("head")); }
						if(callback){try{eval(callback);}catch(e){}}
					}else{
						$("<script/>",{ type: "text/javascript", src: href, id: elemID }).appendTo($("head"));
					}
				}else{if(BetterAPI.isDebug()){ console.log("Not appending "+elemID+" because it's element is already defined."); }}
			}else{
				if(func){
					try{ eval(func);if(BetterAPI.isDebug()){ console.log("Not appending script because its function is already defined."); }
					}catch(e){ $("<script/>",{ type: "text/javascript", src: href }).appendTo($("head")); }
					if(callback){try{eval(callback);}catch(e){}}
				}else{
					$("<script/>",{ type: "text/javascript", src: href }).appendTo($("head"));
				}
			}
		}
	};
};
BetterAPI.prototype.start = function() {};
BetterAPI.prototype.update = function() {};
BetterAPI.prototype.onMessage = function() {};
BetterAPI.prototype.getSettingsPanel = function() {
	$('#bdpmakebak').livequery(function(){
		$('#bdpmakebak').click( function() { BetterAPI.makeFile('bdbackup.txt', BetterAPI.getBackup()); });
	});
	$('#bdprestbak').livequery(function(){
		$('#bdprestbak').upload({
			name: 'bdprestbakform',
			onComplete: function(response) { alertify.success(""+response); }
		});
	});
	$('#bdpreload').livequery(function(){
		$('#bdpreload').click( function() { window.location.reload(); });
	});
	return '<b>'+BetterAPI.prototype.getName()+' Settings</b><br><br><br>'+
		'Backup Localstorage:&nbsp;<button id="bdpmakebak">Backup</button><br>'+
		'Restore Localstorage:&nbsp;<button id="bdprestbak">Restore</button><br>'+
		'Reload Discord:&nbsp;<button id="bdpreload">Reload</button><br>';
};
BetterAPI.prototype.onSwitch = function() {
	localStorage.setItem('URL', window.location.href);
	if(BetterAPI.elemExists('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]', 2)){
		$('a[data-reactid=".0.1.1.0.1.0.0.1.2.0"]:first').parent().remove();
	}
};
BetterAPI.prototype.stop = function() {};
BetterAPI.prototype.unload = function() {};
exports.BetterAPI = BetterAPI;