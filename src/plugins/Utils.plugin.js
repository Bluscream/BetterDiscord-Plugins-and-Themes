//META{"name":"Utils"}*//
function Utils() {
	this.getName = function() { return "Utilities"; };
	this.getDescription = function() { return "Usefull stuff that didn't make it into a own plugin."; };
	this.getVersion = function() { return "1.0"; };
	this.getAuthor = function() { return "Bluscream"; };
}
Utils.prototype.load = function() {};
Utils.prototype.start = function() {
	var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2]);
		}catch(e){
			Core.prototype.alert('Utilities - Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 750);'+
				'">here</a> to enable it.<br>'+
			'');
			return null;
		}
		/*$('div[data-reactid=".0.1.1.0.2.0"]').livequery(function(){
			BetterAPI.addLocationBar();
		});*/
		$('.server-info.server-name>span').livequery(function(){
			$('.server-info.server-name>span').each( function(i,e) { $(e).text($(e).text().replace(' by undefined', '')) });
			$('.server-info.server-region>span').each( function(i,e) {
				var _text = $(e).text();
				if(_text.contains('-')){
					_text = _text.replaceAll('-', ' ');
					_text = _text.toUpperCase();
				}else{ _text = _text.capitalizeFirstLetter(); }
				if(_text.contains('VIP')){
					_text = _text.replace('VIP', '');
					var p = $(e).parent().parent().find('.server-name').find('span');
					var _html = $(p).text();
					$(p).wrap('<div style="color:gold"></div>');
					$(p).append(' <img src="/assets/e4d52f4d69d7bba67e5fd70ffe26b70d.svg" width="16px"></img>');
				}
				$(e).text(_text);
			});
		});
		// BetterAPI.addLink("status", "Status", "status", "lg");
		// $('#status').click(function(){
			// BetterAPI.openStatusPopup();
		// });
		// BetterAPI.addLink("plus", "+", "https://discordapp.com/widget?id=134680912691462144&theme=dark", "sm");
		// $('#plus').click(function(){
			// $.jAlert({
				// 'iframe': $('#plus').attr('href'),
				// 'size': $('#plus').attr('size'),
				// 'theme': 'black',
				// 'title': 'BD+ (0kdpwyLsTTT8fB2t)'
			 // });
		// });
		// BetterAPI.addLink("link_bots", "Bots", "https://www.carbonitex.net/Discord/bots", "lg");
		// $('#link_bots').click(function(){
			// $.jAlert({
				// 'iframe': $('#link_bots').attr('href'),
				// 'size': $('#link_bots').attr('size'),
				// 'theme': 'black',
				// 'title': 'Discord Bots'
			 // });
		// });
		$('.user-settings-modal-account').livequery(function(){
			if ($("#userinfopanel").length <= 0) {
				id = BetterAPI.getOwnID();
				avatarID = BetterAPI.getOwnAvatarID();
				if(!avatarID){
					avatarID = BetterAPI.getUserAvatarIDbyName(name);
				}
				var _label = '';
				if (BetterAPI.isUID(id)) {
					_label = _label + '<div class="control-group" id="userinfopanel">'+
						'<label for="settings-username">'+
							'<span>Unique ID</span>'+
						'</label>'+
						'<input id="settings-username" type="text" value="'+id+'"></div>';
				}
				if (avatarID) {
					_label = _label + '<div class="control-group" id="userinfopanel">'+
						'<label for="settings-username">'+
							'<span>Avatar ID</span>'+
						'</label>'+
						'<input id="settings-username" type="text" value="'+avatarID+'"></div>'
				}
				$('div[data-reactid=".0.5.$=1$UserSettingsModal.0.0.1.0.$ACCOUNT.0.1:1.0"]').append(_label);
			}
		});
		$('button[data-reactid=".0.5.$=1$modal1.0.0.1.0"]').livequery(function(){
			if(!BetterAPI.elemExists('.submitall')){
				$('.button-primary').after('&nbsp;<button type="submit" class="button button-primary submitall" data-reactid=".0.5.$=1$modal11.0.0.1.2" onclick="BetterAPI.bulkUpload();"><span data-reactid=".0.5.$=1$modal11.0.0.1.2.0">Upload all</span></button>');
			}
		});
		// $('.markdown-modal-footer').livequery(function(){
			// if($('#bdcl').length <= 0){
				// $('.markdown-modal-footer').append(' | <a id="bdchangelog">BD Change Log</a>');
				// $('#bdchangelog').click(function(){
					// $('span[data-reactid=".0.5"]').remove();
					// $("body").append(Core.prototype.constructChangelog());
				// });
			// }
		// });
	}else{
		Core.prototype.alert('Required plugin not found!',''+
			'A requirement is missing: <b>'+_require[0]+'</b><br>'+
			'<br>'+
			'Click <a style=""href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
			'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
		'');
		return null;
	}
	_require = null;
};
Utils.prototype.onSwitch = function() {
	//BetterAPI.createCharCounter();
	setTimeout(function() {
		var scrollPane = $(".scroller.messages").first();
        $(scrollPane).scrollTop(999999999);
		var scrollPane = $(".scroller.channel-members").first();
        $(scrollPane).scrollTop(0);
	}, 1000);
};
Utils.prototype.onBooth = function() {
	$('*').removeAttr( "disabled" );
	$('.channel-textarea').removeClass('channel-textarea-disabled');
	$('.emoji:not(.emote)').addClass('emote');
	//BetterAPI.createCharCounter();
	if(BetterAPI.elemExists("#bd-pub-button")){
		$('#bd-pub-button').text($('#bd-pub-button').text().capitalizeFirstLetter());
	}
	if(BetterAPI.elemExists('header[data-reactid$="$Direct Messages"]')){
		$('header[data-reactid$="$Direct Messages"]').html('PM\'s - <a onclick="$(\'.close\').click();">Clear all</a>');
	}
	BetterAPI.enableTextSelection();
};
Utils.prototype.onMessage = function() {};
Utils.prototype.stop = function() {};
Utils.prototype.unload = function() {};
Utils.clearDMs = function() {
	$('.close').each(function(i,el){
		$(el).click();
	});
}
try{exports.Utils = Utils;}catch(e){console.warn('Using old version, not exporting functions.')}