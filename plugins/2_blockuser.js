//META{"name":"blockPlugin"}*//
//```
function blockPlugin() {}

blockPlugin.prototype.load = function() {	
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.");
};

blockPlugin.prototype.unload = function() {
	console.log("BetterDiscord: " + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " unloaded.");
};

blockPlugin.prototype.start = function() {
	
	pluginAlert = function(type, msg){
		// window.alert("BetterDiscord: " + blockPlugin.prototype.getName() + ": " + type + ":\n\n" + msg);
		$('body').jAlert('Welcome to jAlert Demo Page', "success");
		// console.log("BetterDiscord: " + this.getName() + ": " + type + ": " + msg);
	};

    blockPlugin.blockList = JSON.parse(localStorage.getItem('blockPluginBlockList')) || {};
    blockPlugin.forceUpdate = false;

    var updateChat = function(){
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
            $(".scroller.messages").scrollTop(999999);
        }
        if(Object.keys(blockPlugin.blockList).length <= 0 && blockPlugin.forceUpdate) {
            $('.message-group').removeAttr('style');
            $(".scroller.messages").scrollTop(999999);
        }
        blockPlugin.forceUpdate = false;
    };

    var blockButtonFunc = function() {
        if (!$('#blockUser').length && !$('#unblockUser').length) {
            var username = $(".user-popout").find(".username").text();
            if (!blockPlugin.blockList.hasOwnProperty(username)) {
                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    var id = BdApi.getUserIdByName(username);
                    if(id == null){
                        // window.alert("Can't get userID for: " + username + "\nUser needs to be visible in the userlist.");
						pluginAlert('Error', 'test');
                        return;
                    }
                    blockPlugin.blockList[username] = id;
                    localStorage.setItem('blockPluginBlockList', JSON.stringify(blockPlugin.blockList));
                    $('#blockUser').remove();
                    blockButtonFunc();
                    updateChat();
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
                    delete blockPlugin.blockList[username];
                    localStorage.setItem('blockPluginBlockList', JSON.stringify(blockPlugin.blockList));
                    $('#unblockUser').remove();
                    blockButtonFunc();
                    blockPlugin.forceUpdate = true;
                    updateChat();
                });
            }
        }
    };

    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
        blockButtonFunc();
    });

    $('body').on('DOMSubtreeModified', function() {
        // updateChat();
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