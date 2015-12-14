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
    // $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
        // if ($('#blockUser').length <= 0) {
            // var username = $(".user-popout").find(".username").text();
            // $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
            // $('#blockUser').on("click", function () {
				// var userid = BdApi.getUserIdByName(username);
				// var blockedUser = $.cookie("blockUser");
				// $.cookie('blockUser', blockedUser + ',' + userid);
				// console.log("Blocked: " + blockedUser);
            // });
        // }
    // });
	
	// var observer = new MutationObserver(function (mutations) {
		// mutations.forEach(function (mutation) {
			// [].slice.call($('.message-group')).forEach(function (message) {
				// var blockedUser = $.cookie("blockUser");
				// if($(message).children(".avatar-large").first()[0].outerHTML.indexOf(blockedUser) > -1){
					// $(message).css('display', 'none');
					// console.log("Hidden msg by: " + blockedUser);
				// }
			// });
		// });
	// });
	// observer.observe(document.body, { childList: true, subtree: true });
	// console.log("BetterDiscord: " + "Blocked Users: " + $.cookie("blockUser"))
	
	
    blockPlugin.blockList = {};

    var blockButtonFunc = function() {
        if (!$('#blockUser').length && !$('#unblockUser').length) {
            var username = $(".user-popout").find(".username").text();
            if (!blockPlugin.blockList.hasOwnProperty(username)) {
                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    blockPlugin.blockList[username] = BdApi.getUserIdByName(username);
                    console.log('Blocked user: \"' + username + '\" #' + blockPlugin.blockList[username]);
                    $('#blockUser').remove();
                    blockButtonFunc();
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
                    console.log('Unblocked user: \"' + username + '\" #' + blockPlugin.blockList[username]);
                    delete blockPlugin.blockList[username];
                    $('#unblockUser').remove();
                    blockButtonFunc();
                });
            }
        }
    };
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function() {
        blockButtonFunc();
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