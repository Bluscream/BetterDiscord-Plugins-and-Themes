//META{"name":"blockPlugin"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work!
//```
function blockPlugin() {}
blockPlugin.prototype.load = function() {
	
	BetterAPI.appendTo("link[rel='stylesheet']", '<link rel="stylesheet" href="https://cdn.rawgit.com/VersatilityWerks/jAlert/master/src/jAlert-v3.css" type="text/css">');
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-v3.min.js"></script>');
	$("head").append('<script src="https://raw.githubusercontent.com/VersatilityWerks/jAlert/master/src/jAlert-functions.min.js"></script>');
	
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};
blockPlugin.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};
blockPlugin.prototype.start = function() {
	
    blockPlugin.blockList = JSON.parse(localStorage.getItem('blockPluginBlockList1')) || {};
    blockPlugin.forceUpdate = false;
	updateChat = function(){
        if(Object.keys(blockPlugin.blockList).length > 0 || blockPlugin.forceUpdate){
            [].slice.call($('.message-group')).forEach(function (message) {
                $.each( blockPlugin.blockList, function(name, id){
                    if($(message).children(".avatar-large").first()[0].outerHTML.indexOf(id) > -1){
                        $(message).css('display', 'none');
                    } else {
                        $(message).removeAttr('style');
                    }
                });
            });
            // $(".scroller.messages").scrollTop(999999);
        }
        if(Object.keys(blockPlugin.blockList).length <= 0 && blockPlugin.forceUpdate) {
            $('.message-group').removeAttr('style');
            // $(".scroller.messages").scrollTop(999999);
        }
        blockPlugin.forceUpdate = false;
    };
	var blockListButtonFunc = function() {
		if (!$('#blockListButton').length) {
			$('.user-popout-options').append('<button class="btn btn" id="blockListButton">Blocked Users</button>');
			$('#blockListButton').on("click", function () {
				var locStore = localStorage.getItem('blockPluginBlockList1');
				if (locStore == '{}') {
					infoAlert('Blocklist', 'No users blocked.');
				} else {
					blackAlert('Blocklist', localStorage.getItem('blockPluginBlockList1'));
					console.log("BetterDiscord: "+blockPlugin.prototype.getName() +": Blocklist:\n" + localStorage.getItem('blockPluginBlockList1'));
				};				
			});
		};
	};
	var clearblockListButtonFunc = function() {
		if (!$('#clearblockListButton').length) {
			var locStore = localStorage.getItem('blockPluginBlockList1');
			if (locStore != '{}') {
				$('.user-popout-options').append('<button class="btn btn-server" id="clearblockListButton">Clear Blocked Users</button>');
				$('#clearblockListButton').on("click", function () {
					localStorage.setItem('blockPluginBlockList1', '{}');
					successAlert(blockPlugin.prototype.getName(), "Blocklist has been cleared")
				});
			} else {
				return;
			};
		}
	};
	blockUser = function(username, id) {
			blockPlugin.blockList[username] = id;
			localStorage.setItem('blockPluginBlockList1', JSON.stringify(blockPlugin.blockList));
			console.log("\"" + username + "\" #" + id + " was added to blocklist.")
	};
	unblockUser = function(username) {
		delete blockPlugin.blockList[username];
		localStorage.setItem('blockPluginBlockList1', JSON.stringify(blockPlugin.blockList));
			console.log("\"" + username + "\" was removed to blocklist.")
	};
    var blockButtonFunc = function() {
        if (!$('#blockUser').length && !$('#unblockUser').length) {
            var username = $(".user-popout").find(".username").text();
            if (!blockPlugin.blockList.hasOwnProperty(username)) {
                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    var id = BetterAPI.getUserIdByName(username);
                    if(id == null){
						  errorAlert(blockPlugin.prototype.getName() + ' - Error', 'Can\'t get userID for: \"' + username + '\". \n\nUser needs to be visible in the userlist.');
                        return;
                    }
					confirm(function(){
						blockPlugin.blockList[username] = id;
						localStorage.setItem('blockPluginBlockList1', JSON.stringify(blockPlugin.blockList));
						$('#blockUser').remove();
						blockButtonFunc();
						updateChat();
						successAlert(blockPlugin.prototype.getName() + ' - Success', 'User \"'+username+'\" ('+id+') has been blocked and his/her messages were removed.');
					  }, function(){
						return;
					  }
					);
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
					confirm(function(){
						name = BdApi.getUserNameById(blockPlugin.blockList[username]);
						if(name == null){
							successAlert(blockPlugin.prototype.getName() + " - Success", "User #"+blockPlugin.blockList[username]+" has been unblocked and his/her messages were restored.");
						} else {
							successAlert(blockPlugin.prototype.getName() + " - Success", "User \""+name+"\" ("+blockPlugin.blockList[username]+") has been unblocked and his/her messages were restored.");
						}
						delete blockPlugin.blockList[username];
						localStorage.setItem('blockPluginBlockList1', JSON.stringify(blockPlugin.blockList));
						$('#unblockUser').remove();
						blockButtonFunc();
						blockPlugin.forceUpdate = true;
						updateChat();
					  }, function(){
						return;
					  }
					);
                });
            }
        }
    };
//--------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------/*Events*/------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
        blockButtonFunc();
		blockListButtonFunc();
		clearblockListButtonFunc();
    });
    $('body').on('DOMSubtreeModified', function() {
        updateChat();
    });
	
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " started.");
};

blockPlugin.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.blockPlugin');
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " stopped.");
};
blockPlugin.prototype.update = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " updated.");
};
blockPlugin.prototype.getName = function() {
	return "Block User Plugin";
};
blockPlugin.prototype.getDescription = function() {
	return "Adds functionality to block a user";
};
blockPlugin.prototype.getVersion = function() {
	return "1.0";
};
blockPlugin.prototype.getAuthor = function() {
	return "Bluscream";
};
//```